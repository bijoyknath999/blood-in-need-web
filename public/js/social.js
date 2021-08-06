$('#facebookLogin').click(function(event){

	

	firebase
	  .auth()
	  .signInWithPopup(facebookProvider)
	  .then((result) => {
	    /** @type {firebase.auth.OAuthCredential} */
	    var credential = result.credential;

	    // The signed-in user info.
	    var user = result.user;

	    console.log(user);
	    console.log(credential);

	    $.ajaxSetup({
	        headers : {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        }
	    });

	    $.ajax({
	    	url : "/facebook/login",
	    	type : "post",
	    	dataType : "json",
	    	data : user.providerData[0],
	    	success : function(data){

	    		if(data.status == "success"){
                    window.location.replace(URL + "/dashboard");
	    		}else{
	    			alert("Something went wrong here");
	    		}

	    	},
	    	error : function (error){
	    		alert("Error occured");
	    	}
	    })

	    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	    var accessToken = credential.accessToken;

	    // ...
	  })
	  .catch((error) => {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // The email of the user's account used.
	    var email = error.email;
	    // The firebase.auth.AuthCredential type that was used.
	    var credential = error.credential;
	    console.log(error)

	    // ...
	  });

})




//Google SignIn

$('#googleLogin').click(function(){

	firebase.auth()
	.signInWithPopup(googleProvider)
	.then((result) => {
	  /** @type {firebase.auth.OAuthCredential} */
	  var credential = result.credential;
  
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user)
  
	  $.ajaxSetup({
		  headers : {
			  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		  }
	  });
  
	  $.ajax({
		url : "/social/login",
		type : "post",
		dataType : "json",
		data : user.providerData[0],
		success : function(data){
  
		  if(data.status == "success"){
			alert("Sucessfully logged");
			// window.location.href = URL + "/dashboard"
			window.location.replace("/dashboard");
		  }else{
			alert("Something went wrong here");
		  }
  
		},
		error : function (error){
		  alert("Error occured");
		}
	  })
	  // ...
	}).catch((error) => {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  console.log(error)
	  // ...
	});
  
  })



  //phone login

//recaptcha 

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
  },
  'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
  }
});

$(".sendOTP").click(function(){

	const phoneNumber = $("[name=phone_number]").val();

	if(isNaN(phoneNumber)){
		alert("Please enter valid phone number");
		return
	}

	const appVerifier = window.recaptchaVerifier;
	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
	    .then((confirmationResult) => {
	      // SMS sent. Prompt user to type the code from the message, then sign the
	      // user in with confirmationResult.confirm(code).
	      window.confirmationResult = confirmationResult;
	      $(".phone-div").attr('style', 'display: none !important');
	      $("#recaptcha-container").attr('style', 'display: none !important');
	      // now show otp field

	      $(".otp-div").attr('style', 'display: block !important');
	      // ...
	    }).catch((error) => {
	      // Error; SMS not sent
	      alert(error.message);
	      // ...
	    });


})

// now verify otp
$("#verifyOTP").click(function(){

	const code = $("[name=verify_otp]").val();
	confirmationResult.confirm(code).then((result) => {
	  // User signed in successfully.
	  const user = result.user;
	  alert("Verified successfully");
	  // ...
	}).catch((error) => {
	  // User couldn't sign in (bad verification code?)
	  // ...
	  console.log(error.message)
	});


})
