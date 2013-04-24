// app.js

//-----------------------------------------------
// Startpunkt: nach dem Laden / Auswerten des Dokuments
//-----------------------------------------------
$(document).ready(function () {

$(this).each(function() {
    $(this).attr('unselectable','on')
    .bind('selectstart',function(){ return false; });
});

$('#secret').hide();
$('#mitarbeiter').hide();
$('#sachbearbeiter').hide();
$('#optionen').hide();
$('#Tastenfeld').hide();

$("input[name='sb_aktion']").change(radioValueChanged);

});
/* EOF */