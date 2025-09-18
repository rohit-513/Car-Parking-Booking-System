$(document).ready(function(){
	deleteBooking();
	
});

function deleteBooking(){
	$.ajax({
			  url: "http://localhost:8080/Parking/BookingList",
			  type: "get",
			  data: { 
			    SlotId : "Slot_Number"
			  },
			  success: function(responce) {
				  
				 getBookingList(responce);
			    
			  },
			  error: function(xhr) {
			    console.log(xhr);
			  }
	});
}

function loadBookingTable(bookingData){
	var row = "";
	for(var i=0 ; i < bookingData.length ; i++){
		row += "<tr> <td>"+ bookingData[i].firstName+"</td> 	<td>"+ bookingData[i].lastName+"</td> <td>"+ bookingData[i].email+"</td> <td>"+ bookingData[i].phoneNumber+"</td> <td>Parking 1</td> <td>"+ bookingData[i].slotNumber+"</td> <td>"+ bookingData[i].frombookingDate+"</td> <td>"+ bookingData[i].toBookingdate+"</td> <td>"+ bookingData[i].fromTime+"</td> <td>"+ bookingData[i].toTime+"</td> <td><a onclick='cancelBooking("+bookingData[i].slotNumber+")' href='javascript:void(0)' > Cancel</a></td> </tr>";
		$("#table-body").append(row);
	}
}

function cancelBooking(slotId){
	alert(slotId);
	
	
}