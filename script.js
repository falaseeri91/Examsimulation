const pages = [
    {
        title: "Page 1: General Knowledge",
        description: "This section contains basic general knowledge questions.",
        questions: [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Lisbon"],
                correctAnswer: "Paris"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Saturn"],
                correctAnswer: "Mars"
            }
        ]
    },
    {
        title: "Page 2: Geography",
        description: "Test your knowledge about geography.",
        questions: [
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
                correctAnswer: "Pacific Ocean"
            },
            {
                question: "Which country has the largest population?",
                options: ["USA", "India", "China", "Russia"],
                correctAnswer: "China"
            }
        ]
    },
    {
        title: "Page 3: Science",
        description: "This section contains basic science questions.",
        questions: [
            {
                question: "What is the chemical symbol for Oxygen?",
                options: ["O", "Ox", "Og", "Os"],
                correctAnswer: "O"
            },
            {
                question: "What planet is closest to the sun?",
                options: ["Earth", "Mars", "Venus", "Mercury"],
                correctAnswer: "Mercury"
            }
        ]
    },
    {
        title: "Page 4: Literature",
        description: "Check your knowledge about famous literature.",
        questions: [
            {
                question: "Who wrote 'To Kill a Mockingbird'?",
                options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
                correctAnswer: "Harper Lee"
            },
            {
                question: "In which year was '1984' by George Orwell published?",
                options: ["1930", "1945", "1949", "1955"],
                correctAnswer: "1949"
            }
        ]
    }
];

let currentPageIndex = 0;
let score = 0;

function loadPage() {
    const page = pages[currentPageIndex];
    document.getElementById('page-title').textContent = page.title;
    document.getElementById('page-description').textContent = page.description;

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    page.questions.forEach((questionObj, questionIndex) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-block';
        questionElement.innerHTML = `<h3>${questionObj.question}</h3>`;

        questionObj.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-btn';
            button.onclick = () => selectAnswer(questionObj, option, button);
            questionElement.appendChild(button);
        });

        questionContainer.appendChild(questionElement);
    });

    document.getElementById('prev-btn').disabled = currentPageIndex === 0;
    document.getElementById('next-btn').disabled = currentPageIndex === pages.length - 1;
}

function selectAnswer(question, selectedOption, button) {
    if (selectedOption === question.correctAnswer) {
        score++;
    }
    disableOptions(button.parentNode);
}

function disableOptions(questionBlock) {
    const buttons = questionBlock.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
}

function nextPage() {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        loadPage();
    } else {
        showFinalScore();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        loadPage();
    }
}

function showFinalScore() {
    document.getElementById('app').innerHTML = `<h2>Your final score: ${score} / ${pages.length * 2}</h2>`;
}

window.onload = loadPage;
