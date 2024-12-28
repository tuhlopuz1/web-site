const button = document.getElementById('button');
const text = document.getElementById('text');
const input = document.getElementById('input');
function buttonclick(){
    console.log(123);
    numb = input.value;
    fetch('http://localhost:5000/'+numb)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json(); // Преобразуем ответ в JSON
    })
    .then(data => {
        console.log(data); // Обрабатываем полученные данные
        text.innerText = data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}