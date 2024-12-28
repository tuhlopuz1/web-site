const button = document.getElementById('submit_button');
const login = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const message = document.getElementById('message');


function buttonclick(){
    
    if (login.value.includes("@")){
        message.innerText = 'Invalid username'
        return 0;
    }
    if ((!email.value.includes('@')||(!email.value.includes('.')))){
        message.innerText = 'Invalid email'
        return 0;
    }
    if (password.value != confirm_password.value){
        message.innerText = "Passwords don't match"
        return 0;
    }

    fetch('http://localhost:5000/get-user-by-email/'+email.value)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            
            if (!(Array.isArray(data) && data.length === 0)){
                message.innerText = 'Email already in use';
                return 0;
            }
            else{
                check_username(login.value)
            }
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}
function check_username(username){
    fetch('http://localhost:5000/get-user-by-login/'+username)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            
            if (!(Array.isArray(data) && data.length === 0)){
                message.innerText = 'Username already in use';
                return 0;
            }
            else{
                go_to_email_verification(email.value);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function go_to_email_verification(email){
    localStorage.setItem('ver_email', email)
    const url = 'http://localhost:5000/send-verification-email'; // URL вашего API
    const data = email
    console.log(JSON.stringify(data))
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
        console.log('Success:', data); // Обработка успешного ответа
    })
    .catch(error => {
        console.error('Error:', error); // Обработка ошибок
    });
}