function HomeScreen() {
	let containerHome = document.createElement('div')
	containerHome.setAttribute('class', 'container-fluid')
	containerHome.style.width = '60%'
	containerHome.style.height = '50%'

	let containerCard = document.createElement('div')
	containerCard.setAttribute(
		'class',
		'card bg-dark text-yellow mx-auto Lets Play'
	)
	//cardBody here
	let containerCardBody = document.createElement('div')
	containerCardBody.setAttribute('class', 'card-body text-center')
	//cardBody content here
	let QuickQuiz = document.createElement('h1')
	QuickQuiz.setAttribute('class', 'card-text text-center')
	QuickQuiz.innerHTML = 'Quick Quiz'
	let containerText = document.createElement('p')
	containerText.setAttribute('class', 'card-text mt-3 text-center')
	containerText.innerHTML = 'Lets Go'
	let playButton = document.createElement('button')
	playButton.setAttribute('class', 'btn text-center mt-2 Play')
	let linkIcon = document.createElement('a')
	linkIcon.href = 'quiz.html'
	linkIcon.innerHTML =
		'<i class="fas fa-play-circle fa-7x" style="color: white;"></i>'

	var footer = document.createElement('div')
	footer.setAttribute('class', 'card-footer text-center')
	let highscores = document.createElement('button')
	highscores.setAttribute('class', 'btn btn-outline-warning highscore')
	var link = document.createElement('a')
	link.setAttribute('style', 'color: black')
	link.href = 'bestscores.html'
	link.innerHTML = 'High Scores!'
	highscores.appendChild(link)
	footer.appendChild(highscores)
	playButton.append(linkIcon)
	containerCardBody.append(QuickQuiz, containerText, playButton)
	containerCard.append(containerCardBody, footer)
	containerHome.append(containerCard)
	document.body.append(containerHome)
}

let score = 0
let questionsDone = 0
let questionNumber = 0
let responseObject = null

async function getQuizData() {
	try {
		var data = await fetch(
			'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
		)
		var quizData = await data.json()

		displayQuestions(quizData.results)
		return quizData.results
	} catch (error) {
		console.error(error)
	}
}

async function loadGamePage() {
	var questionsData = await getQuizData()

	console.log(questionsData)
	responseObject = questionsData
}

function randomiseArray(arr) {
	for (var j = arr.length - 1; j > 0; j--) {
		var k = Math.floor(Math.random() * (j + 1))
		var temp = arr[j]
		arr[j] = arr[k]
		arr[k] = temp
	}
	return arr
}

