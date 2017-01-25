//

var timeDisplay = document.getElementById("time");
var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("reset");
var resumeButton = document.getElementById("resume");
var typeDisplay = document.getElementById("type");
var filler = document.getElementById("filler");
var sessionLengthDisplay = document.getElementById("sessionLength");
var breakLengthDisplay = document.getElementById("breakLength");
var sessionLengthMinusButton = document.getElementById("sessionLength-");
var sessionLengthPlusButton = document.getElementById("sessionLength+");
var breakLengthMinusButton = document.getElementById("breakLength-");
var breakLengthPlusButton = document.getElementById("breakLength+");

var seconds = 60;//1500; // how many seconds there is remaining
var breakLength = 300;
var maxSeconds = 1500;

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

function secondsToMins(_seconds) {
	return _seconds / 60;
}

function incSessionLength() {
	maxSeconds += 60;
	sessionLengthDisplay.innerHTML = secondsToMins(maxSeconds);
	if (!started) timeDisplay.innerHTML = secondsToTime(maxSeconds);
}

function decSessionLength() {
	if (maxSeconds >= 120) {
		maxSeconds -= 60;
		sessionLengthDisplay.innerHTML = secondsToMins(maxSeconds);
		if (!started) timeDisplay.innerHTML = secondsToTime(maxSeconds);
	}
}

function incBreakLength() {
	breakLength += 60;
	breakLengthDisplay.innerHTML = secondsToMins(breakLength);
}

function decBreakLength() {
	if (breakLength >= 120) {
		breakLength -= 60;
		breakLengthDisplay.innerHTML = secondsToMins(breakLength);
	}
}

function startCountdown() {
	if (!started) {
		started = true;
		inBreak = false;

		// for when users pause then press start form initial staet
		isPaused = false;
		filler.style.animationPlayState = "running";

		seconds = maxSeconds;
		setIntervalID = setInterval(decrementTime, 1000);
		filler.className = "startAnimation";
		filler.style.animationDuration = seconds + "s";
	}
	else {
		unpauseCountdown();
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
	started = false;
	isPaused = false;

	clearInterval(setIntervalID);
	seconds = maxSeconds;
	timeDisplay.innerHTML = secondsToTime(seconds);

	dingDuration = 0;
	
	filler.className = "";
	filler.style.animationPlayState = "running";
	typeDisplay.innerHTML = "Session";
}

function startBreak() {
	inBreak = true;
	seconds = breakLength;
	dingDuration = 0;
	timeDisplay.innerHTML = secondsToTime(seconds);
	typeDisplay.innerHTML = "Break";

	filler.className = "startAnimation";
	filler.style.animationDuration = seconds + "s";
}

function decrementTime() {
	if (!isPaused) {
		if (seconds === 0) {
			filler.className = "";
			if (inBreak) {
				inBreak = false;
				ding.play();
				resetCountdown();
				return;
			}

			if (dingDuration < 5) {
				if (dingDuration % 2 === 0) {ding.currentTime = 0; ding.play();} 
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
resetButton.onclick = resetCountdown;

sessionLengthMinusButton.onclick = decSessionLength;
sessionLengthPlusButton.onclick = incSessionLength;
breakLengthMinusButton.onclick = decBreakLength;
breakLengthPlusButton.onclick = incBreakLength;