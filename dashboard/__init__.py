from enum import unique
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import true
from werkzeug.security import generate_password_hash, check_password_hash

import os
Path = os.path.dirname(__file__)

DB_NAME = 'banco_dash'

app = Flask(__name__)
app.secret_key = "Secret Key"

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///C://Users//LBA4CT//Desktop//Dashboard//{DB_NAME}.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Data(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    SSB = db.Column(db.String(6))
    Email = db.Column(db.String(100), index=True, unique=True)
    Senha = db.Column(db.String(32))
    
    def set_password(self, password):
        self.Senha = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.Senha, password)
    
    def __init__(self, SSB, Email, Senha):
        self.SSB = SSB
        self.Email = Email
        self.Senha = Senha


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)