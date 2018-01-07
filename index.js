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

started = false;
$(window).keypress(function(e) {
	if(!started) {
		//start game
		startGame(0);
		started=true;
	}
	else {
		//shoot's the laser from character's eyes
		shoot();
	}
});

var random_boolean;
var random_boolean_1in20;

function startGame(iteration) {
	if (iteration == 0) {
		hideScoreboard();
	}
    //Display all the friendlies/enemies for this iteration

    random_boolean = Math.random() >= 0.5;

    for(var i = 0; i < 16; i++) {
    	random_boolean = Math.random() >= 0.7;
    	random_boolean_1in20 = Math.random() >= 0.95;
    	if (random_boolean) {
    		if (random_boolean_1in20) {
    			showFriendly(i);
    		}
    		else {
    			showEnemy(i);
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

    setTimeout(function() {
        startGame(iteration+1);
    }, 5000);
}

rayCollidingWith = null;


AFRAME.registerComponent('raycaster-listener', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', function (e) {
      //console.log(e.detail.target == this) //true
      rayCollidingWith = this;
    });
    this.el.addEventListener('raycaster-intersected-cleared', function (e) {
      //console.log(e.detail.target == this) //true
      rayCollidingWith = null;
    });
  }
});

AFRAME.registerComponent('crosshair', {
  init: function () {
    this.el.addEventListener('animationend', function (e) {
    	if (e.target == $('#finalcrosshairanimation')[0]) {
    		$(this).attr("visible", "false");
    		raycasterShoot();
    	}
    });
  }
});

function shoot() {
	//show hud popup
	document.querySelector('#crosshair').emit('show');
	//when hud popup in position a event is received by crosshair components
	//This event checks the raycast and hides the crosshair
}
function raycasterShoot(){
	if (rayCollidingWith != null) {
		//deletes the enemy/friend
		$(rayCollidingWith).attr("visible", "false");
		$(rayCollidingWith).removeClass("collidable");
	}
}