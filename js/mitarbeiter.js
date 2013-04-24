
	function mitarbeiter_aktion(taste){
		var id = $("#mitarbeiter_id").val();
		
			if (taste == 'work')
					{
						$.getJSON("deliver_project", {id: id}, function(data){
						    $('#optionen').html(data);
							$('#project_id').bind('change', function(){
									var status = $('#project_id').val();
									$.getJSON("status_aendern", {status : status, mitarbeiternummer: id}, function(data)
									{	
									alert("Neuer Status: " + status)
									location.reload()
							
									});
							});
						});
					
							
								
					}
					
				else if (taste == 'nowork')
					{
						$.getJSON("status_aendern", {status : "nowork", mitarbeiternummer: id}, function(data)
						{	alert(data)
							location.reload()
							
						});
					}
					
				else if (taste == 'w2p')
					{
						$.getJSON("status_aendern", {status : "pause", mitarbeiternummer: id}, function(data)
						{	alert(data)
							location.reload()

							
						});
					}
					
				else if (taste == 'w2d')
					{
						$.getJSON("status_aendern", {status : "journey", mitarbeiternummer: id}, function(data)
						{	alert(data)
							location.reload()
							
						});
					}
					
				else if (taste == 'p2w')
					{
						$.getJSON("deliver_project", {id: id}, function(data){
						    $('#optionen').html(data);
							$('#project_id').bind('change', function(){
									var status = $('#project_id').val();
									$.getJSON("status_aendern", {status : status, mitarbeiternummer: id}, function(data)
									{	
									alert("Neuer Status: " + status)
									location.reload()
							
									});
							});
						});
					}
					
				else if (taste == 'p2d')
					{
						$.getJSON("status_aendern", {status : "journey", mitarbeiternummer: id}, function(data)
						{	alert(data)
							location.reload()
							
						});
					}
					
					
				else if (taste == 'd2p')
					{
						$.getJSON("status_aendern", {status : "pause", mitarbeiternummer: id}, function(data)
						{	alert(data)
							location.reload()
							
						});
					}
					
					
				else if (taste == 'd2w')
					{
						$.getJSON("deliver_project", {id: id}, function(data){
						    $('#optionen').html(data);
							$('#project_id').bind('change', function(){
									var status = $('#project_id').val();
									$.getJSON("status_aendern", {status : status, mitarbeiternummer: id}, function(data)
									{	
									alert("Neuer Status: " + status)
									location.reload()
							
									});
							});
						});
					}
				else if (taste == 'reload'){
				location.reload()	
				}
					
	}
