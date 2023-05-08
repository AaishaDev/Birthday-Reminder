
const hide = document.querySelectorAll("[data-hide]");
const loginPopup = document.querySelector("[data-login]");
const signUpPopup = document.querySelector("[data-signUp]");
const sPassword = document.querySelector("#s-password");
const sEmail = document.querySelector("#s-email");
const lPassword = document.querySelector("#l-password");
const lEmail = document.querySelector("#l-email");

const onload=()=>{
const refreshToken = localStorage.getItem('refreshToken');
if(refreshToken) window.location.href ="./main.html"
}
onload()

const  loginRequest =async(user)=>{
  const res = await fetch("http://localhost:8000/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if(res.status === 401){
    alert("Wrong Credentials!!");
    event.target.innerHTML ="Submit"
    return
  }
  const data =await res.json();
 
  localStorage.setItem('accessToken',data.accessToken);
  localStorage.setItem('refreshToken',data.refreshToken);
  const expiresIn = 15 * 60; // 15 minutes in seconds
  const expiryTime = new Date().getTime() + (expiresIn * 1000);
  localStorage.setItem('accessTokenExpire',expiryTime);


  window.location.href = './main.html';

}


const handleLogin =async (event) => {
  event.preventDefault();
 
  if (!lEmail.value || !lPassword.value) {
    alert("Please enter both email and password");
    return;
  }
  event.target.innerHTML = `<span class="loading material-symbols-rounded">
      cycle
      </span>`
 await loginRequest({
      email: lEmail.value,
      password: lPassword.value,
    })
  event.target.innerHTML ="Submit"
};


const handleSignUp = async (event) => {
  event.preventDefault();

 
  if (!sEmail.value || !sPassword.value) {
    alert("Please enter both email and password");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(! emailRegex.test(sEmail.value)){
  alert("Please Enter valid email");
  return
 }

  event.target.innerHTML = `<span class="loading material-symbols-rounded">
      cycle
      </span>`
  const res = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: sEmail.value,
      password: sPassword.value,
    }),
  });
  if(res.status === 409){
    alert("Email already exists");
    event.target.innerHTML ="Submit";
    return
  }
  const data =await res.json();
 
  event.target.innerHTML ="Submit" ;

  if(res.status === 200){
    
    loginRequest({
      email: sEmail.value,
      password: sPassword.value,
    })
  }

  
};


const loginBtnClicked = () => {
  loginPopup.style.display = "flex";
};
const signUpBtnClicked = () => {

  signUpPopup.style.display = "flex";
};
loginPopup.addEventListener("click", (e) => {
  if (e.target.contains(loginPopup)) {
    loginPopup.style.display = "none";
    signUpPopup.style.display = "none";
    lEmail.value="";
    lPassword.value="";
  }
});

const toggleCard=(event)=>{

  if(event.target.innerHTML === 'Sign Up') {
    loginPopup.style.display = "none";
    signUpPopup.style.display = "flex";
  }
 else{
    
    loginPopup.style.display = "flex";
    signUpPopup.style.display = "none";
  }
}

signUpPopup.addEventListener("click", (e) => {
  if (e.target.contains(signUpPopup)) {
    loginPopup.style.display = "none";
    signUpPopup.style.display = "none";
    sEmail.value="";
    sPassword.value="";
  }
});
hide.forEach((elem) => {
  elem.addEventListener("click", () => {

    loginPopup.click();
    signUpPopup.click();
  });
});




