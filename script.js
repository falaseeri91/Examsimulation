function loadQuestions(questions) {
    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        const questionObj = questions[currentQuestionIndex];
        document.getElementById('question').textContent = questionObj.question;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        questionObj.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-btn';
            button.onclick = () => selectAnswer(option, questionObj.correctAnswer);
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) score++;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }

    function showScore() {
        document.getElementById('app').innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
    }

    loadQuestion();
}
