gameMode = "";
currDevice = "";

function playOneDevice(){
	gameMode="onePhone";
	//add aframe to browser
	$(function() {
		$("body").innerHTML="";
		$("body").load("/game.html",function(){
		    console.log("Game loaded in");
		});
	});

	//initialize game
	initiateForPhone();
}

function playMultipleDevice(thisDevice){
	gameMode="multipleDevices";
	currDevice = thisDevice;
	
	if (currDevice == "phone") {
		//show message telling user to connect computer
		//once connected, add aframe to phone's browser
		alert("phone")
		initPhoneVRviewer();
		$(function() {
			$("body").innerHTML="";
			$("body").load("/game.html",function(){
			    console.log("Game loaded in");
			});
		});
	}
	else if (currDevice == "computer") {
		alert("computer")
		//show message telling user to connect phone
		//once connected, show message telling user to press spacebar to shoot
		initComputerController();
	}
}