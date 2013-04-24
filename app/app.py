# coding:utf-8

try:
   import simplejson as json
except:
   import json

import cherrypy

# weitere Module bei Bedarf
import os
from mako.template import Template
from mako.lookup import TemplateLookup
import datetime
import MySQLdb as mdb
import sys

#----------------------------------------------------------
class Application_cl(object):
#----------------------------------------------------------


   #-------------------------------------------------------
   def Seite_ausliefern(self, art):
   #-------------------------------------------------------
      mytemplate = Template(filename = 'html/' + art + '.html', input_encoding = 'utf-8');
      con = None
      ausgabe =""
      try:
            con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013');
            cur = con.cursor()

            cur.execute('SELECT * FROM personal')

            rows = cur.fetchall()

            for row in rows:
                ausgabe = ausgabe +'<option value="'+ str(row[1]) +'">' + str(row[1]) + ' - '+ row[0] + '</option>'

      except mdb.Error, e:

            print "Error %d: %s" % (e.args[0], e.args[1])
            sys.exit(1)

      finally: 

            if con: 
                con.close()
      template_s = mytemplate.render(Artikelname = art, worker_id = ausgabe)
      return json.dumps(template_s)
   Seite_ausliefern.exposed = True

   #-------------------------------------------------------
   def restart(self):
   #-------------------------------------------------------
       cherrypy.engine.restart()
       return json.dumps("True")
   restart.exposed = True



   #-------------------------------------------------------
   def status_ausliefern(self, mitarbeiternummer, passwort):
   #-------------------------------------------------------
      ausgabe = ""
      status = ""
      con = None
      
      try:
            con = mdb.connect('localhost', 'root',  'ias2013', 'ias2013')
            cur = con.cursor()
            
            cur.execute('SELECT * FROM personal WHERE mitarbeiternummer = "' + mitarbeiternummer + '"');
            
            row = cur.fetchone()
            
            status = "error"
            if str(row[2]) == passwort:
                  status = str(row[5])
                  if status == "nowork" or status== "journey" or status == "pause":
                        pass
                  else:
                        status = "work"
            else:
                status = "error"

      except mdb.Error, e:
            print "Error %d: %s" % (e.args[0], e.args[1])
            
      finally:
            
            if con:
                  con.close()

      mytemplate = Template(filename='status/'+ status +'.txt', input_encoding = 'utf-8')
      template_s = mytemplate.render(test = str(row[5]))
      return json.dumps(template_s)
   status_ausliefern.exposed = True
   

   #-------------------------------------------------------
   def status_aendern(self, status, mitarbeiternummer):
   #-------------------------------------------------------
      con = None
      try:
          con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013');
          cur = con.cursor()
          date = datetime.datetime.today()

          
          cur.execute('SELECT * FROM personal WHERE Mitarbeiternummer = "' + mitarbeiternummer + '"')

          row = cur.fetchone()


          if str(row[5]) == "nowork":
            cur.execute('UPDATE personal SET status = "' + status + '"WHERE mitarbeiternummer = "' + mitarbeiternummer + '"')
            cur.execute('UPDATE personal SET datum = "' + str(date) + '"WHERE mitarbeiternummer = "' + mitarbeiternummer + '"')
            con.commit()
          else:
            cur.execute('UPDATE personal SET datum = "' + str(date) + '"WHERE mitarbeiternummer = "' + mitarbeiternummer + '"')
            cur.execute('INSERT INTO zeiterfassung(mitarbeiternummer, status, anfang, ende) VALUES("' + mitarbeiternummer + '", "' + str(row[5]) + '", "' + str(row[6]) + '", "' + str(date) + '")')
            cur.execute('UPDATE personal SET status = "' + status + '"WHERE mitarbeiternummer = "' + mitarbeiternummer + '"')
            con.commit()
      except mdb.Error, e:
          print "Error %d: %s" % (e.args[0], e.args[1])
          sys.exit(1)
      finally:
          if con:
              con.close()
      return json.dumps("Neuer Status: " + status)
   status_aendern.exposed = True
   
   #-------------------------------------------------------
   def projekt_zuweisen_formular(self, id):
   #-------------------------------------------------------
      con = None
      ausgabe = ""
      try:
           con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
           cur = con.cursor()
		   
           cur.execute('SELECT mitarbeitername FROM personal WHERE mitarbeiternummer ="' + id + '"')
           name = cur.fetchone()
		   
           cur.execute('SELECT * FROM projekt WHERE mitarbeiternummer = "' + str(name[0]) +'"')
           rows = cur.fetchall()

           for row in rows:
              ausgabe = ausgabe + '<tr><td>' + str(row[1]) + '</td><td><input type="submit" class="projekt_loeschen" value="loeschen" id="' + str(row[2]) + '"/></tr>'
      except mdb.Error, e:
            print "Error %d: %s" % (e.args[0], e.args[1])
            sys.exit(1)
      finally:
            if con:
                con.close()
      mytemplate = Template(filename = 'html/Projekte_Zuweisen_Template.html', input_encoding = 'utf-8')
      template_s = mytemplate.render(Projekte = ausgabe)
      return json.dumps(template_s)
   projekt_zuweisen_formular.exposed = True 
   
   #-------------------------------------------------------
   def projekt_loeschen(self, id):
   #-------------------------------------------------------
       con = None
       try:
            con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
            cur = con.cursor()
            cur.execute('DELETE FROM projekt where nummer ="' + id + '"')
            con.commit()
       except mdb.Error, e:
            print "Error %d: %s" % (e.args[0], e.args[1])
            sys.exit(1)
       finally:
            if con:
                con.close()	
       return json.dumps("Projekt geloescht")
   projekt_loeschen.exposed = True	
			
   #-------------------------------------------------------
   def projekt_zuweisen(self, id, projektname):
   #-------------------------------------------------------
       con = None
       try:
            con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
            cur = con.cursor()
			
            cur.execute('SELECT mitarbeitername FROM personal WHERE mitarbeiternummer ="' + id + '"')
            name = cur.fetchone()

            cur.execute('INSERT INTO projekt(mitarbeiternummer, projekt) VALUES("' + str(name[0]) + '","' + projektname + '")')
            con.commit() 

       except mdb.Error, e:
            print "Error %d: %s" % (e.args[0], e.args[1])
            sys.exit(1)
       finally:
            if con:
                con.close()
       return json.dumps("Projekt zugewiesen")
   projekt_zuweisen.exposed = True


   #----------------------------------------------------------
   def deliver_admin(self, admin, passwort):
   #----------------------------------------------------------
      con = None
      ausgabe = ""
      try:
          con = mdb.connect('localhost','root','ias2013','ias2013')
          cur = con.cursor()
          cur.execute('SELECT * FROM personal WHERE mitarbeiternummer ="' + admin +'"');
          row_x = cur.fetchone()

          if str(row_x[4]) == passwort:
             if str(row_x[3]) == "Admin":
                mytemplate = Template(filename = 'html/admin.html', input_encoding = 'utf-8')
                ausgabe = ausgabe + '<p></p><div class="koerperX">Willkommen ' + str(row_x[0]) + '</div><p></p><p></p><p></p>'
                cur.execute('SELECT * FROM News ORDER BY Datum DESC')
                rows = cur.fetchall()
                for row in rows:
                   ausgabe = ausgabe + '<div class="newsmother"><div class="koerperX">' + str(row[3]) + '</div>'
                   ausgabe = ausgabe + '<div class="newsdate">' + str(row[2]) + '<p><a href="#" class="delete" id="' + str(row[1]) + '">delete</a></p></div>'
                   ausgabe = ausgabe + '<p></p>' + '<div class="newstext">' + str(row[0]) + '<p></p>'
                   cur.execute('SELECT * FROM personal WHERE Mitarbeiternummer="' + str(row[4]) + '"')
                   row_y = cur.fetchone()
                   ausgabe = ausgabe + 'Posted by ' + str(row_y[0]) + '</div><p></p></div>'
             else:
                return json.dumps("Keine Zugriffsrechte")   
            
          else:
              return json.dumps("Zugriff verweigert")
      except mdb.Error, e:
            print "Error %d: %s " % (e.args[0], e.args[1])
            sys.exit(1)
      finally:
          if con:
              con.close()
      template_s = mytemplate.render(News = ausgabe)
      return json.dumps(template_s)
   deliver_admin.exposed = True

   #----------------------------------------------------------
   def delete_time(self, id):
   #----------------------------------------------------------
       con = None
       try:
           con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
           cur = con.cursor()

           cur.execute("DELETE FROM zeiterfassung WHERE id=%s", (id))
           con.commit()

       except mdb.Error, e:
           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)

       finally:
           if con:
               con.close()

       return json.dumps("True")
   delete_time.exposed = True


   #----------------------------------------------------------
   def tabelle_ausliefern(self, mitarbeiternummer, order, direction):
   #----------------------------------------------------------
      con = None
      ausgabe = ""
      zeit = datetime.datetime.today()-datetime.datetime.today()
      zeitw = datetime.datetime.today()-datetime.datetime.today()
      try:
            con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
            cur = con.cursor()

            cur.execute('SELECT * FROM zeiterfassung WHERE mitarbeiternummer = "' + mitarbeiternummer +'" ORDER BY ' + order + '  ' + direction)
            rows = cur.fetchall()
            ausgabe = ausgabe + '<table><tr><th class="tid">UID</th>'
            ausgabe = ausgabe + '<th class="state">Status</th>'
            ausgabe = ausgabe + '<th class="begin">Anfang</th>'
            ausgabe = ausgabe + '<th class="end">Ende</th>'
            ausgabe = ausgabe + '<th class="zeit">Zeit</th>'
            ausgabe = ausgabe + '<th class="del">Löschen</th>'
            ausgabe = ausgabe + '<th class="upd">Bearbeiten</th></tr>'
            
            for row in rows:
                  ausgabe = ausgabe + '<tr><td class="tid">' + str(row[3]) +'</td>'
                  ausgabe = ausgabe + '<td class="state">' + str(row[0]) +'</td>'
                  ausgabe = ausgabe + '<td class="begin">' + str(row[1]) +'</td>'
                  ausgabe = ausgabe + '<td class="end">' + str(row[2]) +'</td>'
                  ausgabe = ausgabe + '<td class="zeit">' + str(row[2]-row[1]) +'</td>'
                  ausgabe = ausgabe + '<td class="del"><input type="submit" value="Loeschen" class="delx" id="' + str(row[4]) + '"/></td>'
                  ausgabe = ausgabe + '<td class="upd"><input type="submit" value="Bearbeiten" class="updx" id="'+ str(row[4]) + '" /></td></tr>'

                  if str(row[0]) == "pause":
                    zeit = zeit + ( row[2]-row[1] )
                  else:
                    zeitw = zeitw + ( row[2]-row[1] )
            ausgabe = ausgabe + '<tr class="timerow"><td></td><td></td><td></td><td></td><td>Gesamt (Arbeit): ' + str(zeitw) +'</td><td></td><td></td></tr>'
            ausgabe = ausgabe + '<tr class="timerow"><td></td><td></td><td></td><td></td><td>Gesamt (Pause): ' + str(zeit) +'</td><td></td><td></td></tr></table>'

      except mdb.Error, e:
            print "Error %d: %s " % (e.args[0], e.args[1])
            sys.exit(1)
      finally:
          if con:
              con.close()
      return json.dumps(ausgabe)
   tabelle_ausliefern.exposed = True

   #----------------------------------------------------------
   def deliver_id(self):
   #----------------------------------------------------------
       con = None
       ausgabe = ""
       try:
           con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
           cur = con.cursor()
           cur.execute('SELECT * FROM personal')

           rows = cur.fetchall()
           


           ausgabe = ausgabe + '<select name="mitarbeiter" id="mitarbeiter_id""><option value="X">Name auswählen...</option>'
           for row in rows:
                ausgabe = ausgabe +'<option value="'+ str(row[1]) +'">' + str(row[1]) + ' - '+ row[0] + '</option>'
           ausgabe = ausgabe + '</select>'
       except mdb.Error, e:
            print "Error %d: %s " % (e.args[0], e.args[1])
            sys.exit(1)
       finally:
          if con:
              con.close()
       return json.dumps(ausgabe)
   deliver_id.exposed = True

   #----------------------------------------------------------
   def DBS(self):
   #----------------------------------------------------------

       con = None
       try:
           con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
           cur = con.cursor()

           cur.execute('') 
           print cur;
       except mdb.Error, e:
           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)
       finally:
          if con:
              con.close()
   DBS.exposed = True

   #----------------------------------------------------------
   def edit_time_submit(self, status, a_y, a_mo, a_d, a_h, a_mi, a_s, e_y, e_mo, e_d, e_h, e_mi, e_s, projekt, id):
   #----------------------------------------------------------
        try:
           con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
           cur = con.cursor()

           anfang = datetime.datetime(int(a_y), int(a_mo), int(a_d), int(a_h), int(a_mi), int(a_s))
           ende = datetime.datetime(int(e_y), int(e_mo), int(e_d), int(e_h), int(e_mi), int(e_s))
          
           cur.execute('UPDATE zeiterfassung SET status="' + status + '" WHERE id="' + id + '"')
           cur.execute('UPDATE zeiterfassung SET anfang="' + str(anfang)+ '" WHERE id="' + id + '"')
           cur.execute('UPDATE zeiterfassung SET ende="' + str(ende) + '" WHERE id="' + id + '"')
           cur.execute('UPDATE zeiterfassung SET projekt="' + projekt + '" WHERE id="' + id + '"')
           con.commit()
           
        except mdb.Error, e:
           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)
        finally:
          if con:
              con.close()
        return json.dumps("True")
   edit_time_submit.exposed = True
   
   #----------------------------------------------------------   
   def delete_user(self, id):
   #----------------------------------------------------------
      con = None
      try:
         con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
         cur = con.cursor()
         cur.execute('SELECT mitarbeitername FROM personal WHERE mitarbeiternummer = "' + id + '"')
         name = cur.fetchone()
         cur.execute('DELETE FROM zeiterfassung WHERE mitarbeiternummer = "' + id + '"')
         cur.execute('DELETE FROM personal WHERE mitarbeiternummer ="' + id + '"')
         cur.execute('DELETE FROM projekt WHERE mitarbeiternummer = "' + str(name[0]) + '"')
		 
         con.commit()
         return json.dumps("Mitarbeiter geloescht.")
      except mdb.Error, e:
         print "Error %d: %s " % (e.args[0], e.args[1])
         sys.exit(1)
      finally:
          if con:
            con.close()	  
   delete_user.exposed = True

   #----------------------------------------------------------
   def edit_time(self, id):
   #----------------------------------------------------------

       ausgabe = ""
       con = None
       try:
           con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
           cur = con.cursor()
           
           cur.execute('SELECT * FROM zeiterfassung WHERE id="' + id + '"')

           row = cur.fetchone()

           #Status-----
           ausgabe = ausgabe + '<p>Status</p><input type="text" id="status_ed" value="' + str(row[0]) + '"></input>'
           #Datum-Anfang-----
           ausgabe = ausgabe + '<p>Anfang</p><p>Datum: <input type="text" style="width: 30px;" id="anfang_year" value="' + str(row[1].year) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="anfang_month" value="' + str(row[1].month) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="anfang_day" value="' + str(row[1].day) + '"></input>'
           #Zeit-Anfang-----
           ausgabe = ausgabe + '<p>Zeit: <input type="text" style="width: 20px;" id="anfang_hour" value="' + str(row[1].hour) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="anfang_minute" value="' + str(row[1].minute) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="anfang_second" value="' + str(row[1].second) + '"></input></p>'
           #Datum-Ende-----
           ausgabe = ausgabe + '<p>Ende</p><p>Datum: <input type="text" style="width: 30px;" id="ende_year" value="' + str(row[2].year) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="ende_month" value="' + str(row[2].month) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="ende_day" value="' + str(row[2].day) + '"></input>'
           #Zeit-Ende-----
           ausgabe = ausgabe + '<p>Zeit: <input type="text" style="width: 20px;" id="ende_hour" value="' + str(row[2].hour) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="ende_minute" value="' + str(row[2].minute) + '"></input>'
           ausgabe = ausgabe + '<input type="text" style="width: 20px;" id="ende_second" value="' + str(row[2].second) + '"></input>'
           #Projekt-----
           ausgabe = ausgabe + '<p>Projekt</p><input type="text" id="project_ed" value="' + str(row[5]) + '"></input>'
           #Submit-----
           ausgabe = ausgabe + '<p></p><input type="submit" class="submit_ed" id="'+ str(row[4]) + '" value="Submit"/>'
       except mdb.Error, e:
           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)
       finally:
          if con:
              con.close()
       return json.dumps(ausgabe)
   edit_time.exposed = True

   #----------------------------------------------------------
   def deliver_project(self, id):
   #----------------------------------------------------------
      ausgabe =""
      con = None
      try:
          con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
          cur = con.cursor()
          cur.execute('SELECT * FROM personal WHERE mitarbeiternummer = "' + id +'"')
          name = cur.fetchone()
          name = str(name[0])

          cur.execute('SELECT * FROM projekt WHERE mitarbeiternummer="' + name +'"')
          rows = cur.fetchall()
          ausgabe = ausgabe + '<select name="projekt" id="project_id""><option value="X">Projekt auswählen...</option>'
          for row in rows:
              ausgabe = ausgabe + '<option id="' + str(row[1]) + '">' + str(row[1]) + '</option>'
          ausgabe = ausgabe + '</select>'
      except mdb.Error, e:
          print "Error %d: %s " % (e.args[0], e.args[1])
          sys.exit(1)
      finally:
          if con:
              con.close()
      return json.dumps(ausgabe)
   deliver_project.exposed = True


   #----------------------------------------------------------
   def deliver_new(self):
   #----------------------------------------------------------
      mytemplate = Template(filename = 'html/new.html', input_encoding = 'utf-8');
      template_s = mytemplate.render()
      return json.dumps(template_s)
   deliver_new.exposed = True



   #----------------------------------------------------------
   def neuer_mitarbeiter(self, Name, Passwort, Rolle, Projekt):
   #----------------------------------------------------------
      con = None
      ausgabe = ""
      try:
            con = mdb.connect('localhost', 'root', 'ias2013', 'ias2013')
            #cur = con.insert_id()
            cur = con.cursor()

            cur.execute('INSERT INTO personal(mitarbeitername, passwort, rolle) VALUES("' + Name + '","' + Passwort + '","' + Rolle + '")')
            cur.execute('INSERT INTO projekt(mitarbeiternummer, projekt) VALUES("' + Name + '","' + Projekt + '")')
            con.commit()

      except mdb.Error, e:
            
            print "Error %d: %s " % (e.args[0], e.args[1])
            sys.exit(1)
      
      finally:
            
          if con:
              con.close()
      return json.dumps("True")
   neuer_mitarbeiter.exposed = True

   #----------------------------------------------------------
   def deliver_new_news(self):
   #----------------------------------------------------------
      mytemplate = Template(filename = 'html/new_news.html', input_encoding = 'utf-8');
      template_s = mytemplate.render()
      return json.dumps(template_s)
   deliver_new_news.exposed = True


   #-------------------------------------------------------
   def edit_user_send(self, id):
   #-------------------------------------------------------   
       mytemplate = Template(filename = 'html/Edit_User_Template.html', input_encoding = 'utf-8')
       con = None
       try:
           con = mdb.connect('localhost', 'root','ias2013','ias2013')
           cur = con.cursor()

           cur.execute('SELECT * FROM personal WHERE Mitarbeiternummer= "' + id + '"')
           row = cur. fetchone()
           template_s = mytemplate.render(Name = str(row[0]), Rolle = str(row[3]), Passwort  = str(row[4]), PIN = str(row[2]))
           return json.dumps(template_s)
       except mdb.Error, e:

           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)

       finally:
           
           if con:
               con.close()

   edit_user_send.exposed = True

   #-------------------------------------------------------
   def edit_user_submit(self, id, Name, Rolle, Passwort, PIN):
   #-------------------------------------------------------
       con = None
       try:
          con = mdb.connect('localhost', 'root','ias2013','ias2013')
          cur = con.cursor()

          cur.execute('UPDATE personal SET mitarbeitername ="' + Name +'" WHERE mitarbeiternummer = "' + id + '"')
          cur.execute('UPDATE personal SET rolle ="' + Rolle +'" WHERE mitarbeiternummer = "' + id + '"')
          cur.execute('UPDATE personal SET adminpw ="' + Passwort +'" WHERE mitarbeiternummer = "' + id + '"')
          cur.execute('UPDATE personal SET passwort ="' + PIN +'" WHERE mitarbeiternummer = "' + id + '"')
          con.commit()
          return json.dumps("Mitarbeiter bearbeitet")
       except mdb.Error, e:

           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)

       finally:
           
           if con:
               con.close()


   edit_user_submit.exposed = True


   #-------------------------------------------------------
   def delete_news(self, id):
   #-------------------------------------------------------
       con = None
       try:
           con = mdb.connect('localhost', 'root','ias2013','ias2013')
           cur = con.cursor()

           cur.execute("DELETE FROM News WHERE Nr=%s", (id))
           con.commit()

       except mdb.Error, e:

           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)

       finally:
           
           if con:
               con.close()
       return json.dumps("True")
   delete_news.exposed = True


   #-------------------------------------------------------
   def neue_news(self, Titel, Text, Name):
   #-------------------------------------------------------
       con = None
       ausgabe = ""
       Date = datetime.datetime.today()
       try:
           con = mdb.connect('localhost', 'root','ias2013','ias2013')
           cur = con.cursor()

           cur.execute('INSERT INTO News(News, Datum, Titel, UID) VALUES("' + Text + '","' + str(Date) + '","' + Titel + '","' + Name +'")')
           con.commit()

       except mdb.Error, e:

           print "Error %d: %s " % (e.args[0], e.args[1])
           sys.exit(1)

       finally:

           if con:
               con.close()
       return json.dumps("True")
   neue_news.exposed = True



   #-------------------------------------------------------
   def __init__(self):
   #-------------------------------------------------------
      # spezielle Initialisierung können hier eingetragen werden
      pass



   #-------------------------------------------------------
   def default(self, *arguments, **kwargs):
   #-------------------------------------------------------
      msg_s = "<strong>Application: unbekannte Anforderung: " + \
              str(arguments) + \
              ' ' + \
              str(kwargs) + \
              "</strong>"
      raise cherrypy.HTTPError(404, msg_s) 
   default.exposed= True
  
# EOF