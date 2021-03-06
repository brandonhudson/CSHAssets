import base64
from datetime import datetime
from flask import Flask, jsonify, request, redirect, url_for, send_from_directory
import hashlib
import json
import os
import sys
from werkzeug import secure_filename

app = Flask(__name__)
json_config = None

# md5 hash that file
def hash_file(fname):
    m = hashlib.sha384()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            m.update(chunk)
    hash_ = m.digest()
    return base64.b64encode(hash_).decode()

# Add file to local database
def add_file(file_hash, file_name, common_name, description, author):
    with open("upload_data.json", mode="r+") as db:
        data = json.load(db)
        print(data)
        entry = {
            'asset_hash': file_hash,
            'common_name': common_name,
            'name': file_name,
            'description': description,
            'author': author,
            'uploaded': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        data['files'].append(entry)
        db.seek(0)
        db.truncate()
        json.dump(data, db)
        return entry

# List added files
@app.route('/list_files', methods=['GET', 'POST'])
def list_uploads():
    json_data = None
    with open("upload_data.json") as data:
        json_data = data.read()
    return json_data

# Upload new file
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file_ = request.files['file']
        author = request.headers.get('x-webauth-ldap-cn')
        common_name = request.form.get('common_name')
        description = request.form.get('description')
        if file_:
            print(file_.__dict__)
            filename = secure_filename(file_.filename)
            filepath = os.path.join(json_config['upload_folder'], filename)
            file_hash = None
            if not os.path.exists(filepath):
                file_.save(filepath)
                file_hash = hash_file(filepath)
                return jsonify(add_file(file_hash, filename, common_name, description, author))
            else:
                return "ERROR FILE EXISTS!!!!", 409

with open(sys.argv[1]) as json_file:
    json_config = json.load(json_file)

app.config['UPLOAD_FOLDER'] = json_config['upload_folder']
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024 # 10 Megabytes
app.run(debug=json_config['debug'], port=json_config['port'])
