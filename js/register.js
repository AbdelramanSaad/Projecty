let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let signIn = document.getElementById('signIn');
let id = Math.random(Math.floor(username));

// add the username and email to the localStorage
var login_users = JSON.parse(localStorage.getItem('AddUsers'));
var Users;
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
username.oninput=(e)=>{
    if(e.target.value.match(/^[a-z A-Z]{4,}/))
    {
        username.className="form-control is-valid"
    }
    else
    {
        username.className="form-control is-invalid"
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
function AddUsers(username, email, password) {
    userId = 1 + Math.random() * 0x10000
    userId.toString(16)
    var Users = {
        id: userId,
        role: "user",
        username: username,
        email: email,
        password: password
    }
    var hiStory = JSON.parse(localStorage.getItem("AddUsers")) || [] ;
    hiStory.push(Users);
    localStorage.setItem("AddUsers", JSON.stringify(hiStory));
}

signIn.addEventListener('click', function(e) {
    e.preventDefault();
    if (username.value == "" || email.value == "" || password.value == "") {
        alert("Please enter a valid Data");
    } else {
        if (/[a-zA-Z0-9]+@+[a-z]+.+["com"|"net"]/.test(email.value) && /[a-z]/.test(username)) {
            AddUsers(username.value, email.value, password.value);
            setTimeout(() => {
                window.location = "login.html";
            }, 1000);
        } else {
            alert("Please enter a Right Data");
        }
    }
});