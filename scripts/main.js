import { loadJSON } from './jsonloader.js';


let q = loadJSON('./data/questions.json'), currentQuestion;


function getQuizCard() {
    return /*html*/`
        <h5 id="question1" class="card-title">Frage</h5>
            <div id="answer0" class="card mb-2">
                <div class="card-body" onclick="checkAnswer(0)"></div>
            </div>
            <div id="answer1" class="card mb-2">
                <div class="card-body" onclick="checkAnswer(1)"></div>
            </div>
            <div id="answer2" class="card mb-2">
                <div class="card-body" onclick="checkAnswer(2)"></div>
            </div>
            <div id="answer3" class="card mb-2">
                <div class="card-body" onclick="checkAnswer(3)"></div>
            </div>
            <div class="question-footer">
                <span><b id="q-number">1</b> von <b id="q-total">5</b> Fragen</span>
                <button class="btn btn-primary" onclick="nextQuestion()">Nächste Frage</button>
            </div>
    `;
}



function getNextQuestion(i) {
    document.querySelector('.card-title').setAttribute('id', `question${i}`);
    document.querySelector(`#question${i}`).innerHTML = q.questions[i].question;
    q.questions[i].answers.forEach((element, index) => {
        document.querySelector(`#answer${index} > div`).innerHTML = element;
    });
    document.querySelectorAll('.card-body > div').forEach(element => { element.style.setProperty('background-color', 'white'); });
}


function nextQuestion() {
    currentQuestion = Number(currentQuestion) + 1;
    if (currentQuestion < q.questions.length) {
        localStorage.setItem('question', currentQuestion);
        document.querySelector('#q-number').innerHTML = currentQuestion + 1;
        getNextQuestion(currentQuestion);
    }
    else endgame();
}


function checkAnswer(i) {
    if (q.questions[currentQuestion].solution == i) {
        document.querySelector(`#answer${i}`).style.setProperty('background-color', 'green');
        q.passed += 1;
        localStorage.setItem('questionsPassed', q.passed);
    }
    else {
        document.querySelector(`#answer${q.questions[currentQuestion].solution}`).style.setProperty('background-color', 'green');
        document.querySelector(`#answer${i}`).style.setProperty('background-color', 'red');
    }
}


function calculatePercentage() {
    let passed = Number(localStorage.getItem('questionsPassed'));
    return (passed > 0) ? ((passed / q.questions.length) * 100).toFixed(2) : 0;
}


function getEndgameCard() {
    return /*html*/`
        <h5 id="endgame" class="card-title">Ende</h5>
        <div id="score" class="score">
            <span>Sie haben von ${q.questions.length} Fragen ${localStorage.getItem('questionsPassed')} richtig beantwortet</span>
            <span>das entspricht ${calculatePercentage()}%</span>
            <span></span>
        </div>
        <div class="question-footer">
            <span><b id="q-number">${q.questions.length}</b> von <b id="q-total">${q.questions.length}</b> Fragen</span>
            <button class="btn btn-primary" onclick="start()">Neu Starten</button>
        </div>
    `;
}


function endgame() {
    document.querySelector('.card-body').innerHTML = getEndgameCard();
    localStorage.setItem('question', 0);
}


function start() {
    localStorage.setItem('question', 0);
    currentQuestion = localStorage.getItem('question');
    localStorage.setItem('questionsPassed', 0);
    q.passed = 0;
    document.querySelector('.card-body').innerHTML = getQuizCard();
    document.querySelector('#q-number').innerHTML = Number(currentQuestion) + 1;
    document.querySelector('#q-total').innerHTML = q.questions.length;
    getNextQuestion(currentQuestion);
}


function render() {
    if(!localStorage.getItem('question')) start();
    else currentQuestion = localStorage.getItem('question'); 
    
    if (currentQuestion < q.questions.length) {
        document.querySelector('#q-number').innerHTML = Number(currentQuestion) + 1;
        document.querySelector('#q-total').innerHTML = q.questions.length;
        getNextQuestion(currentQuestion);
    }
}


window.render = render;
window.nextQuestion = nextQuestion;
window.checkAnswer = checkAnswer;
window.start = start;