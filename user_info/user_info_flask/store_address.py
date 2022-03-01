from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask import jsonify
from flask import session
from werkzeug.exceptions import abort

from user_info_flask.auth import login_required
from user_info_flask.db import get_db
import sqlite3

import json
import click
from flask import current_app
from flask import g
from flask.cli import with_appcontext

bp = Blueprint("store_address", __name__)


@bp.route("/")
def index():
    """Show all the addresses, most recent first."""
    db = get_db()
    address = db.execute(
        "SELECT u.id, p.address"
        " FROM address p JOIN user u ON p.user_id = u.id"
        " ORDER BY u.id DESC"
    ).fetchall()
    data = []
    for row in address:
        data.append([x for x in row])

    return jsonify(address=data)

def getaddresslist():
    db=get_db()
    address = db.execute(
        "SELECT DISTINCT address"
        " FROM address"
    ).fetchall()
    data = []
    for row in address:
        data.append([x for x in row])
    res = []
    for d in data:
        res+=d

    return res


@bp.route("/address_list", methods=("GET","POST"))
def addresslist():
    """Show all the addresses, most recent first."""
    db = get_db()
    address = db.execute(
        "SELECT DISTINCT address"
        " FROM address"
    ).fetchall()
    data = []
    for row in address:
        data.append([x for x in row])


    return jsonify(success=True, address=data)

@bp.route("/create_track", methods=["POST"])
@login_required
def create():
    message = None
    success = False
    if request.method == "POST":
        json = request.get_json()
        uid = session.get("user_id")
        address = json["address"]
        db = get_db()

        if not address:
            message = "Address is required."

        if message is None:
            try:
                db.execute(
                    "INSERT INTO address (user_id, address) VALUES (?, ?)",
                    (uid, address),
                )
                db.commit()
            except db.IntegrityError:
                # The username was already taken, which caused the
                # commit to fail. Show a validation error.
                message = "Insert failed."
            else:
                # Success, go to the login page.
                #return redirect(url_for("auth.login"))
                message = "Create complete."
                success = True
        

    return jsonify(success=success, message=message) 



@bp.route("/get_address", methods=("GET", "POST"))
@login_required
def get_address():# check_author=True):
    """Get a address and user by id.
    Checks that the id exists and optionally that the current user is
    the author.
    :param id: id of address to get

    :return: the address
    :raise 404: if a address with the given id doesn't exist
    """
    success = True
    uid = session.get("user_id")
    address = (
        get_db()
        .execute(
            "SELECT p.address"
            " FROM address p"
            " WHERE id = ?",
            (uid,),
        )
        .fetchall()
    )

    if address is None:
#        abort(404, f"Post id {id} doesn't exist.")
        success = False
        data = None
    else:
        data =[]
        for row in address:
            data.append([x for x in row])

    return jsonify(success=True, address=data)

@bp.route("/delete", methods=["POST"])
@login_required
def delete():
    """Delete a tracking history.
    """
    success = True
    if request.method == "POST":
        json = request.get_json()
        address = json["address"]
        user_id = session.get("user_id")
        #get_post(id)
        db = get_db()
        try:
            db.execute("DELETE FROM address WHERE address = ? AND user_id = ?", 
                    (address, user_id))
            db.commit()
        except db.IntegrityError:
            meesage = "Deleted failed."
            success = False
    return jsonify(success=success) 