function displayQuestions(q) {
	var seq = [0, 1, 2, 3]
	var jumbledSeq = randomiseArray(seq)

	var container = document.createElement('div')
	container.setAttribute('class', 'container holder mt-5')

	var card = document.createElement('div')
	card.setAttribute('class', 'card bg-dark text-white')

	var cardHeader = document.createElement('div')
	cardHeader.setAttribute('class', 'card-header text-center')
	var title = document.createElement('h1')
	title.setAttribute('class', 'card-title text-center')
	title.innerHTML = 'Computer Science Quiz'

	var arrOfAnswers = [
		q[questionNumber].correct_answer,
		...q[questionNumber].incorrect_answers
	]

	var cardBody = document.createElement('div')
	cardBody.setAttribute('class', 'card-body')

	//cardBody content
	var question = document.createElement('h3')
	question.setAttribute('class', 'card-text mt-5')
	question.setAttribute('id', 'question')
	question.innerHTML = 'Q. ' + q[questionNumber].question

	//MCQ layout
	var row = document.createElement('div')
	row.setAttribute('class', 'row mt-5')
	//buttons
	var div1 = document.createElement('div')
	div1.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 mt-3')
	var btn1 = document.createElement('button')
	btn1.setAttribute('class', 'btn btn-block btn-primary')
	btn1.setAttribute('id', 'optionBtn1')
	btn1.setAttribute('value', arrOfAnswers[jumbledSeq[0]])
	btn1.innerHTML = arrOfAnswers[jumbledSeq[0]]
	btn1.addEventListener('click', validateAnswer)

	var div2 = document.createElement('div')
	div2.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 mt-3')
	var btn2 = document.createElement('button')
	btn2.setAttribute('class', 'btn btn-block btn-primary')
	btn2.setAttribute('id', 'optionBtn2')
	btn2.setAttribute('value', arrOfAnswers[jumbledSeq[1]])
	btn2.innerHTML = arrOfAnswers[jumbledSeq[1]]
	btn2.addEventListener('click', validateAnswer)

	var div3 = document.createElement('div')
	div3.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 mt-3')
	var btn3 = document.createElement('button')
	btn3.setAttribute('class', 'btn btn-block btn-primary')
	btn3.setAttribute('id', 'optionBtn3')
	btn3.setAttribute('value', arrOfAnswers[jumbledSeq[2]])
	btn3.innerHTML = arrOfAnswers[jumbledSeq[2]]
	btn3.addEventListener('click', validateAnswer)

	var div4 = document.createElement('div')
	div4.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 mt-3')
	var btn4 = document.createElement('button')
	btn4.setAttribute('class', 'btn btn-block btn-primary ')
	btn4.setAttribute('id', 'optionBtn4')
	btn4.setAttribute('value', arrOfAnswers[jumbledSeq[3]])
	btn4.innerHTML = arrOfAnswers[jumbledSeq[3]]
	btn4.addEventListener('click', validateAnswer)

	var cardFooter = document.createElement('div')
	cardFooter.setAttribute('class', 'card-footer')

	var quesNumDiv = document.createElement('div')
	quesNumDiv.setAttribute('class', 'float-left')
	var quesNum = document.createElement('p')
	quesNum.setAttribute('class', 'card-text float-right')
	quesNum.setAttribute('id', 'quesNum')
	quesNum.innerHTML = 'Question: ' + parseInt(questionNumber + 1) + '/10'
	var scoreInfo = document.createElement('p')
	scoreInfo.setAttribute('class', 'card-text')
	scoreInfo.setAttribute('id', 'score')
	scoreInfo.innerHTML = 'Score: ' + score

	cardFooter.append(quesNum, scoreInfo)
	div4.append(btn4)
	div3.append(btn3)
	div2.append(btn2)
	div1.append(btn1)
	row.append(div1, div2, div3, div4)
	cardBody.append(question, row)

	cardHeader.append(title)
	card.append(cardHeader, cardBody, cardFooter)
	container.append(card)

	document.body.append(container)
}

function validateAnswer(e) {
	if (questionNumber === 9) {
		if (e.target.value === responseObject[questionNumber].correct_answer) {
			console.log('CORRECT ANSWER!')
			questionNumber++
			updateScore()
			loadEndPage()
		} else if (
			responseObject[questionNumber].incorrect_answers.includes(e.target.value)
		) {
			questionNumber++
			loadEndPage()
		}
		localStorage.setItem('scoreValue', score)
	} else {
		if (e.target.value === responseObject[questionNumber].correct_answer) {
			console.log('CORRECT ANSWER!')
			questionNumber++
			updateScore()
			updateContent(questionNumber)
		} else if (
			responseObject[questionNumber].incorrect_answers.includes(e.target.value)
		) {
			questionNumber++
			updateContent(questionNumber)
		}
	}
}

