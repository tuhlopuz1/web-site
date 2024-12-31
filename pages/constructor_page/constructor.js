document.getElementById('user-button').addEventListener('click', () => {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('hidden');
});

document.getElementById('add-question').addEventListener('click', function() {
    const questionsContainer = document.getElementById('questions-container');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
  
    questionDiv.innerHTML = `
      <div class="form-group">
        <label>Question:</label>
        <input type="text" placeholder="Type your question here" required>
      </div>
      <div class="form-group">
        <label>Answer options:</label>
        <div class="answer">
          
          <input type="text" placeholder="Correct answer" required>
        </div>
        <div class="answer">
          
          <input type="text" placeholder="Answer 2" required>
        </div>
        <div class="answer">
          
          <input type="text" placeholder="Answer 3" required>
        </div>
        <div class="answer">
          
          <input type="text" placeholder="Answer 4" required>
        </div>
      </div>
      <button type="button" class="remove-question">Delete this Question</button>
    `;
  
    questionsContainer.appendChild(questionDiv);
  
    // Добавляем обработчик события для кнопки удаления
    questionDiv.querySelector('.remove-question').addEventListener('click', function() {
      questionsContainer.removeChild(questionDiv);
    });
  });
  
  document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Получаем название и описание викторины
    const quizTitle = document.getElementById('quiz-title').value;
    const quizDescription = document.getElementById('quiz-description').value;
  
    // Получаем все вопросы и ответы
    const questions = [];
    const questionDivs = document.querySelectorAll('.question');
  
    questionDivs.forEach(questionDiv => {
      const questionText = questionDiv.querySelector('input[type="text"]').value;
      const answers = Array.from(questionDiv.querySelectorAll('.answer input[type="text"]')).map(input => input.value);
  
      questions.push({
        question: questionText,
        answers: answers
      });
    });
  
    // Выводим данные в консоль (или обрабатываем их по вашему усмотрению)
    console.log({
      title: quizTitle,
      description: quizDescription,
      questions: questions
    });
  
    alert('Викторина сохранена! Проверьте консоль для данных.');
  });