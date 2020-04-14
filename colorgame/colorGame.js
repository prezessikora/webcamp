
squares = document.querySelectorAll(".square")
pickedColorSpan = document.querySelector("#selectedColor")
message = document.querySelector("#message")
h1 = document.querySelector("h1")

resetButton = document.querySelector("#reset")
easyBtn = document.querySelector("#easyBtn")
hardBtn = document.querySelector("#hardBtn")

const backgroundColor = '#232323'
var noSquares = 6;
colors = []
pickedColor = ""

function pickColor() {
	pickedColor = colors[getRandomInt(noSquares)]
	pickedColorSpan.innerText = pickedColor
}

function changeLevel(noColors) {
	easyBtn.classList.toggle("selected")
	hardBtn.classList.toggle("selected")
	for (var i=3 ; i < squares.length ; i++) {
		squares[i].classList.toggle("squareHidden")
	}
	noSquares = noColors;
	newGame()
}

easyBtn.addEventListener("click", function() {
	if (noSquares == 3)
		return;
	changeLevel(3)
})

hardBtn.addEventListener("click", function() {
	if (noSquares == 6)
		return;
	changeLevel(6)
})

resetButton.addEventListener("click", function() {
	newGame()
	h1.style.backgroundColor = "steelblue"
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);;
}

function changeColors() {
	for (var i=0 ; i < squares.length ; i++) {
		squares[i].style.backgroundColor = pickedColor
	}
}

function getRandomColor() {
	r = Math.round(Math.random() * 255)
	g = Math.round(Math.random() * 255)
	b = Math.round(Math.random() * 255)

	return "rgb("+r+", "+g+", "+b+")"
}

function newGame() {
	colors = []
	message.textContent = ""
	for (var i=0 ; i < noSquares ; i++) {

		color = getRandomColor()
		colors.push(color)

		squares[i].style.backgroundColor = color
		squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === pickedColor) {
				message.textContent = "Correct"
				h1.style.backgroundColor = pickedColor;
				changeColors()
			} else {
				this.style.backgroundColor = backgroundColor;
				message.textContent = "Try again!"
			}
		})
	}
	pickColor()
}

newGame()
