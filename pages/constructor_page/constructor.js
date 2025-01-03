document.getElementById('add-question').addEventListener('click', function() {
  const questionsContainer = document.getElementById('questions-container');
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  questionDiv.innerHTML = `
    <div class="form-group">
      <label>Вопрос:</label>
      <input type="text" required>
    </div>
    <div class="form-group">
      <label>Изображение (опционально):</label>
      <input type="file" accept="image/*">
      <img src="" alt="Preview" class="image-preview" style="display: none; max-width: 100%; margin-top: 10px;">
      <button type="button" class="remove-image hidden">Удалить изображение</button>
    </div>
    <div class="form-group">
      <label>Варианты ответов:</label>
      <div class="answer">
      <input type="radio" name="correct-answer" value="0" required>
        <input type="text" placeholder="Ответ 1" required>
      </div>
      <div class="answer">
      <input type="radio" name="correct-answer" value="1" required>
        <input type="text" placeholder="Ответ 2" required>
      </div>
      <div class="answer">
      <input type="radio" name="correct-answer" value="2" required>
        <input type="text" placeholder="Ответ 3" required>
      </div>
      <div class="answer">
      <input type="radio" name="correct-answer" value="3" required>
        <input type="text" placeholder="Ответ 4" required>
      </div>
    </div>
    <button type="button" class="remove-question">Удалить этот вопрос</button>
  `;

  questionsContainer.appendChild(questionDiv);

  // Добавляем обработчик события для загрузки изображения
  const fileInput = questionDiv.querySelector('input[type="file"]');
  const removeImageButton = questionDiv.querySelector('.remove-image');
  const imagePreview = questionDiv.querySelector('.image-preview');

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        removeImageButton.classList.remove('hidden'); // Показываем кнопку удаления
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = '';
      imagePreview.style.display = 'none';
      removeImageButton.classList.add('hidden'); // Скрываем кнопку удаления, если файл не выбран
    }
  });

  // Обработчик для кнопки удаления изображения
  removeImageButton.addEventListener('click', function() {
    imagePreview.src = '';
    imagePreview.style.display = 'none';
    fileInput.value = '';
    removeImageButton.classList.add('hidden');
  });

  // Добавляем обработчик события для кнопки удаления вопроса
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
    const fileInput = questionDiv.querySelector('input[type="file"]');
    const answers = Array.from(questionDiv.querySelectorAll('.answer input[type="text"]')).map(input => input.value);
    
    // Получаем индекс правильного ответа
    const correctAnswerIndex = Array.from(questionDiv.querySelectorAll('.answer input[type="radio"]'))
      .findIndex(radio => radio.checked);

    // Получаем файл изображения
    const imageFile = fileInput.files[0];

    questions.push({
      question: questionText,
      image: imageFile, // Сохраняем файл изображения
      answers: answers,
      correctAnswer: correctAnswerIndex // Сохраняем индекс правильного ответа
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

function upload_image(file){
  const name = generate_file_name();

}

function generate_file_name() {
  let result = '';
  for (let i = 0; i < 40; i++) {
      result += Math.floor(Math.random() * 10); // Генерируем случайную цифру от 0 до 9
  }
  return result;
}