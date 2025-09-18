$('document').ready(function(){
	$('#loader').hide();
	$('#submit-button').click(function(){
		$('#loader').show();
		
		var fName = $('#first-name').val();
		var lName = $('#last-name').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var conPassword = $('#confirm-password').val();
		var gender = $('#gender').val();
		
		var reqJson = { 
				"firstName" : fName ,
				"lastName" : lName,
				"email" : email ,
				"password" : password,
				"gender": gender
				};
		
		var url = "http://localhost:8080/Parking/html/Register.html";
		
		$.ajax({
				url: url,
				type: "POST",	
				dataType: 'json',
            	contentType: 'application/json',
            	data: JSON.stringify(reqJson),			
				success: function(response){
					$('#loader').hide();
					console.log('response: ',response);
				}
				});
	});
	
});