import functools

from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import session
from flask import url_for
from flask import jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

from user_info_flask.db import get_db

bp = Blueprint("auth", __name__, url_prefix="/auth")


def login_required(view):
    """View decorator that redirects anonymous users to the login page."""

    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("auth.login"))

        return view(**kwargs)

    return wrapped_view


@bp.before_app_request
def load_logged_in_user():
    """If a user id is stored in the session, load the user object from
    the database into ``g.user``."""
    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = (
            get_db().execute("SELECT * FROM user WHERE id = ?", (user_id,)).fetchone()
        )


@bp.route("/register", methods=("GET", "POST"))
def register():
    """Register a new user.
    Validates that the username is not already taken. Hashes the
    password for security.
    """
    message = None
    success = False
    if request.method == "POST":
        json = request.get_json()
        username = json["username"]
        password = json["password"]
        db = get_db()

        if not username:
            message = "Username is required."
        elif not password:
            message = "Password is required."

        if message is None:
            try:
                db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    (username, generate_password_hash(password)),
                )
                db.commit()
            except db.IntegrityError:
                # The username was already taken, which caused the
                # commit to fail. Show a validation error.
                meesage = f"User {username} is already registered."
            else:
                # Success, go to the login page.
                #return redirect(url_for("auth.login"))
                message = "Register complete, please log in."
                success = True
        

    return jsonify(success=success, message=message) 


@bp.route("/login", methods=("GET", "POST"))
def login():
    message = None
    success = False
    """Log in a registered user by adding the user id to the session."""
    if request.method == "POST":
        json = request.get_json()
        username = json["username"]
        password = json["password"]
        db = get_db()
        user = db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
        ).fetchone()

        if user is None:
            message = "Incorrect username."
        elif not check_password_hash(user["password"], password):
            message = "Incorrect password."

        if message is None:
            # store the user id in a new session and return to the index
            session.clear()
            session["user_id"] = user["id"]
            success = True
            message = "You are logged in."

    else:
        message = "Please log in."
    # session cookie is automatically returned 
    return jsonify(success=success, message=message)


@bp.route("/logout")
def logout():
    """Clear the current session, including the stored user id."""
    session.clear()
    return jsonify(success=True, message="You are logged out.")
