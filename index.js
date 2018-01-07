function showScoreboard() {
	document.querySelector('#scoreboard').emit('show');
}
function hideScoreboard() {
	document.querySelector('#scoreboard').emit('hide');
}

function showEnemy(box) {
	$("#box"+box+" a-plane.enemy").attr("visible", "true");
}
function showFriendly(box) {
	$("#box"+box+" a-plane.friendly").attr("visible", "true");
}

function hideEnemy(box) {
	$("#box"+box+" a-plane.enemy").attr("visible", "false");
}

function hideFriendly(box) {
	$("#box"+box+" a-plane.friendly").attr("visible", "false");
}

life = false;
$(window).keypress(function(e) {
    if (e.which === 32) {
    	if (life == false) {
    		hideScoreboard();
    		life = true;
    		showEnemy(3);
    	}
        else {
        	showScoreboard();
        	life = false;
        	hideEnemy(3);
        }

    }
});