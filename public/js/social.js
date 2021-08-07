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

		
		var userdetails = {
			email : user.email,
			phone : user.phoneNumber,
			uid : user.uid,
		}
  
		console.log(userdetails);

	    $.ajax({
	    	url : "/social/facebook",
	    	type : "post",
	    	dataType : "json",
	    	data : userdetails,
	    	success : function(data){

	    		if(data.status == "success"){
                    window.location.replace("/dashboard");
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

		if (error.code === 'auth/account-exists-with-different-credential') {
			// Step 2.
			// User's email already exists.
			// The pending Facebook credential.
			var pendingCred = error.credential;
			// The provider account's email address.
			var email = error.email;
			firebase.auth().fetchSignInMethodsForEmail(email).then(function(methods) {
				// Step 3.
				// If the user has several sign-in methods,
				// the first method in the list will be the "recommended" method to use.
				console.log(methods[0]);

				$.ajaxSetup({
					headers : {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					}
				});
		
				var providers = "";
				if(methods[0]=="google.com")
					{
						providers = "google";
					}
				else if(methods[0]=="password")
				{
					providers = "password";
				}
				
				var userdetails = {
					status : "already",
					provider: providers,
				}
		  
				console.log(userdetails);
		
				$.ajax({
					url : "/social/facebook",
					type : "post",
					dataType : "json",
					data : userdetails,
					success : function(data){		
						console.log(data.message);
					},
					error : function (error){
						alert("Error occured");
					}
				})
			});
		}

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
	  console.log(result);
  
	  $.ajaxSetup({
		  headers : {
			  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		  }
	  });

	  var userdetails = {
		  email : user.email,
		  phone : user.phoneNumber,
		  uid : user.uid,
	  }

	  console.log(userdetails);
  
	  $.ajax({
		url : "/social/google",
		type : "post",
		dataType : "json",
		data : userdetails,
		success : function(data){
  
		  if(data.status == "success"){
			alert("Sucessfully logged");
			// window.location.href = URL + "/dashboard"
			//window.location.replace("/dashboard");
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

// //recaptcha 

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//   'size': 'normal',
//   'callback': (response) => {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     // ...
//   },
//   'expired-callback': () => {
//     // Response expired. Ask user to solve reCAPTCHA again.
//     // ...
//   }
// });

// $(".sendOTP").click(function(){

// 	const phoneNumber = $("[name=phone_number]").val();

// 	if(isNaN(phoneNumber)){
// 		alert("Please enter valid phone number");
// 		return
// 	}

// 	const appVerifier = window.recaptchaVerifier;
// 	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
// 	    .then((confirmationResult) => {
// 	      // SMS sent. Prompt user to type the code from the message, then sign the
// 	      // user in with confirmationResult.confirm(code).
// 	      window.confirmationResult = confirmationResult;
// 	      $(".phone-div").attr('style', 'display: none !important');
// 	      $("#recaptcha-container").attr('style', 'display: none !important');
// 	      // now show otp field

// 	      $(".otp-div").attr('style', 'display: block !important');
// 	      // ...
// 	    }).catch((error) => {
// 	      // Error; SMS not sent
// 	      alert(error.message);
// 	      // ...
// 	    });


// })

// // now verify otp
// $("#verifyOTP").click(function(){

// 	const code = $("[name=verify_otp]").val();
// 	confirmationResult.confirm(code).then((result) => {
// 	  // User signed in successfully.
// 	  const user = result.user;
// 	  alert("Verified successfully");
// 	  // ...
// 	}).catch((error) => {
// 	  // User couldn't sign in (bad verification code?)
// 	  // ...
// 	  console.log(error.message)
// 	});


// })


$('#signupbtn').click(function(){

	const email = $("#emailsignup").val();
	const password = $("#passwordsignup").val();
	const confirmpassword = $("#passwordconfirmation").val();

	console.log(email+":"+password+":"+confirmpassword);


	if(password==confirmpassword)
	{
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in 
			var user = userCredential.user;
			console.log(user);
			sendVerificationEmail();

			$.ajaxSetup({
				headers : {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});
	  
			var userdetails = {
				email : user.email,
				verified : user.emailVerified,
				uid : user.uid,
			}
	  
			console.log(userdetails);
		
			$.ajax({
			  url : "/signup/send",
			  type : "post",
			  dataType : "json",
			  data : userdetails,
			  success : function(data){
		
				if(data.status == "success"){
				  alert("Sucessfully logged");
				  // window.location.href = URL + "/dashboard"
				  //window.location.replace("/dashboard");
				}else{
				  alert("Something went wrong here");
				}
		
			  },
			  error : function (error){
				alert("Error occured");
			  }
			})
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorMessage);
			// ..
		});


		//Function called right after the signUpWithEmailAndPassword to send verification emails
		const sendVerificationEmail = () => {
			//Built in firebase function responsible for sending the verification email
			firebase.auth().currentUser.sendEmailVerification()
			.then(() => {
				console.log('Verification Email Sent Successfully !');
			})
			.catch(error => {
				console.error(error);
			});
		}
	}
	else
	{
		console.log("Password incorrect!!")
	}
});


$('#signbtn').click(function(){

	const email = $("#emailsignin").val();
	const password = $("#passwordsignin").val();

	console.log(email);

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((userCredential) => {
		// Signed in
		var user = userCredential.user;
		console.log(user);

		var verified = user.emailVerified;

		console.log(verified);
		// ...
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
	});
});



