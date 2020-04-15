
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

game = {

}

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
	game.newGame()
}

easyBtn.addEventListener("click", function() {
	changeLevel(3)
})

hardBtn.addEventListener("click", function() {
	changeLevel(6)
})

resetButton.addEventListener("click", function() {
	game.newGame()
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
	return "rgb("+getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)+")"
}

game.newGame = function newGame() {
	colors = []
	message.textContent = ""
	h1.style.backgroundColor = "steelblue"
	resetButton.textContent = "New game"
	for (var i=0 ; i < noSquares ; i++) {

		color = getRandomColor()
		colors.push(color)

		squares[i].style.backgroundColor = color
		squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === pickedColor) {
				message.textContent = "Correct"
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play again?"
				changeColors()
			} else {
				this.style.backgroundColor = backgroundColor;
				message.textContent = "Try again!"
			}
		})
	}
	pickColor()
}

game.newGame()
