var loginForm = document.getElementById("form-login");
var registerForm = document.getElementById("form-register");

var loginBtn = document.getElementById("login-btn");
var registerBtn = document.getElementById("register-btn")

if(loginBtn && registerBtn){
loginBtn.addEventListener("click", toggleLoginForm);
registerBtn.addEventListener("click", toggleRegisterForm);
}

function toggleLoginForm() {
    let visibility = loginForm.getAttribute("data-visible");
    if(visibility === "false") {
        loginForm.setAttribute("data-visible", true);
        loginBtn.innerText = "Cancel";
        registerBtn.style.display = "none";
    } else if (visibility === "true") {
        loginForm.setAttribute("data-visible", false);
        loginBtn.innerText = "Login";
        registerBtn.style.display = "block";

 
    }

}

function toggleRegisterForm() {
    let visibility = registerForm.getAttribute("data-visible");
    if(visibility === "false") {
        registerForm.setAttribute("data-visible", true);
        registerBtn.innerText = "Cancel";
        loginBtn.style.display = "none";
    } else if (visibility === "true") {
        registerForm.setAttribute("data-visible", false); 
        registerBtn.innerText = "Register";
        loginBtn.style.display = "block";
    }

}


