const startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)
const questionBox = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButton = document.getElementById('answer-box')
const nextButton = document.getElementById('next')
const informations = document.getElementById('informations')
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    goToNext()
})

let shuffledQuestions, currentQuestionIndex

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionBox.classList.remove('hide')
    informations.classList.add('hide')
    goToNext()
}

function goToNext() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButton.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButton.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerHTML = 'Recomeçar'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'quantos fusos horários tem a Russia?',
        answers: [
            {text: '11', correct: true},
            {text: '12', correct: false},
            {text: '9', correct: false},
            {text: '5', correct: false}
        ]
    },
    {
        question: 'o que significa CEI?',
        answers: [
            {text: 'Comunidade De Estados Da Indoésia', correct: false},
            {text: 'Comunidade De Estado Inteligente', correct: false},
            {text: 'Comunidade De Estados Independentes', correct: true},
            {text: 'Comunidade De Estados Intelectual', correct: false}
        ]
    },
    {
        question: 'A Russia está Localizada em qual continente?',
        answers: [
            {text: 'América e Ásia', correct: false},
            {text: 'Oceania e Europa', correct: false},
            {text: 'Oceania e Ásia', correct: false},
            {text: 'Ásia e Europa', correct: true}
        ]
    },
    {
        question: 'Onde Está Localizada a Península da Crimeia',
        answers: [
            {text: 'Litoral Do Mar Negro', correct: true},
            {text: 'Próximo à Oceania', correct: false},
            {text: 'Litoral Do Mar De Azov', correct: false},
            {text: 'Próximo Mar Cáspio', correct: false}
        ]
    },
    {
        question: 'Quando occoreu a separação da Crimeia e da Ucrânia',
        answers: [
            {text: 'Janeiro de 2014', correct: false},
            {text: 'Dezembro de 2014', correct: false},
            {text: 'Março de 2014', correct: true},
            {text: 'Abril de 2014', correct: false}
        ]
    },
]