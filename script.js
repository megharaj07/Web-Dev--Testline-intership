document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const quizScreen = document.getElementById("quiz-screen");
    const startScreen = document.getElementById("start-screen");
    const resultScreen = document.getElementById("result-screen");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const scoreDisplay = document.getElementById("score");
    const topic = document.getElementById("topic");
    
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", nextQuestion);
    restartBtn.addEventListener("click", restartQuiz);
    
    //json
function fetchQuestions() {
    fetch("questions.json")
          .then(response => response.json())
          .then(data => {
              questions = data;
              startScreen.classList.add("hidden");
              quizScreen.classList.remove("hidden");
              showQuestion();
          })
          .catch(error => console.error("Error fetching questions:", error));
}


    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        fetchQuestions();
        topic.classList.add("hidden");
    }
    
    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";
        
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.addEventListener("click", () => selectAnswer(option, currentQuestion.correct));
            optionsContainer.appendChild(button);
        });
        
        nextBtn.classList.add("hidden");
    }
    
    function selectAnswer(selected, correct) {
        if (selected === correct) {
            score += 4;
        } else {
            score -= 1;
        }
        nextBtn.classList.remove("hidden");
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
    
    function showResults() {
        quizScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");
        scoreDisplay.textContent = score;
    }
    
    function restartQuiz() {
        resultScreen.classList.add("hidden");
        startScreen.classList.remove("hidden");
        topic.classList.remove("hidden");
    }
});