 $(document).ready(function(){
	 
	$("#form-error-div").hide();
	$("#Success-div").hide();
	  validation();
	  getSlotInfo(); 
	$("#book_slot_button").click(function(){
		var FirstName = $("#FName").val();
		var LastName = $("#LName").val();
		var Email = $("#Email").val();
		var Number = $("#number").val();
        var SlotNumber = $("#slot-dropdown").val();
        var fromBookingDate = $("#fromBookingDate").val();
        var fromTime = $("#fromTime").val();
        var toBookingDate = $("#toBookingDate").val();
        var toTime = $("#toTime").val();
        
		
		var isFormValid = $("#booking-form").valid();
		
		if(isFormValid){ 
			 // if form is valid then call service to save user info in DB
			$("#form-error-div").hide();
			bookSlot(FirstName,LastName,Email,Number,SlotNumber,fromBookingDate,fromTime,toBookingDate,toTime);
		}else{
			$("#form-error-div").show();
		}
		
	 });	
	 
	  var loggedinUserId = sessionStorage.getItem("userEmail");
            if(loggedinUserId != undefined){
		     //  getBookingList(loggedinUserId);
	        }else{
		       alert("invalid user, please login");
		       window.location.href = "../html/Login.html";
	        }
  
		    $("#fromBookingDate").datepicker({
        	     minDate : new Date(),
        	     changeMonth : true,
        	     changeYear : true,
        	     dateFormat : "dd-mm-yy"
             });
             
                $("#toBookingDate").datepicker({
        	     minDate : new Date(),
        	     changeMonth : true,
        	     changeYear : true,
        	     dateFormat : "dd-mm-yy"
             });
      });

 
	
  function validation(){
  

   jQuery.validator.addMethod('NumberOnly', function(value) {
    return /^[0-9]+$/.test(value);
    });


   $.validator.addMethod("noSpace", function(value){
         return value == '' || value.trim().length != 0
   }, "Spaces are not allowed");
   
 
   var $BookingForm = $("#booking-form");
     if($BookingForm.length){
        $BookingForm.validate({
            rules : {
               Email : {
                  email : true
              },
              SlotId : {
				  required : true
			  },
              number : {
               noSpace : true,               
               NumberOnly : true,
               minlength: 10,
               maxlength : 12
              }
            },
            messages : {
              Email : {
               email : "Please Enter valid Email Address !"
              },
               SlotId : {
				  required : "Please Select the Slot !!!"
			  },
              number : {              
               NumberOnly : 'Letters are not allowed',
               noSpace : "Space is not allowed",
               minlength: 'min 10 digit',
               maxlength : 'max 12 digit'
              }
            },         
           
       });
   }
  } 
  
       function getSlotInfo(){
	   $.ajax({
			  url: "http://localhost:8080/Parking/Slot",
			  type: "get",
			  data: { 
			    
			  },
			  success: function(response) {
				  console.log(response);
				loadSlotDropdown(JSON.parse(response));
			    
			  },
			  error: function(xhr) {
			    console.log(xhr);
			  }
	});
   }
   
   
    function loadSlotDropdown(data){
		var optionStr = "";
		for(var i=0;i< data.length;i++){
			optionStr += "<option value= '"+data[i].slot+"'>"+ data[i].slot +"</option> ";
		}
		
		$("#slot-dropdown").html(optionStr);
	}

    function bookSlot(FirstName,LastName,Email,Number,SlotNumber,fromBookingDate,fromTime,toBookingDate,toTime){
		$('#loader').show();
		$.ajax({
			
				  url: "http://localhost:8080/Parking/Booking",
				  type: "get",
				  data: { 
				      FName : FirstName,
				      LName : LastName,
 				      Email : Email,
				      number : Number,
				      SlotId : SlotNumber,
				      fromBookingDate : fromBookingDate,
				      toBookingDate : toBookingDate,
				      fromTime : fromTime,
				      toTime : toTime
				       
				  },
				  success: function(response) {
					  $('#loader').hide();
					  console.log(response);	
					  if(response == 'book slot successfully'){
						  $("#form-error-div").hide();
						  $("#Success-div").show();
						 clearForm();
						 getSlotInfo();
					  }else if ( response == 'Failed'){
						  $("#form-error-div").show();
					  } else{
						  alert("Some error occured");
					  }
					     
				  },
				  error: function(xhr) {
					  $('#loader').hide();
				    console.log(xhr);
				  }
		});
} 

function clearForm(){
        $("#FName").val('');
		$("#LName").val('');
		$("#Email").val('');
		$("#number").val('');
        $("#fromBookingDate").val('');
        $("#fromTime").val('');
        $("#toBookingDate").val('');
        $("#toTime").val('');
};
 