function updateContent(questionNumber) {
	document.getElementById('question').innerHTML =
		'Q. ' + responseObject[questionNumber].question
	document.getElementById('quesNum').innerHTML =
		'Question: ' + parseInt(questionNumber + 1) + '/10'

	var seq = [1, 2, 3, 4]
	var jumbledSeq = randomiseArray(seq)

	document.getElementById('optionBtn' + jumbledSeq[0]).value =
		responseObject[questionNumber].correct_answer
	document.getElementById('optionBtn' + jumbledSeq[1]).value =
		responseObject[questionNumber].incorrect_answers[0]
	document.getElementById('optionBtn' + jumbledSeq[2]).value =
		responseObject[questionNumber].incorrect_answers[1]
	document.getElementById('optionBtn' + jumbledSeq[3]).value =
		responseObject[questionNumber].incorrect_answers[2]

	document.getElementById('optionBtn' + jumbledSeq[0]).innerHTML =
		responseObject[questionNumber].correct_answer
	document.getElementById('optionBtn' + jumbledSeq[1]).innerHTML =
		responseObject[questionNumber].incorrect_answers[0]
	document.getElementById('optionBtn' + jumbledSeq[2]).innerHTML =
		responseObject[questionNumber].incorrect_answers[1]
	document.getElementById('optionBtn' + jumbledSeq[3]).innerHTML =
		responseObject[questionNumber].incorrect_answers[2]
}

function updateScore() {
	score += 10
	document.getElementById('score').innerHTML = 'Score: ' + score
}

function loadEndPage() {
	window.location.href = 'close.html'
	console.log(localStorage.getItem('scoreValue'))
	displayResults()
}

function displayResults() {
	var endContainer = document.createElement('div')
	endContainer.setAttribute('class', 'container')
	var endCard = document.createElement('div')
	endCard.setAttribute('class', 'card bg-dark text-white mx-auto welcome')
	var endCardBody = document.createElement('div')
	endCardBody.setAttribute('class', 'card-body text-center')
	var scoreDisplay = document.createElement('h3')
	scoreDisplay.setAttribute('class', 'card-text text-center')
	scoreDisplay.innerHTML = 'YOUR SCORE : ' + localStorage.getItem('scoreValue')
	var form = document.createElement('form')
	var formGroup = document.createElement('div')
	formGroup.setAttribute('class', 'form-group')
	var labelName = document.createElement('label')
	labelName.setAttribute('for', 'name')
	labelName.innerHTML = 'Your Name:'
	var textArea = document.createElement('textarea')
	textArea.setAttribute('class', 'form-control')
	textArea.setAttribute('id', 'username')
	textArea.setAttribute('rows', '2')
	textArea.required = true
	var saveButton = document.createElement('button')
	saveButton.setAttribute(
		'class',
		'btn btn-outline-light btn-block text-center mt-5'
	)
	saveButton.setAttribute('id', 'save')
	saveButton.innerHTML = 'SAVE'
	saveButton.addEventListener('click', function () {
		localStorage.setItem('user1', textArea.value)
		alert('Record Saved!')
		console.log(localStorage.getItem('user1'))
	})
	var playAgain = document.createElement('button')
	playAgain.setAttribute(
		'class',
		'btn btn-outline-light btn-block text-center mt-2'
	)
	playAgain.innerHTML = 'Play Again!'
	playAgain.href = 'quiz.html'
	playAgain.addEventListener('click', function () {
		window.location.href = 'quiz.html'
	})

	var homeButton = document.createElement('button')
	homeButton.setAttribute(
		'class',
		'btn btn-outline-light btn-block text-center mt-2'
	)
	homeButton.innerHTML = 'HOMEPAGE'
	homeButton.href = 'main.html'
	homeButton.addEventListener('click', function () {
		window.location.href = 'main.html'
	})

	form.append(labelName, textArea)
	endCardBody.append(scoreDisplay, form, saveButton, playAgain, homeButton)
	endCard.append(endCardBody)
	endContainer.append(endCard)

	document.body.appendChild(endContainer)
}

function highScoresDisplay() {
	document.getElementById('userInfo').innerHTML = localStorage.getItem('user1')
	document.getElementById('highscore').innerHTML = localStorage.getItem(
		'scoreValue'
	)
	document.getElementById('returnHome').addEventListener('click', function () {
		window.location.href = 'main.html'
	})
}
