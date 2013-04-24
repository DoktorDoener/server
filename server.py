# coding:utf-8

import os.path
try:
   import simplejson as json
except:
   import json

import cherrypy
#----------------------------------------------------------
import os
from mako.template import Template
from mako.lookup import TemplateLookup
import datetime
#----------------------------------------------------------
from app import app


#----------------------------------------------------------
def main():
#----------------------------------------------------------
   
   # aktuelles Verzeichnis ermitteln, damit es in der Konfigurationsdatei als
   # Bezugspunkt verwendet werden kann   
   try:                                    # aktuelles Verzeichnis als absoluter Pfad
      currentDir_s = os.path.dirname(os.path.abspath(__file__))
   except:
      currentDir_s = os.path.dirname(os.path.abspath(sys.executable))
   cherrypy.Application.currentDir_s = currentDir_s

   configFileName_s = 'server.conf' # im aktuellen Verzeichnis   
   if os.path.exists(configFileName_s) == False:
      # Datei gibt es nicht
      configFileName_s = None
   
   # autoreload und timeout_Monitor hier abschalten
   # für cherrypy-Versionen >= "3.1.0" !
   cherrypy.engine.autoreload.unsubscribe()
   cherrypy.engine.timeout_monitor.unsubscribe()
   
   cherrypy.quickstart(app.Application_cl(), config=configFileName_s)  
   
#----------------------------------------------------------
if __name__ == '__main__':
#----------------------------------------------------------
   main()