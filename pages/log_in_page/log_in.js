const button = document.getElementById('submit_button');
const login = document.getElementById('login');
const password = document.getElementById('password');
const message = document.getElementById('message');


function buttonclick(){
    
    
    console.log('кнопка нажата');
    let res_data = [];
    log_or_not = login.value;
    if (log_or_not.includes("@")){
        fetch('http://localhost:5000/get-user-by-email/'+log_or_not)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            
            res_data = data
            log_in(res_data);
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
            
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            
            res_data = data
            log_in(res_data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


        


    }




}


function log_in(data){
    console.log(data);
    
    if (Array.isArray(data) && data.length === 0){
        message.innerText = 'Неправильный логин или пароль';
        return 0;
    }
    pd = data[0]['password']
    console.log(pd);
    console.log(password.value)
    if (pd == password.value){
        message.innerText = 'Успешный вход';
    }
    else{
        message.innerText = 'Неправильный логин или пароль';
    }
}