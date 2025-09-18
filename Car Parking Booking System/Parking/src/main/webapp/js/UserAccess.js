$(document).ready(function(){
	var loggedinUserId = sessionStorage.getItem("userEmail");
	
	if(loggedinUserId != undefined){
		getBookingList(loggedinUserId);
	}else{
		alert("invalid user, please login");
		window.location.href = "../html/Login.html";
	}
});
