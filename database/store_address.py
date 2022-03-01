from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from database.db import get_db
import sqlite3

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
        " FROM address p JOIN user u ON p.id = u.id"
        " ORDER BY created DESC"
    ).fetchall()
    return address

@bp.route("/")
def addresslist():
    """Show all the addresses, most recent first."""
    db = get_db()
    address = db.execute(
        "SELECT DISTINCT u.address"
        " FROM address p JOIN user u ON p.id = u.id"
        " ORDER BY created DESC"
    ).fetchall()
    return address

@login_required
def get_address(id):# check_author=True):
    """Get a address and user by id.
    Checks that the id exists and optionally that the current user is
    the author.
    :param id: id of address to get

    :return: the address
    :raise 404: if a address with the given id doesn't exist
    """
    address = (
        get_db()
        .execute(
            "SELECT p.address"
            " FROM address p"
            " WHERE id = ?",
            (id,),
        )
        .fetchone()
    )

    if address is None:
        abort(404, f"Post id {id} doesn't exist.")


    return address

@bp.route("/<int:id>/delete", methods=("POST",))
@login_required
def delete(id):
    """Delete a tracking history.
    """
    get_post(id)
    db = get_db()
    db.execute("DELETE FROM address WHERE id = ?", (id,))
    db.commit()
    return
