const imgDiv = document.getElementById('carousel-container');
const previousBtn = document.getElementById('carousel-button-left');
const nextBtn = document.getElementById('carousel-button-right');

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

let picSelect = 0;

const applyImg = num => {
	const img = document.getElementById('img');
	img.setAttribute('src', picArray[num]);
	clearDots();
	highlightDotNum(num);
};

const incrementNumbers = () => {
	if (picSelect === picArray.length - 1) {
		picSelect = 0;
	} else {
		picSelect += 1;
	}
	fadeOut();
};

const decrementNumbers = () => {
	if (picSelect === 0) {
		picSelect = picArray.length - 1;
	} else {
		picSelect -= 1;
	}
	fadeOut();
};

const highlightDotNum = num => {
	const selectedDot = document.getElementById(num);
	selectedDot.classList.add('selected-dot');
};

const clearDots = () => {
	const dots = document.querySelectorAll('.carousel-indicator');
	dots.forEach(dot => {
		dot.classList.remove('selected-dot');
	});
};

const dotsApply = num => {
	const dotDiv = document.getElementById('carousel-nav');
	for (i = 0; i < picArray.length; i++) {
		const dot = document.createElement('button');
		dot.classList.add('carousel-indicator');
		dot.id = i;
		dot.addEventListener('click', e => {
			let btnNum = parseInt(e.target.id);
			picSelect = btnNum;
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

setInterval(incrementNumbers, 10000);

const fadeIn = () => {
	const img = document.getElementById('img');
	img.classList.remove('fade-out');
	img.classList.add('fade-in');
	applyImg(picSelect);
};

const fadeOut = () => {
	const img = document.getElementById('img');
	img.classList.remove('fade-in');
	img.classList.add('fade-out');
	setTimeout(fadeIn, 300);
};

const startCycle = () => {
	fadeOut();
	dotsApply(picSelect);
};

startCycle();
