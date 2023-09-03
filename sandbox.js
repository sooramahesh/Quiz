let question;
let form;
let res;
let qno;
let score;

const questions = [
    {
        title : 'What is the correct syntax for declaring a variable in C?',
        options : [
            'variable myVar;',
            'var myVar;',
            'int myVar;',
            'myVar = int;'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'Which of the following is not a valid C data type?',
        options : [
            'float',
            'char',
            'boolean',
            'double'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'What is the purpose of the printf function in C?',
        options : [
            'To input data from the user',
            'To perform mathematical calculations',
            'To display output to the console',
            'To declare variables'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'In C, how do you indicate the end of a statement?',
        options : [
            'By using a semicolon (;)',
            'By using a colon (:)',
            'By using a period (.)',
            'By using a comma (,)'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Which of the following is the correct way to initialize an integer variable x with the value 10?',
        options : [
            'int x;',
            'x=10;',
            'integer x=10;',
            'x:=10;'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'What does the if statement in C do?',
        options : [
            'It defines a function',
            'It repeats a block of code until a condition is met',
            'It allows conditional execution of code',
            'It performs bitwise operations'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'How do you declare a constant in C?',
        options : [
            'const myConst = 5;',
            'constant myConst = 5;',
            'const int myConst = 5;',
            'int myConst = constant(5);'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'What is the purpose of the scanf function in C?',
        options : [
            'To print text to the console',
            'To read input from the user',
            'To perform arithmetic operations',
            'To define functions'
        ],
        answer : '1',
        score : 1
    }
];

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('Please select an option');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value = 'Submit' class = "submit"/>
                </form>
            </div>
            <button>Restart</button>
        </div>
    `;
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();
