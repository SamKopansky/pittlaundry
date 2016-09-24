import os
from pittAPI import LaundryAPI
from flask import Flask, request, session, redirect, url_for, render_template, jsonify



app = Flask(__name__)

port = int(os.environ.get('PORT', 33507))


@app.route('/')
def start_up():
	return jsonify({'data':get_laundry_data()})



def get_laundry_data():
	laundry = LaundryAPI()
	return laundry.get_status_detailed(building_name='TOWERS')



if __name__ == '__main__':
	app.run(debug=True, port=port)