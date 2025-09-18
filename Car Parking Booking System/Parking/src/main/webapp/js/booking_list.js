$(document).ready(function(){
	var loggedinUserId = sessionStorage.getItem("userEmail");
	
	if(loggedinUserId != undefined){
		getBookingList(loggedinUserId);
	}else{
		alert("invalid user, please login");
		window.location.href = "../html/Login.html";
	}
	
});

function getBookingList(loggedinUserId){
	$.ajax({
			  url: "http://localhost:8080/Parking/BookingList",
			  type: "get",
			  data: { 
			    email : loggedinUserId
			  },
			  success: function(response) {
				  console.log(response);
				  var res = [];
				if(response != "NO_RECORD_FOUND"){
					 res = JSON.parse(response);
				}
				loadBookingTable(res);
			    
			  },
			  error: function(xhr) {
			    console.log(xhr);
			  }
	});
}

function loadBookingTable(bookingData){
	if(bookingData.length > 0){
		var row = "";
		for(var i=0 ; i < bookingData.length ; i++){
			if(bookingData[i].status == 'Active'){
				row += "<tr> <td>"+ bookingData[i].firstName+"</td> 	<td>"+ bookingData[i].lastName+"</td> <td>"+ bookingData[i].email+"</td> <td>"+ bookingData[i].phoneNumber+"</td> <td>Parking 1</td> <td>"+ bookingData[i].slotNumber+"</td> <td>"+ bookingData[i].frombookingDate+"</td> <td>"+ bookingData[i].toBookingdate+"</td> <td>"+ bookingData[i].fromTime+"</td> <td>"+ bookingData[i].toTime+"</td> <td><a onclick='cancelBooking("+bookingData[i].slotNumber+")' href='javascript:void(0)' > Cancel</a></td> </tr>";

			}else{
				row += "<tr> <td>"+ bookingData[i].firstName+"</td> 	<td>"+ bookingData[i].lastName+"</td> <td>"+ bookingData[i].email+"</td> <td>"+ bookingData[i].phoneNumber+"</td> <td>Parking 1</td> <td>"+ bookingData[i].slotNumber+"</td> <td>"+ bookingData[i].frombookingDate+"</td> <td>"+ bookingData[i].toBookingdate+"</td> <td>"+ bookingData[i].fromTime+"</td> <td>"+ bookingData[i].toTime+"</td> <td> Canceled</td> </tr>";

			}
			$("#table-body").html(row);
		}
	}else{
		$("#table-body").html("");
	}
}

function cancelBooking(slotId){
	$.ajax({
			  url: "http://localhost:8080/Parking/DeleteBooking",
			  type: "get",
			  data: { 
			    slotNumber : slotId
			  },
			  success: function(response) {	
				 getBookingList(sessionStorage.getItem("userEmail"));			    
			  },
			  error: function(xhr) {
			    console.log(xhr);
			  }
	});
	
	
}