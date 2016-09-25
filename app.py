import os
from pittAPI import LaundryAPI
from flask import Flask, request, session, redirect, url_for, render_template, jsonify



app = Flask(__name__)
host = '0.0.0.0'
port = int(os.environ.get('PORT', 33507))
# host = '127.0.0.1'
# port = 5000




@app.route('/')
def start_up():
	return render_template('index.html')



@app.route('/get-raw-data', methods=['POST'])
def get_raw_data():
	dorm_name = request.form['dorm-name']
	raw_laundry_data = get_laundry_data(dorm_name)
	return jsonify(raw_laundry_data)



def get_laundry_data(dorm_name):
	laundry = LaundryAPI()
	return laundry.get_status_detailed(building_name=dorm_name)



if __name__ == '__main__':
	app.run(debug=True, host=host, port=port)