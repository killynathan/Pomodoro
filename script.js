var timeDisplay = document.getElementById("time");
var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("reset");
var resumeButton = document.getElementById("resume");
var typeDisplay = document.getElementById("type");
var filler = document.getElementById("filler");

var seconds = 1500; // how many seconds there is remaining
var isPaused = false;
var setIntervalID;
var started = false; // so user can't have multiple startCountdown()'s starting setIntervals and running down the time faster
var inBreak = false;

var ding = new Audio('ding.mp3');
var dingDuration = 0;

function secondsToTime(_seconds) {
	var mins = Math.floor(_seconds / 60);
	var seconds = _seconds % 60;
	if (seconds == 0) seconds = "00";
	else if (seconds < 10) seconds = "0" + seconds;
	return mins + ":" + seconds;
}

function startCountdown() {
	if (!started) {
		started = true;
		inBreak = false;
		setIntervalID = setInterval(decrementTime, 1000);
		filler.className = "startAnimation";
		filler.style.animationDuration = seconds + "s";
	}
}

function pauseCountdown() {
	isPaused = true;
	filler.style.animationPlayState = "paused";
}

function unpauseCountdown() {
	isPaused = false;
	filler.style.animationPlayState = "running";
}

function resetCountdown() {
	clearInterval(setIntervalID);
	seconds = 1500;
	timeDisplay.innerHTML = secondsToTime(seconds);
	filler.className = "";
	started = false;
	isPaused = false;
	filler.style.animationPlayState = "running";
	dingDuration = 0;
	typeDisplay.innerHTML = "Session";
}

function startBreak() {
	inBreak = true;
	seconds = 300;
	dingDuration = 0;
	timeDisplay.innerHTML = secondsToTime(seconds);
	typeDisplay.innerHTML = "Break";

	filler.className = "startAnimation";
	filler.style.animationDuration = seconds + "s";
}

function decrementTime() {
	if (!isPaused) {
		if (seconds == 0) {
			filler.className = "";
			if (inBreak) {
				inBreak = false;
				ding.play();
				resetCountdown();
			}

			if (dingDuration < 5) {
				if (dingDuration % 2 == 0) {ding.currentTime = 0; ding.play();} 
				dingDuration++;
				return; 
			} 
			else startBreak();
		}
		seconds--;
		timeDisplay.innerHTML = secondsToTime(seconds);
	}
}

startButton.onclick = startCountdown;
pauseButton.onclick = pauseCountdown;
resumeButton.onclick = unpauseCountdown;
resetButton.onclick = resetCountdown;