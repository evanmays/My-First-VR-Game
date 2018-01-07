gameMode = "";
currDevice = "";

function playOneDevice(){
	gameMode="onePhone";
	//add aframe to browser
	$("body").innerHTML="";
	$("body").load("/game.html",function(){
		$("a-entity#player").attr("camera", "userHeight: 1.6");
	    console.log("Game loaded in");
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
		$(function() {
			$("body").innerHTML="";
			$("body").load("/game.html",function(){
				$("a-entity#player").attr("camera", "userHeight: 0");
			    console.log("Game loaded in");
			});
		});
		initPhoneVRviewer();
	}
	else if (currDevice == "computer") {
		alert("computer")
		//show message telling user to connect phone
		//once connected, show message telling user to press spacebar to shoot
		initComputerController();
	}
}