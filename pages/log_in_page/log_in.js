const button = document.getElementById('button');
const login = document.getElementById('login');
const password = document.getElementById('password');



function buttonclick(){
    console.log('тык');
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