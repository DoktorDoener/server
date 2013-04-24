// connector.js

//-----------------------------------------------
// Schnittstelle zu Daten via JSON
//-----------------------------------------------


$(document).ready(function()
	{	
		// Seite für Mitarbeiter aufrufen
		$("#img_mitarbeiter").click(function()
		{ //alert("klick");
			var string = $(this).attr('name');		
			$.getJSON("Seite_ausliefern", {art: string}, function(data)
			{
				// an welcher Stelle soll ausgeliefert werden?
				$('body').html(data);		
			});
			
			$.getJSON("mitarbeiter_ausliefern", {}, function(data)
			{
				// an welcher Stelle soll ausgeliefert werden?
				$("#mitarbeiter_id").html(data);		
			});
			
			
		});
		
		// Seite für Sachbearbeiter aufrufen
		$("#img_sachbearbeiter").click(function()
		{ //alert("klick");
			var string = $(this).attr('name');		
			$.getJSON("Seite_ausliefern", {art: string}, function(data)
			{
				// an welcher Stelle soll ausgeliefert werden?
				$('body').html(data);		
			});
		});
			


	});