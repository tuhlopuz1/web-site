const button = document.getElementById('button');
const login = document.getElementById('login');
const password = document.getElementById('password');



function buttonclick(){
    console.log('тык');
    log_or_not = login.value;
    if (log_or_not.includes("@")){
        fetch('http://localhost:5000/get-user-by-email/'+log_or_not)
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

    } else {
        fetch('http://localhost:5000/get-user-by-login/'+log_or_not)
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




}