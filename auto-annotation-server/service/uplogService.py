import datetime
import os
import threading
import time
from entity.Log import Log


import os
from entity.User import User
from dao.LogDao import logDao


class uplogService:
    def __init__(self, Log):
        self.Log= Log


    def uplog(self):
        self.Log.set_time()
        self.Log.set_id()
        logdao = logDao(Log=self.Log)
        logdao.add_log()

# asctime = time.asctime( time.localtime(time.time()) )
# asctime = str(asctime)
# Log.time = asctime
# Log.info = 'E'
# Log.type = 'train'
# Log.action = 'fu'
# print(asctime)
# print(Log.info)