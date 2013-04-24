// JavaScript Document

//click - Funktionen ***ANFANG***

//click - Funktionen ***ENDE***




//Funkionstemplates ***ANFANG***
 function radioValueChanged()
{
	radioValue = $(this).val();

	alert(radioValue);
	
	if (radioValue == "anlegen")
	{
		$("#menu_sachbearbeiter").load('HTML/anlegen.html');
	}
	else if (radioValue == "bearbeiten")
	{
		$("#menu_sachbearbeiter").load('HTML/bearbeiten.html');
	}
	else if (radioValue == "loeschen")
	{
		$("#menu_sachbearbeiter").load('HTML/loeschen.html');
	}
};

function SaveNewWorker()
{
	alert("Angeblich gespeichert!");
};

function DeleteWorker()
{
	alert("Ich tue so, als haette ich etwas geloescht!");
};

function SelectWorker()
{
	alert("Mitarbeiter zum Editieren gewaehlt!");
};
//Funkionstemplates ***ENDE***