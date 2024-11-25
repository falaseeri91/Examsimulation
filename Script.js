const questionsData = {
  exam1: [
    { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
    // ... Add 49 more questions
  ],
  exam2: [
    { id: 1, text: "What is the capital of France?", options: ["Berlin", "Paris", "Rome", "Madrid"], correct: "Paris" },
    // ... Add 49 more questions
  ],
  exam3: [
    { id: 1, text: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Earth", "Venus"], correct: "Mars" },
    // ... Add 49 more questions
  ],
  exam4: [
    { id: 1, text: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Shark", "Giraffe"], correct: "Blue Whale" },
    // ... Add 49 more questions
  ],
};

let scores = { exam1: 0, exam2: 0, exam3: 0, exam4: 0 };
let currentExam = null;

function startExam(examNumber) {
  currentExam = `exam${examNumber}`;
  document.getElementById("navigation").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("exam").classList.remove("hidden");
  document.getElementById("exam-title").innerText = `Exam ${examNumber}`;
  renderQuestions(questionsData[currentExam]);
}

function renderQuestions(questions) {
  const app = document.getElementById("app");
  app.innerHTML = questions
    .map(
      (q, i) => `
        <div>
          <p>${i + 1}. ${q.text}</p>
          ${q.options
            .map(
              (opt) =>
                `<label><input type="radio" name="q${q.id}" value="${opt}"> ${opt}</label>`
            )
            .join("<br>")}
        </div>
      `
    )
    .join("");
}

function submitExam() {
  const selectedAnswers = [...document.querySelectorAll('input:checked')];
  const correctAnswers = selectedAnswers.filter(
    (ans) =>
      questionsData[currentExam].find((q) => q.id == ans.name.slice(1)).correct ===
      ans.value
  );
  scores[currentExam] = correctAnswers.length;

  alert(`You scored ${correctAnswers.length}/${questionsData[currentExam].length}`);
  goBackToDashboard();
}

function goBackToDashboard() {
  document.getElementById("navigation").classList.remove("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("exam").classList.add("hidden");
  displayDashboard();
}

function displayDashboard() {
  const resultsDiv = document.getElementById("results");
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  resultsDiv.innerHTML = `
    <p>Exam 1: ${scores.exam1}/50</p>
    <p>Exam 2: ${scores.exam2}/50</p>
    <p>Exam 3: ${scores.exam3}/50</p>
    <p>Exam 4: ${scores.exam4}/50</p>
    <h3>Total Score: ${totalScore}/200</h3>
  `;
}

// Initialize Dashboard on Load
displayDashboard();
