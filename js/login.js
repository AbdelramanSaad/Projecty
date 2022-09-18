let email = document.getElementById('email');
let password = document.getElementById('password');
let signIn = document.getElementById('signIn');
let username = document.getElementById('username');

password.oninput=(e)=>{
    if(e.target.value.match(/^[0-9a-zA-Z]{8,}/))
    {
        password.className="form-control is-valid"
    }
    else
    {
        password.className="form-control is-invalid"
    }

}
email.oninput=(e)=>{
    if(e.target.value.match(/^[a-z.A-Z0-9]+@+[a-z]+.+["com"|"net"]/))
    {
        email.className="form-control is-valid"
    }
    else
    {
        email.className="form-control is-invalid"
    }

}
signIn.addEventListener('click', function (e) {
    e.preventDefault();
    if (email.value == "" && password.value == "") {
        alert("Please enter a Data");
    }
    else {
        checkExist();
    }
})

var x;
var login_users = JSON.parse(localStorage.getItem('AddUsers'));

function checkExist() {
    for (var i = 0; i < login_users.length; i++) {
        if (login_users[i].email=email.value && login_users[i].password == password.value) {
            x = i;
            setTimeout(() => {
                location.href = "index.html?num=" + x;
            }, 1000);
        }
    }
}
