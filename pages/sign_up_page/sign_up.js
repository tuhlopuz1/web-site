const button = document.getElementById('submit_button');
const login = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const message = document.getElementById('message');


function buttonclick(){
    console.log(12312312313123)
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
    check_email = localStorage.getItem('ver_email');
    console.log(check_email , email.value)
    if (check_email != null){
        if (check_email.toString() === email.value.toString()){
            console.log('too many requests for this email');
            message.innerText = 'Too many requests for this email. try a bit later'
            return 0;
        }
    }
    localStorage.setItem('ver_email', email.value)
    
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
    
    const url = 'http://localhost:5000/send-verification-email'; // URL вашего API
    const data = email
    
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
        localStorage.setItem('cur_ver_code', data)
        localStorage.setItem('password', password.value)
        localStorage.setItem('login', login.value)
        window.location.href = '../verification_page/verification.html';
    })
    .catch(error => {
        console.error('Error:', error); // Обработка ошибок
    });
}