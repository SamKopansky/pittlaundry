import os
import atexit
import stats
import redis
from pittAPI import LaundryAPI
from apscheduler.scheduler import Scheduler
from flask import Flask, request, session, redirect, url_for, render_template, jsonify



app = Flask(__name__)
host = '0.0.0.0'
port = int(os.environ.get('PORT', 33507))


r = redis.from_url(os.environ.get('REDIS_URL'))


@app.route('/')
def start_up():
	return render_template('index.html')



@app.route('/get-raw-data', methods=['POST'])
def get_raw_data():
	dorm_name = request.form['dorm-name']
	raw_laundry_data = get_laundry_data(dorm_name)
	return jsonify(raw_laundry_data)



@app.route('/get-laundry-layout', methods=['GET'])
def get_laundry_layout():
	dorm = request.args['dorm-name']
	return render_template(dorm + '.html')



def get_laundry_data(dorm_name):
	laundry = LaundryAPI()
	return laundry.get_status_detailed(building_name=dorm_name)



cron = Scheduler(daemon=True)
# Explicitly kick off the background thread
cron.start()

@cron.interval_schedule(hours=1)
def save_stats():
	dorms = ['TOWERS', 'BRACKENRIDGE', 'HOLLAND', 'LOTHROP', 'MCCORMICK', 'SUTH_EAST', 'SUTH_WEST', 'FORBES_CRAIG']
	occupied_machines = stats.get_stats()
	for i in range(8):
		try:
			r.rpushx(dorms[i], occupied_machines[i])
		except:
			pass


# Shutdown cron thread if the web process is stopped
atexit.register(lambda: cron.shutdown(wait=False))

if __name__ == '__main__':
	app.run(debug=True, host=host, port=port)