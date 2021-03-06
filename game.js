function showScoreboard() {
	document.querySelector('#scoreboard').emit('show');
}
function hideScoreboard() {
	document.querySelector('#scoreboard').emit('hide');
}

function showEnemy(box) {
	$("#box"+box+" a-plane.enemy").attr("visible", "true");
	$("#box"+box+" a-plane.enemy").addClass("collidable");
}
function showFriendly(box) {
	$("#box"+box+" a-plane.friendly").attr("visible", "true");
	$("#box"+box+" a-plane.friendly").addClass("collidable");
}

function hideEnemy(box) {
	$("#box"+box+" a-plane.enemy").attr("visible", "false");
	$("#box"+box+" a-plane.enemy").removeClass("collidable");
}

function hideFriendly(box) {
	$("#box"+box+" a-plane.friendly").attr("visible", "false");
	$("#box"+box+" a-plane.friendly").removeClass("collidable");
}

score = {
	friendlies: 0,
	enemies: 0
}

function updateScoreboard(section, points) {
	if (section == "friendlies") {
		timeleft -= 10 * points;
	}
	else {
		score["enemies"] += points;
	}
	$("#scoreboard a-text").attr("value", "Points: "+score.enemies+"\nTime left: "+timeleft);
}

started = false;

function initiateForPhone() {	
	document.addEventListener('click', function(e){
		shootButtonPressed();
	}, false);
}


function shootButtonPressed() {
	if(!started) {
		//start game
		startGame(0);
		setTimeout(function() {
			// random_boolean_1in20 = Math.random() >= 0.95;
			// if (random_boolean_1in20) {
			// 	$('#box17').attr("color", "red")
			// 	$('#box17').addClass("friendly")
			// }
			// else {
			// 	$('#box17').attr("color", "green")
			// 	$('#box17').addClass("enemy")
			// }
		    document.querySelector('#box17').emit('fly');
		}, 5000);
		setTimeout(function() {
			// if (random_boolean_1in20) {
			// 	$('#box18').attr("color", "red")
			// 	$('#box18').addClass("friendly")
			// }
			// else {
			// 	$('#box18').attr("color", "green")
			// 	$('#box18').addClass("enemy")
			// }
		    document.querySelector('#box18').emit('fly');
		}, 12000);
		setTimeout(function() {
			// if (random_boolean_1in20) {
			// 	$('#box19').attr("color", "red")
			// 	$('#box19').addClass("friendly")
			// }
			// else {
			// 	$('#box19').attr("color", "green")
			// 	$('#box19').addClass("enemy")
			// }
		    document.querySelector('#box19').emit('fly');
		}, 20000);
		started=true;
	}
	else {
		//shoot's the laser from character's eyes
		shoot();
	}
}

var random_boolean;
var random_boolean_1in20;

timeleft = 62;

function startGame(iteration) {
	timeleft -= 1;
	if (iteration == 0) {
		hideScoreboard();
		updateScoreboard("enemies", 0);
	}
	if (timeleft == 0) {
		//game done
		//calculate score and display stats
		showScoreboard();
		updateScoreboard("enemies", 0);
	}
	else if (timeleft < 0) {
		//do nothing
	}
	else if (iteration%5 == 0) {
		updateScoreboard("enemies", 0);
	    //Display all the friendlies/enemies for this iteration
		random_boolean = Math.random() >= 0.5;

	    for(var i = 1; i <= 16; i++) {
	    	if (iteration/5 > 12){ //a minute in, make game harder 
	    		random_boolean = Math.random() >= 0.9; //chance there is a character at location
	    	} 
	    	else if (iteration/5 > 6){ //half a minute in, make game harder 
	    		random_boolean = Math.random() >= 0.8; //chance there is a character at location
	    	} 
	    	else {
	    		random_boolean = Math.random() >= 0.7; //chance there is a character at location
	    	}
	    	random_boolean_1in20 = Math.random() >= 0.95; //chance it's a friendly/enemy
	    	if (random_boolean) {
	    		if (random_boolean_1in20) {
	    			showFriendly(i);
	    			hideEnemy(i);
	    		}
	    		else {
	    			showEnemy(i);
	    			hideFriendly(i);
	    		}
	    	}
	    	else {
	    		hideFriendly(i);
	    		hideEnemy(i);
	    	}
	    }

	    //Set friendlies/enemies as raycastable
	    var raycasterEl = AFRAME.scenes[0].querySelector('[raycaster]');
	    raycasterEl.components.raycaster.refreshObjects();
	}
	else {
		updateScoreboard("enemies", 0);
	}
    setTimeout(function() {
        startGame(iteration+1);
    }, 1000);
}


AFRAME.registerComponent('crosshair', {
  init: function () {
    this.el.addEventListener('animationend', function (e) {
    	if (e.target.id == 'finalcrosshairanimation') {
    		$(this).attr("visible", "false");
    		if ($(this).attr('id') == "crosshair1") {
    			raycasterShoot();
    		}
    	}
    });
  }
});

function shoot() {
	//show hud popup
	document.querySelector('#crosshair1').emit('show');
	document.querySelector('#crosshair2').emit('show');
	document.querySelector('#crosshair3').emit('show');
	document.querySelector('#crosshair4').emit('show');
	document.querySelector('#crosshair5').emit('show');
	document.querySelector('#player').emit('playLaserSound');
	//when hud popup in position a event is received by crosshair components
	//This event checks the raycast and hides the crosshair
}

function raycasterShoot(){
	var raycasterEl = AFRAME.scenes[0].querySelector('[raycaster]');
	firstintersection = raycasterEl.components.raycaster.intersectedEls[0];
	if (!$(firstintersection).is(".impenetrable")) {
		//Hit a friendly/enemy
		$(firstintersection).attr("visible", "false");
		$(firstintersection).removeClass("collidable");
		if ($(firstintersection).hasClass("drone")){
			$(firstintersection).emit('hide');
		}

		if($(firstintersection).hasClass("friendly")){
			updateScoreboard("friendlies", 1);
		}
		else if ($(firstintersection).hasClass("enemy")){
			updateScoreboard("enemies", 1);
		}
	}
	else {
		//Hit a box
	}
}



var socket = io('http://10.170.44.74:3000', {transports: ['websocket']}); //IP

gameHasstarted = false;
function initComputerController() {
	$(window).keypress(function(e) {
		if (e.keyCode == 32) {
			if (!gameHasstarted) {
				var audio = new Audio('background-music.mp3');
				audio.play();
				gameHasstarted = true;
			}
			socket.emit('computerShoot');
			var audio = new Audio('laser.mp3');
			audio.play();

		}
	});
	
}

function initPhoneVRviewer() {
	socket.on('fromComputerShotMade', function(msg){
		console.log("A shot was made.");
		shootButtonPressed();
	});
}