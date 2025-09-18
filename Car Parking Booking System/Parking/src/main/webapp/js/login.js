$(document).ready(function(){
	 $("#invalid-user-div").hide();
	$("#login-button").click(function(){
		var userId = $("#userId").val();
		var password = $("#password").val();
		loginUser(userId, password);
	});	
});

function loginUser(userId, password){
	$.ajax({
			  url: "http://localhost:8080/Parking/LoginServlet",
			  type: "get",
			  data: { 
			    email : userId,
			    password : password
			  },
			  success: function(response) {
				  console.log(response);	
				  if(response == 'FOUND'){
					  $("#invalid-user-div").hide();
					  sessionStorage.setItem("userEmail", userId);
					  window.location.href = "../html/UserAccess.html";
				  }else{
					  $("#invalid-user-div").show();
				  }    
			  },
			  error: function(xhr) {
			    console.log(xhr);
			  }
	});
}
