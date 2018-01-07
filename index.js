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
	initiateForPhoneOnlyOrMultipleDevices();
}

function playMultipleDevice(thisDevice){
	gameMode="multpleDevices";
	currDevice = thisDevice;
	
	if (currDevice == "phone") {
		$(function() {
			$("body").load("/game.html",function(){
			    $(this).clone().appendTo("body").remove();
			});
		});
	}
	else if (currDevice == "computer") {
		//show message telling user to press spacebar to shoot
	}
	//initialize game
	initiateForPhoneOnlyOrMultipleDevices();
}