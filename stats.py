from pittAPI import LaundryAPI
import atexit
from apscheduler.scheduler import Scheduler



dorms = [
	'TOWERS',
	'BRACKENRIDGE',
	'HOLLAND',
	'LOTHROP',
	'MCCORMICK',
	'SUTH_EAST',
	'SUTH_WEST',
	'FORBES_CRAIG'
]

l = LaundryAPI()



def count_occupied_machines(machines):
	occupied_machines = 0
	for machine in machines:
		if machine['machine_status'] != 'Free' and machine['machine_status'] != 'Out of service' and machine['time_left'] > 0:
			occupied_machines += 1
	return occupied_machines



def get_occupied_machines_count():
	occupied_machines_count = []
	for dorm in dorms:
		try:
			machines = l.get_status_detailed(dorm)
			count = count_occupied_machines(machines)
			occupied_machines_count.append(count)
			with open(dorm + '.txt', 'a') as dorm_file:
				dorm_file.write(count + '\n')
		except:
			pass
	return occupied_machines_count


def print_stats():
	return get_occupied_machines_count()

