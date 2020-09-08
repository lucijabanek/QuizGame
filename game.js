const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const CORRECT_CLASS = "correct";
const INCORRECT_CLASS = "incorrect";

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let correctChoice;

fetch(
  "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple"
)
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  console.log(questions);
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (questions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    //save high score
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }

  questionCounter++;
  //questions
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  questions.splice(questionIndex, 1);

  findCorrectChoice();
  acceptingAnswers = true;
};

const findCorrectChoice = () => {
  choices.forEach(choice => {
    if (choice.dataset["number"] == currentQuestion.answer) {
      correctChoice = choice;
    }
  });
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer
        ? CORRECT_CLASS
        : INCORRECT_CLASS;

    if (classToApply === CORRECT_CLASS) {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    correctChoice.parentElement.classList.add(CORRECT_CLASS);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      correctChoice.parentElement.classList.remove(CORRECT_CLASS);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
