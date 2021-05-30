/*

The overall purpose of this program was to make an easily scalable photo carousel in JS
Other programs in tutorials used heavier HTML and CSS, or frameworks and libraries to do the same
This is automatically scalable with the number if images inputted, and easily customized through CSS

The biggest fault of this carousel is the weakness in the image transitions, such as sliding and such
Possibly can be implemented, but this was as much as I wished from a vanilla JS-focused approach

Second fault with this program is that there is no auto-scaling feature to the pictures
The example pics are the same resolution

*/

const imgDiv = document.getElementById('carousel-container-div');
const previousBtn = document.getElementById('carousel-button-left');
const nextBtn = document.getElementById('carousel-button-right');

// The program runs and scales from this array. Add more img paths and the array changes to accommodate
const picArray = [
	'imgs/art.jpg',
	'imgs/hiking.jpg',
	'imgs/movie.jpg',
	'imgs/observe.jpg',
	'imgs/rainy.jpg',
	'imgs/suit.jpg',
	'imgs/walking.jpg',
	'imgs/wave.jpg',
	'imgs/town.jpeg',
];

// variable to set what picture from array and what dot is selected
let picVariable = 0;
// setInterval timer
let picInterval = 10000;

// sets images into the <img> tag on HTML and updates nav dots
const applyImg = num => {
	const img = document.getElementById('img');
	img.setAttribute('src', picArray[num]);
	clearDots();
	highlightDotNum(num);
};

// increment/decrement count, used for next/previous buttons and refreshes image
const incrementNumbers = () => {
	if (picVariable === picArray.length - 1) {
		picVariable = 0;
	} else {
		picVariable += 1;
	}
	fadeOut();
};

const decrementNumbers = () => {
	if (picVariable === 0) {
		picVariable = picArray.length - 1;
	} else {
		picVariable -= 1;
	}
	fadeOut();
};

// toggles through fade-out/fade-in and sets new image
const fadeIn = () => {
	const img = document.getElementById('img');
	img.classList.remove('fade-out');
	img.classList.add('fade-in');
	applyImg(picVariable);
};

// toggles through fade-in/fade-out and setTimeout to start new image
const fadeOut = () => {
	const img = document.getElementById('img');
	img.classList.remove('fade-in');
	img.classList.add('fade-out');
	setTimeout(fadeIn, 300);
};

// takes the picVariable and sets corresponding dot
const highlightDotNum = num => {
	const selectedDot = document.getElementById(num);
	selectedDot.classList.add('selected-dot');
};

// clears the highlighting class from other dots
const clearDots = () => {
	const dots = document.querySelectorAll('.carousel-indicator');
	dots.forEach(dot => {
		dot.classList.remove('selected-dot');
	});
};

// auto creates dots and sets input so they choose which pic corresponds to them
const dotsApply = num => {
	const dotDiv = document.getElementById('carousel-dot-container');
	for (i = 0; i < picArray.length; i++) {
		const dot = document.createElement('button');
		dot.classList.add('carousel-indicator');
		dot.id = i;
		dot.addEventListener('click', e => {
			let btnNum = parseInt(e.target.id);
			picVariable = btnNum;
			fadeOut();
			clearDots();
			highlightDotNum(e.target.id);
		});
		dotDiv.appendChild(dot);
	}
};

previousBtn.addEventListener('click', () => {
	decrementNumbers();
});

nextBtn.addEventListener('click', () => {
	incrementNumbers();
});

// the auto-change timer
setInterval(incrementNumbers, picInterval);

const startCycle = () => {
	fadeOut();
	dotsApply(picVariable);
};

startCycle();
