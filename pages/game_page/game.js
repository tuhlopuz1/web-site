const quizData = {
    title: "Пример викторины",
    description: "Это пример викторины для демонстрации.",
    questions: [
      {
        question: "Какой язык программирования используется для веб-разработки?",
        answers: ["JavaScript", "Python", "Java", "C#"],
        correctAnswer: 0 // Индекс правильного ответа
      },
      {
        question: "Что такое HTML?",
        answers: ["Язык стилей", "Язык разметки", "Язык программирования", "Язык баз данных"],
        correctAnswer: 1
      },
      {
        question: "Какой фреймворк используется для разработки на JavaScript?",
        answers: ["Django", "Flask", "React", "Laravel"],
        correctAnswer: 2
      }
    ]
  };
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Начинаем викторину сразу после загрузки страницы
  showQuestion();
  
  document.getElementById('menu-button').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  });
  
  document.getElementById('exit-menu').addEventListener('click', function() {
    // Здесь можно реализовать переход к главному меню
    alert("Вы вышли в главное меню.");
  });
  
  document.getElementById('continue-quiz').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.add('hidden'); // Скрываем меню
    showQuestion(); // Показать текущий вопрос
  });
  
  function showQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    const questionTitle = document.getElementById('question');
    const answersContainer = document.getElementById('answers-container');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result');
  
    // Скрываем результаты
    resultContainer.classList.add('hidden');
    
    if (currentQuestionIndex < quizData.questions.length) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      questionTitle.textContent = currentQuestion.question;
  
      // Очищаем предыдущие ответы
      answersContainer.innerHTML = '';
  
      currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.classList.add('answer');
        answerButton.onclick = () => selectAnswer(index);
        answersContainer.appendChild(answerButton);
      });
  
      nextButton.classList.add('hidden');
    } else {
      showResult();
    }
  }
  
  function selectAnswer(selectedIndex) {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
      score++;
    }
    currentQuestionIndex++;
    document.getElementById('next-button').classList.remove('hidden');
  }
  
  document.getElementById('next-button').addEventListener('click', showQuestion);
  
  function showResult() {
    const questionContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result');
    const nextButton = document.getElementById('next-button');
  
    questionContainer.classList.add('hidden');
    nextButton.classList.add('hidden');
    resultContainer.textContent = `Вы набрали ${score} из ${quizData.questions.length} правильных ответов.`;
    resultContainer.classList.remove('hidden');
  }