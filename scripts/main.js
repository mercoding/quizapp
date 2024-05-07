import { loadJSON } from './jsonloader.js';


let q = loadJSON('./data/questions.json'), currentQuestion;


function getNextQuestion(i) {
    document.querySelector('.card-title').setAttribute('id', `question${i}`);
    document.querySelector(`#question${i}`).innerHTML = q.questions[i].question;
    q.questions[i].answers.forEach((element, index) => {
        document.querySelector(`#answer${index} > div`).innerHTML = element;
    });
    document.querySelectorAll('.card-body > div').forEach(element => { element.style.setProperty('background-color', 'white');});
}


function nextQuestion() {
    currentQuestion = Number(currentQuestion) + 1;
    if(currentQuestion < 5) localStorage.setItem('question', currentQuestion);
    else {
        localStorage.setItem('question', 0);
        currentQuestion = 0;        
    }
    document.querySelector('#q-number').innerHTML = currentQuestion + 1;
    getNextQuestion(currentQuestion);
}


function checkAnswer(i) {
    if(q.questions[currentQuestion].solution == i) {
        document.querySelector(`#answer${i}`).style.setProperty('background-color', 'green');
        q.passed += 1;
    }
    else {
        document.querySelector(`#answer${q.questions[currentQuestion].solution}`).style.setProperty('background-color', 'green');
        document.querySelector(`#answer${i}`).style.setProperty('background-color', 'red');
    }
}


function render() {
    if(!localStorage.getItem('question'))
        localStorage.setItem('question', 0);
    currentQuestion = localStorage.getItem('question');
    getNextQuestion(currentQuestion);
}


window.render = render;
window.nextQuestion = nextQuestion;
window.checkAnswer = checkAnswer;