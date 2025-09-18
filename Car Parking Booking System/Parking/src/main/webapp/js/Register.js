 $(document).ready(function(){
	$("#alreadyRegistered-div").hide();
	$("#Success-div").hide();
	  validation();
	$("#register-button").click(function(){
		var Uname = $("#Uname").val();
		var Email = $("#email").val();
		var Number = $("#number").val();
		var Password = $("#pass").val();
		var ConfirmPassword = $("#Cpass").val();
		var selectGender = $('input[name=RadioButton]:checked', '#gender').val();
		
		var isFormValid = $("#registration").valid();
		
		if(isFormValid){  // if form is valid then call service to save user info in DB
			$("#form-error-div").hide();
			registerNewUser(Uname,Email,Number,Password,ConfirmPassword,selectGender);
		}else{
			$("#form-error-div").show();
		}
	});	
});

 
	
  function validation(){
   $("#eye").click(function(){
         $(this).toggleClass( 'fa-eye-slash');
          var dis = $("#pass").attr("type");
          if(dis == "password"){
            $("#pass").attr("type","text");
          }
          else{
            $("#pass").attr("type","password");
          }
   });

   $("#Ceye").click(function(){
         $(this).toggleClass('fa-eye-slash');
         var disp = $("#Cpass").attr("type");
         if(disp == "password"){
           $("#Cpass").attr("type","text");
         }
         else{
           $("#Cpass").attr("type","password");
         }
   });
   

   jQuery.validator.addMethod('NumberOnly', function(value) {
    return /^[0-9]+$/.test(value);
    });

   jQuery.validator.addMethod('LettersOnly' , function(value){
    return /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(value);
    });

   $.validator.addMethod("noSpace", function(value){
         return value == '' || value.trim().length != 0
   }, "Spaces are not allowed");
   
 
   var $registerForm = $("#registration");
     if($registerForm.length){
        $registerForm.validate({
            rules : {
               Uname : {
                   required : true,
                   noSpace : true
               },
               email : {
                  required : true,
                  email : true
              },
              number : {
               required : true,
               noSpace : true,               
               NumberOnly : true,
               minlength: 10,
               maxlength : 12
              },
              pass : {
               required : true,
               noSpace : true
              },
              Cpass : {
               required : true,
               equalTo : "#pass",
               noSpace : true
              },
              RadioButton : {
               required : true
              }
            },
            messages : {
               Uname : {
                  required : "Please Enter the User Name !",
                   noSpace : "Space is not allowed"
              },
              email : {
               required : "Please Enter the Email Address !",
               email : "Please Enter valid Email Address !"
              },
              number : {
               required : "Please Enter the Number !",              
               NumberOnly : 'Letters are not allowed',
               noSpace : "Space is not allowed",
               minlength: 'min 10 digit',
               maxlength : 'max 12 digit'
              },
              pass : {
               required : "Please Enter the Password !",
               noSpace : "Space is not allowed"
              },
              Cpass : {
               required : "Please Enter the Confirm Password !",
               equalTo : "Please Enter the Same Password !",
               noSpace : "Space is not allowed"
              },
              RadioButton : {
               required : "Please Select The  Gender !"
              }
            },
           errorPlacement : function(error, element){
              if(element.is(":radio")){
                 error.appendTo(element.parents("#gender"));
              }
              else{
               error.insertAfter(element);
              }
           }
           
       });
   }
  } 

    function registerNewUser(Uname,Email,Number,Password,ConfirmPassword,selectGender){
		$('#loader').show();
		$.ajax({
				  url: "http://localhost:8080/Parking/Register",
				  type: "get",
				  data: { 
				      Uname : Uname,
 				      email : Email,
				      number : Number,
				      pass : Password,
				      Cpass : ConfirmPassword,
				      RadioButton : selectGender
				       
				  },
				  success: function(response) {
					  $('#loader').hide();
					  console.log(response);	
					  if(response == 'Successful'){
						  $("#form-error-div").hide();
						  $("#alreadyRegistered-div").hide();
						  $("#Success-div").show();
					  }else if ( response == 'Registerd'){
						  $("#alreadyRegistered-div").show();
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


 






