const button = document.getElementById('button');
const message = document.getElementById('message');
const input = document.getElementById('input');
function buttonclick(){
    code = localStorage.getItem('cur_ver_code')
    console.log(code)
    
    console.log(input.value)
    if (!(input.value.toString() === code.toString())){
        message.innerText = 'Wrong verification code';
        return 0;
    }
    else{
        password = localStorage.getItem('password');
        login = localStorage.getItem('login');
        email = localStorage.getItem('ver_email');
        const url = 'http://localhost:5000/register-new-user'; // URL вашего API
        const data = {
            'email': email,
            'password': password,
            'login': login
        }
        
        fetch(url, {
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json' // Указываем тип содержимого
            },
            body: JSON.stringify(data) // Преобразуем объект в JSON-строку
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            localStorage.setItem('username', login);
            window.location.href = '../home_page/home.html'
        })
        .catch(error => {
            console.error('Error:', error); // Обработка ошибок
        });
    }
}