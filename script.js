// JavaScript code here
//References
let timeLeft = document.querySelector("#timer");
let quizContainer = document.getElementById("quiz-content");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hyper Tool Multi Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    correct: "Hypertext Markup Language",
  },
  {
    id: "1",
    question: "What does IDE stand for?",
    options: ["Integrated Development Environment", "Interactive Development Environment", "Internet Development Environment", "Interface Design Environment"],
    correct: "Integrated Development Environment",
  },
  {
    id: "2",
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: "Cascading Style Sheets",
  },
  {
    id: "3",
    question: "Which of the following is not a web browser?",
    options: ["Firefox", "Chrome", "Excel", "Safari"],
    correct: "Excel",
  },
  {
    id: "4",
    question: "Which database language is commonly used for querying and managing databases?",
    options: ["SQL", "Java", "Python", "HTML"],
    correct: "SQL",
  },
  {
    id: "5",
    question: "What is the file extension for JavaScript files?",
    options: [".js", ".css", ".html", ".php"],
    correct: ".js",
  },
  {
    id: "6",
    question: "What is the primary use of JavaScript in web development?",
    options: ["Styling", "Interactivity", "Database management", "Server-side scripting"],
    correct: "Interactivity",
  },
  {
    id: "7",
    question: "Which of the following is a front-end framework?",
    options: ["Django", "Ruby on Rails", "Angular", "Express.js"],
    correct: "Angular",
  },
  {
    id: "8",
    question: "Which tag is used for creating a hyperlink in HTML?",
    options: ["<a>", "<link>", "<hyper>", "<href>"],
    correct: "<a>",
  },
  {
    id: "9",
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Number", "Character"],
    correct: "Character",
  }
];

// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  // Change button text back to "Next" for non-last questions
  nextBtn.textContent = "Next";
});

// Next Button
nextBtn.addEventListener("click", () => {
  // Increment questionCount
  questionCount += 1;
  
  // If it's the last question
  if (questionCount === quizArray.length - 1) {
    // Change button text to "Submit"
    nextBtn.textContent = "Submit";
  }
  
  // If it's past the last question
  if (questionCount >= quizArray.length) {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    // User score
    userScore.innerHTML =
      "<div style='text-align: center; margin-bottom: 1em;'>" + 
      "<span style='color: white;'>Your score is " + scoreCount + " out of " + questionCount + "</span></div>";

    // Check if the user got all questions correct
    if (scoreCount === quizArray.length) {
      // Display appreciation message
      userScore.innerHTML += "<div style='text-align: center; margin-bottom: 1em;'><span style='color: yellow;'>Congratulations! You got all questions correct!</span></div>";
    }
  } else {
    // Display questionCount
    countOfQuestion.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " questions";
    // Display quiz
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
});

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      nextBtn.click(); // Automatically move to the next question
    }
  }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
  let quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = ""; // Clear previous content
  let question = document.createElement("p");
  question.classList.add("question");
  question.innerHTML = quizArray[questionCount].question;
  quizContent.appendChild(question);
  shuffleArray(quizArray[questionCount].options); // Shuffle options
  quizArray[questionCount].options.forEach((optionText, index) => {
    let optionButton = document.createElement("button");
    optionButton.classList.add("option-div");
    optionButton.textContent = optionText;
    optionButton.onclick = function() { checker(this); };
    quizContent.appendChild(optionButton);
  });
};

// Checker Function to check if the option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = quizContainer.querySelector(".question");
  let options = quizContainer.querySelectorAll(".option-div");
  // If the user clicked answer == correct option stored in the object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    // For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  // Clear interval (stop the timer)
  clearInterval(countdown);
  // Disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizDisplay(questionCount);
}

// When the user clicks on the start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Hide the quiz and display the start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
