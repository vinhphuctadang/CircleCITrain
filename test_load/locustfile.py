import random
import string
from locust import HttpUser, task, between

def randomString():
	stringLength = random.randrange(1, 100)
	letters = string.ascii_lowercase
	return ''.join(random.choice(letters) for i in range(stringLength))

class AppUser(HttpUser):
	wait_time = between(0, 1)
	KEYS = []

	@task(1)
	def getKey(self):
		if random.randrange(0, 2):
			with self.client.get("/"+randomString()) as resp:
				print(resp.text)
		else:
			if AppUser.KEYS:
				with self.client.get("/"+random.choice(AppUser.KEYS)) as resp:
					print(resp.text)
		
	@task(1)
	def setKey(self):
		rdStr = randomString()
		self.client.post("/"+rdStr, {'value': randomString()})
		AppUser.KEYS.append(rdStr)		
		pass

	def on_start(self):
		print("New user comes")
		pass
