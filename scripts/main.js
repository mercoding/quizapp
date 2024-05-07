import { loadJSON } from './jsonloader.js';


let q = loadJSON('./data/questions.json'), currentQuestion;


function getNextQuestion(i) {
    document.querySelector('#question').innerHTML = q.questions[i].question;
    q.questions[i].answers.forEach((element, index) => {
        document.querySelector('#answer' + (index + 1)).innerHTML = element;
    });
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


function render() {
    if(!localStorage.getItem('question'))
        localStorage.setItem('question', 0);
    currentQuestion = localStorage.getItem('question');
    getNextQuestion(currentQuestion);
}


window.render = render;
window.nextQuestion = nextQuestion;