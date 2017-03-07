let countDown;
const timerDisplay = document.querySelector('.time-left');
const endTime = document.querySelector('.end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	//This will remove any existing timer
	clearInterval(countDown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countDown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//Checking if we should stop the timer
		if (secondsLeft < 0) {
			clearInterval(countDown);
			return;
		}
		//display the time
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customform.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins  * 60);
	this.reset();
});