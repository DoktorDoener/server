// JavaScript Document
function val1(taste) {
//Passwort-Speicher
var text = $('#secret').html();
//Sterne initialisieren
var stern = document.getElementById("passwd").innerHTML;
//laenge initialisieren
var laenge = document.getElementById("passwd").innerHTML.length;

if(taste=="delete"){
	if(text==""){
	    alert("Feld leer");
	    document.getElementById("typ_0").checked = false;
        document.getElementById("typ_1").checked = false;
	}
			else{

	stern = stern.substring(0, stern.length -1);	
	text = text.substring(0, text.length -1);	
	$('#secret').html(text);
	document.getElementById("passwd").innerHTML = stern;
	laenge = laenge-1;
				}
		
					}

else if( taste%1==0 && laenge+1>4){
	alert("Nummer zu lang");	
}

else if(taste=='eingabe')
{
	
	
    if (text == "")
    {
	    alert("Feld leer")
	}
		
	else
	{

		id = $("#mitarbeiter_id").val();
		pw = $('#secret').html();
				
		$.getJSON("status_ausliefern", {mitarbeiternummer: id, passwort: pw}, function(data)
			{
				$('#Tastenfeld').fadeOut(2000);
				$('#mitarbeiter_id').fadeOut(2000);
				$('#optionen').html(data);
				$('#optionen').delay(2000).fadeIn(3000);		
			});
			
		// passwort löschen
		$('#secret').html("");
		$('#TArea').html("");	
	}
	

}

else {
	document.getElementById("passwd").innerHTML = stern + '*';
	$('#secret').html(text + taste);
	
	
}

};