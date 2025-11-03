"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/health-check', methods=['GET'])
def health_check():
    return jsonify({"status": "OK"}), 200


@api.route('/signup', methods=['POST'])
def signup_user():
    data = request.json
    data = {
        "email": data.get("email"),
        "password": data.get("password"),
        "salt": 1
    }

    if not data["email"] or not data["password"]:
        return jsonify({"message": "Email and password are required"}), 400
    
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists"}), 409
    
    salt = b64encode(os.urandom(32)).decode('utf-8')
    password = generate_password_hash(f"{data['password']}{salt}")

    new_user = User(
        email=data["email"],
        password=password,
        salt=salt   
    )

    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error creating user", "error": str(error)}), 500
    

@api.route('/login', methods=['POST'])
def login_user():
    data = request.json
    
    data = {
        "email": data.get("email").strip(),
        "password": data.get("password").strip()
    }

    if not data["email"] or not data["password"]:
        return jsonify({"message": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=data["email"]).one_or_none()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 400
    
    if not check_password_hash(user.password, f"{data['password']}{user.salt}"):
        return jsonify({"message": "Invalid credentials"}), 400
    else:
        return jsonify({"token": create_access_token(identity=user.id, expires_delta=timedelta(days=1))}), 200
    
