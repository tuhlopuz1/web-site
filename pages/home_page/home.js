document.getElementById('user-button').addEventListener('click', () => {
  const dropdown = document.getElementById('dropdown-menu');
  dropdown.classList.toggle('hidden');
});

function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}


window.onload = function() {
  hideLoader(); // Скрыть загрузчик после загрузки страницы
};
