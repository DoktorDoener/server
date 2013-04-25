$(document).ready(function()
	{   
		
		$("#logout_x").click(function(){
			document.cookie = "name =";				//Cookie löschen durch Zuweisung mit nichts
			document.cookie = "passwort =";
			location.reload();
		});
		
		$("#login_x").click(function()
		{
			var name = $("#user").val();			//Auslesen der Login-Daten
			var passwort = $("#password").val();
	
			$("#login_area").html('<div class="ball"></div><div class="ball1"></div>');
			$("#login_area").append("<p id='verifying'>VERIFYING DATA</p>");				//Pseudo-Login-Prozess
			
			$.getJSON("deliver_admin", { admin: name, passwort: passwort }, function(data){
				if(data!="Zugriff verweigert" && data != "Keine Zugriffsrechte" && data != "Nutzer existiert nicht"){
					setCookie("name", name);			//Cookies mit den ausgelesenen Login-Daten füllen
					setCookie("passwort", passwort);
					setTimeout(function () {
					$('body').html(data);
					}, 3000); //Verzögerung des Login-Prozesses
						$('.delete').bind('click', delnewsbind);		//Binden der Funktion um Newseinträge zu löschen
					}
				else if(data == "Zugriff verweigert"){			
					$("#login_area").html('<div id="wrong">Zugriff verweigert</div>');
				}
				
				else if(data == "Keine Zugriffsrechte"){
					$("#login_area").html('<div id="wrong"><strong>Keine Zugriffsrechte</strong></div>');
				}
				else if(data == "Nutzer existiert nicht"){
					$("#login_area").html('<div id="wrong"><strong>Nutzer existiert nicht</strong></div>');
				}				
			});
			
			
		});
		
		$("#user").keypress(function (e)
		{			
			var name = $("#user").val();
			var passwort = $("#password").val();
			
			
			
			if (e.which == 13){
				
			$("#login_area").html('<div class="ball"></div><div class="ball1"></div>');
			$("#login_area").append("<p id='verifying'>VERIFYING DATA</p>");
			
			$.getJSON("deliver_admin", { admin: name, passwort: passwort }, function(data){
				if(data!="Zugriff verweigert" && data != "Keine Zugriffsrechte" && data != "Nutzer existiert nicht"){
					setCookie("name", name);
					setCookie("passwort", passwort);
					setTimeout(function () {
					$('body').html(data);
						}, 3000);
						$('.delete').bind('click', delnewsbind);
					}
				else if(data == "Zugriff verweigert"){
					$("#login_area").html('<div id="wrong">Zugriff verweigert</div>');
				}
				
				else if(data == "Keine Zugriffsrechte"){
					
				}
				
				else if(data == "Nutzer existiert nicht"){
					$("#login_area").html('<div id="wrong"><strong>Nutzer existiert nicht</strong></div>');
				}
			});
			}
			
			
			
		});
		
		$("#password").keypress(function (e)
		{	
			var name = $("#user").val();
			var passwort = $("#password").val();
			
			if (e.which == 13){
				
			$("#login_area").html('<div class="ball"></div><div class="ball1"></div>');
			$("#login_area").append("<p id='verifying'>VERIFYING DATA</p>");
			
			$.getJSON("deliver_admin", { admin: name, passwort: passwort }, function(data){
				if(data!="Zugriff verweigert" && data != "Keine Zugriffsrechte" && data != "Nutzer existiert nicht"){
					setCookie("name", name);
					setCookie("passwort", passwort);
					setTimeout(function () {
					$('body').html(data);
					}, 3000);
						$('.delete').bind('click', delnewsbind);
					}
				else if(data == "Zugriff verweigert"){
					$("#login_area").html('<div id="wrong"><strong>Zugriff verweigert</strong></div>');
				}
				else if(data == "Keine Zugriffsrechte"){
					$("#login_area").html('<div id="wrong"><strong>Keine Zugriffsrechte</strong></div>');
				}
				else if(data == "Nutzer existiert nicht"){
					$("#login_area").html('<div id="wrong"><strong>Nutzer existiert nicht</strong></div>');
				}
			});
			}
			
		});
		
		$("#projekt_zuordnen").click(function(data){
			$.getJSON("deliver_id",{}, function(data){
				$('#positioner').html('<div class="box"><strong><p>Projekte bearbeiten</p></strong>' + data + '</div>');
				$('.tabelle2').html("");
				$('#mitarbeiter_id').bind('change', projbind);
			});
			
		});
		
		$("#deliver_new").click(function(){
			$.getJSON("deliver_new",{}, function(data){
				$('#positioner').html('<div class="box" ><strong><p>Mitarbeiter anlegen</strong></p>' + data + '</div>')
				$('.tabelle2').html(" ");
				$('#create_user').bind('click', crubind);
			});
		});
		
		$("#deliver_new_news").click(function(){
			$.getJSON("deliver_new_news",{}, function(data){
				$('#positioner').html('<div class="box"><p><strong>Neue News anlegen</strong></p>' + data + '</div>');
				$('.tabelle2').html(" ");
				$('#create_news').bind('click', newsbind);
			});
		});
		
		
		$("#create_user").click(function()
		{
			var name_t = $("#new_name").val();
			var passwort_t = $("#new_password").val();
			var rolle_t = $("#rolle_m").val();
			var projekt_t = $("#new_projekt").val();
			
			
			$.getJSON("neuer_mitarbeiter", {Name: name_t, Passwort: passwort_t, Rolle: rolle_t, Projekt: projekt_t} , function(data){
				alert("gespeichert");
			});
		
		
		});
		
		$("#Restart").click(function(){
			$.getJSON("Restart",{}, function(data){
				alert(data);
				location.reload();
				
			});
		});
		
		
		$("#edit_user").click(function(){
			$.getJSON("deliver_id",{}, function(data){
				$('#positioner').html('<div class="box" ><strong><p>Mitarbeiter bearbeiten</p></strong>' + data + '</div>');
				$('.tabelle2').html(" ");
				$('#mitarbeiter_id').bind('change', eubind);
			});
		});

		
		$("#cancel").click(function(){
			$(".modal").css("display", "none");
			$("#confirm").unbind();
		});
	
		

		

		
		$("#deliver_id").click(function(){
			$.getJSON("deliver_id",{}, function(data){
				$('#positioner').html('<div class="box" ><strong><p>Tabelle anzeigen</p></strong>' + data + '</div>');
				$('.tabelle2').html(" ");
				$('#mitarbeiter_id').bind('change', optbind);
			});
		});
		
		$("#news").click(function(){
			location.reload();
		});

		

		
	});
	
	function delnewsbind(){
		var id =$(this).attr("id");
		
		$.getJSON("delete_news",{id: id}, function(data){
			$('#positioner').html('<div class="box"><p><strong>News geloescht</strong></p></div>');
			
		});
		
	}
	
	function delbind(){
	var idd = $(this).attr("id");
		$(".modal").css("display", "inherit");
				$("#confirm").bind('click',function(){
					$.getJSON("delete_time",{id: idd}, function(data){
						var id = $("#mitarbeiter_id").val();
						$.getJSON("tabelle_ausliefern",{mitarbeiternummer: id, order: "anfang", direction: "ASC"}, function(data){
							$(".modal").css("display", "none");
							$('.tabelle2').html(data);
							alert("Daten geloescht");
							$('.delx').bind("click", delbind);
							$('.updx').bind("click", updbind);
							$('.tid').bind('mouseenter', tide);
							$('.tid').bind('mouseleave', tidl);
							$('.state').bind('mouseenter', statee);
							$('.state').bind('mouseleave', statel);
			         		$('.begin').bind('mouseenter', begine);
							$('.begin').bind('mouseleave', beginl);
							$('.end').bind('mouseenter', ende);
							$('.end').bind('mouseleave', endl);
							$('.zeit').bind('mouseenter', zeite);
							$('.zeit').bind('mouseleave', zeitl);
							$('.upd').bind('mouseenter', upde);
							$('.upd').bind('mouseleave', updl);
							$('.del').bind('mouseenter', dele);
							$('.del').bind('mouseleave', dell);
							$('tr').bind('mouseenter', tre);
							$('tr').bind('mouseleave', trl);
							$('.timerow').bind('mouseenter', timerowe);
							$('.timerow').bind('mouseleave', timerowl);
							$("#confirm").unbind();
						});
					});
				});
	
	}
	
	function optbind(){
	var sortierung = "anfang"; // anfang
	var id = $("#mitarbeiter_id").val();
			$.getJSON("tabelle_ausliefern",{mitarbeiternummer: id, order: sortierung, direction: "ASC"}, function(data){
				$('.tabelle2').html(data);
				$('.delx').bind("click", delbind);
				$('.updx').bind("click", updbind);
				$('.tid').bind('mouseenter', tide);
				$('.tid').bind('mouseleave', tidl);
				$('.state').bind('mouseenter', statee);
				$('.state').bind('mouseleave', statel);
                $('.begin').bind('mouseenter', begine);
				$('.begin').bind('mouseleave', beginl);
				$('.end').bind('mouseenter', ende);
				$('.end').bind('mouseleave', endl);
				$('.zeit').bind('mouseenter', zeite);
				$('.zeit').bind('mouseleave', zeitl);
				$('.upd').bind('mouseenter', upde);
				$('.upd').bind('mouseleave', updl);
				$('.del').bind('mouseenter', dele);
				$('.del').bind('mouseleave', dell);
				$('tr').bind('mouseenter', tre);
				$('tr').bind('mouseleave', trl);
				$('.timerow').bind('mouseenter', timerowe);
				$('.timerow').bind('mouseleave', timerowl);
					});	
	}
	
	function sortierte_ausgabe(){
	var sortierung = "status";		
	var id = $("#mitarbeiter_id").val();
			$.getJSON("tabelle_ausliefern",{mitarbeiternummer: id, order: sortierung, direction: "ASC"}, function(data){
				$('.tabelle2').html(data);
				$('.delx').bind("click", delbind);
				$('.updx').bind("click", updbind);
				$('.tid').bind('mouseenter', tide);
				$('.tid').bind('mouseleave', tidl);
				$('.state').bind('mouseenter', statee);
				$('.state').bind('mouseleave', statel);
                $('.begin').bind('mouseenter', begine);
				$('.begin').bind('mouseleave', beginl);
				$('.end').bind('mouseenter', ende);
				$('.end').bind('mouseleave', endl);
				$('.zeit').bind('mouseenter', zeite);
				$('.zeit').bind('mouseleave', zeitl);
				$('.upd').bind('mouseenter', upde);
				$('.upd').bind('mouseleave', updl);
				$('.del').bind('mouseenter', dele);
				$('.del').bind('mouseleave', dell);
				$('tr').bind('mouseenter', tre);
				$('tr').bind('mouseleave', trl);
				$('.timerow').bind('mouseenter', timerowe);
				$('.timerow').bind('mouseleave', timerowl);
					});	
	}
	
	function sortierte_ausgabe_anfang(){
	var sortierung = "anfang";		
	var id = $("#mitarbeiter_id").val();
			$.getJSON("tabelle_ausliefern",{mitarbeiternummer: id, order: sortierung, direction: "ASC"}, function(data){
				$('.tabelle2').html(data);
				$('.delx').bind("click", delbind);
				$('.updx').bind("click", updbind);
				$('.tid').bind('mouseenter', tide);
				$('.tid').bind('mouseleave', tidl);
				$('.state').bind('mouseenter', statee);
				$('.state').bind('mouseleave', statel);
                $('.begin').bind('mouseenter', begine);
				$('.begin').bind('mouseleave', beginl);
				$('.end').bind('mouseenter', ende);
				$('.end').bind('mouseleave', endl);
				$('.zeit').bind('mouseenter', zeite);
				$('.zeit').bind('mouseleave', zeitl);
				$('.upd').bind('mouseenter', upde);
				$('.upd').bind('mouseleave', updl);
				$('.del').bind('mouseenter', dele);
				$('.del').bind('mouseleave', dell);
				$('tr').bind('mouseenter', tre);
				$('tr').bind('mouseleave', trl);
				$('.timerow').bind('mouseenter', timerowe);
				$('.timerow').bind('mouseleave', timerowl);
					});	
	}
	
	
	function updbind(){
		var id = $(this).attr("id");
		$.getJSON("edit_time", {id: id}, function(data){
			$('.tabelle2').html('<div class="box">' + data + '</div>');
			$('.submit_ed').bind('click', editfunc);
		});
		
	}

	
	function editfunc(){
		var status =$('#status_ed').val();
		var a_y =$('#anfang_year').val();
		var a_mo =$('#anfang_month').val();
		var a_d =$('#anfang_day').val();
		var a_h =$('#anfang_hour').val();
		var a_mi =$('#anfang_minute').val();
		var a_s =$('#anfang_second').val();
		var e_y =$('#ende_year').val();
		var e_mo =$('#ende_month').val();
		var e_d =$('#ende_day').val();
		var e_h =$('#ende_hour').val();
		var e_mi =$('#ende_minute').val();
		var e_s =$('#ende_second').val();
		var projekt =$('#project_ed').val();
		var id =$(this).attr("id");
		
		var idd = $("#mitarbeiter_id").val();
		
		
		
		$.getJSON("edit_time_submit", {status: status, a_y: a_y, a_mo: a_mo, a_d: a_d, a_h: a_h, a_mi: a_mi, a_s: a_s,e_y: e_y, e_mo: e_mo, e_d: e_d, e_h: e_h, e_mi: e_mi, e_s: e_s, projekt: projekt, id: id}, function(data){

			$.getJSON("tabelle_ausliefern",{mitarbeiternummer: idd, order: "anfang", direction: "ASC"}, function(data){
							$('.tabelle2').html(data);
							alert("Daten geändert");
							$('.delx').bind("click", delbind);
							$('.updx').bind("click", updbind);
							$('.tid').bind('mouseenter', tide);
							$('.tid').bind('mouseleave', tidl);
							$('.state').bind('mouseenter', statee);
							$('.state').bind('mouseleave', statel);
                            $('.begin').bind('mouseenter', begine);
							$('.begin').bind('mouseleave', beginl);
							$('.end').bind('mouseenter', ende);
							$('.end').bind('mouseleave', endl);
							$('.zeit').bind('mouseenter', zeite);
							$('.zeit').bind('mouseleave', zeitl);
							$('.upd').bind('mouseenter', upde);
							$('.upd').bind('mouseleave', updl);
							$('.del').bind('mouseenter', dele);
							$('.del').bind('mouseleave', dell);
							$('tr').bind('mouseenter', tre);
							$('tr').bind('mouseleave', trl);
							$('.timerow').bind('mouseenter', timerowe);
							$('.timerow').bind('mouseleave', timerowl);
						});
		
		});
	
	}


	function tide(){
	
	$(".tid").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	

	}

	function tidl(){


	$(".tid").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	
	}

	function statee(){
	

	$(".state").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	

	}
	function statel(){

	$(".state").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	
	}

	function begine(){
	
	$(".begin").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	

	}
	function beginl(){


	
	$(".begin").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	
	}
	
	function ende(){
	
	
	$(".end").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	

	}
	function endl(){


	
	$(".end").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	
	}

	function zeite(){
	
	$(".zeit").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");


	}
	function zeitl(){

	$(".zeit").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	
	}

	function dele(){
	
	
	$(".del").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	

	}
	function dell(){


	
	$(".del").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	
	}

	function upde(){
	
	
	$(".upd").css("background-color", "rgba(255,255,255,0.3)");
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	

	}
	function updl(){


	$(".upd").css("background-color", "");
	$(this).css("color", "");
	$(this).css("background-color", "");
		
	}

	function tre(){

	$(this).css("background-color", "rgba(255,255,255,0.3)");
	
	}

	function trl(){
	
	$(this).css("background-color", "");
	

	}
	function timerowe(){
	$(this).css("color", "rgba(255,255,255,1)");
	$(this).css("background-color", "rgba(122,122,255,0.6)");
	
	}

	function timerowl(){
	$(this).css("color", "");
	$(this).css("background-color", "");
	

	}

	
	function crubind(){
			var name_t = $("#new_name").val();
			var passwort_t = $("#new_password").val();
			var rolle_t = $("#new_role").val();
			var projekt_t = $("#new_projekt").val();
			
			$.getJSON("neuer_mitarbeiter", {Name: name_t, Passwort: passwort_t, Rolle: rolle_t, Projekt: projekt_t} , function(data){
				$('.box').html("Neuen Mitarbeiter angelegt.");
			});
		
	}
	
	function newsbind(){
			var titel = $("#new_title").val();
			var text = $("#news_text").val();
			var name=getCookie("name");

			$.getJSON("neue_news",{Titel: titel, Text: text, Name: name}, function(data)
			{
				$('.box').html("Neue News angelegt.");
			});
		
	}
	
	function eubind(){
		var idd = $("#mitarbeiter_id").val();
		$.getJSON("edit_user_send",{id: idd}, function(data){
			var data2 = $('#mitarbeiter_id').val();
			$('.box').html('<div class="unselectable">' + data2 + '</div><strong><p>Mitarbeiter bearbeiten</p></strong>' + data);
			$('#edit_user_senden').bind('click', eusend);
			$("#delete_user").bind('click', eudelete);
		});
		
	}
	
	function eusend(){
	   var idd = $(".unselectable").html();
	   var name = $("#usernameX").val();
	   var rolle = $("#Rolle").val();
	   var pwd = $("#Passwort_u").val();
	   var pin = $("#PIN").val();	
	   $.getJSON("edit_user_submit",{id: idd, Name: name, Rolle: rolle, Passwort: pwd, PIN: pin }, function(data){
		  $('.tabelle2').html("");
		  $('#positioner').html(data); 
		  
	   });
	}
	
	function eudelete(){
	
	var idd = $(".unselectable").html();
		$.getJSON("delete_user",{id: idd}, function(data){
		  $('.tabelle2').html("");
		  $('.box').html(data); 
		  
	   });
	}
	
	function projbind(){
		var id = $("#mitarbeiter_id").val();
		$.getJSON("projekt_zuweisen_formular",{id: id},function(data){
			$('.box').html('<div class="unselectable">' + id + '</div><strong><p>Projekte bearbeiten</p></strong>' + data);
			$("#projekt_zuweisen").bind('click', projsubmit);
			$(".projekt_loeschen").bind('click', projdel);
		});
		
	}
	
	function projbind2(){
		var id = $(".unselectable").html();
		$.getJSON("projekt_zuweisen_formular",{id: id},function(data){
			$('.box').html('<div class="unselectable">' + id + '</div><strong><p>Projekte bearbeiten</p></strong>' + data);
			$("#projekt_zuweisen").bind('click', projsubmit);
			$(".projekt_loeschen").bind('click', projdel);
		});
		
	}
	
	function projdel(){
		var id = $(this).attr("id");
		$.getJSON("projekt_loeschen",{ id: id }, function(data){
			projbind2();
		});
	}
	
	function projsubmit(){
	var id = $(".unselectable").html();
	var name = $("#projekt_name").val();
	$.getJSON("projekt_zuweisen", {id: id, projektname: name},function(data){
		projbind2();
	});
		
	}
	
	function getCookie(c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++)
				  {
				  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name)
	    {
    		return unescape(y);
		    }
		  }
	}

	function setCookie(c_name,value,exdays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
			document.cookie=c_name + "=" + c_value;
		}

	function checkCookie(){
			var name=getCookie("name");
			var passwort=getCookie("passwort");
			if (name!=null && name!="" && passwort!=null && passwort!="")
		  {
			$.getJSON("deliver_admin", { admin: name, passwort: passwort }, function(data){
				
				$('body').html(data);
				$('.delete').bind('click', delnewsbind);
				
			});
	  }
	  else{
	
		$("#img_mitarbeiter").css("visibility", "visible");
		$("#img_sachbearbeiter").css("visibility", "visible");
	  
	  }

}