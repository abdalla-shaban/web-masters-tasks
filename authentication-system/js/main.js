const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const toggleAuthBtn = document.getElementById("toggle-auth");
const heading = document.getElementById("heading");
const headingDesc = document.getElementById("heading-desc");
const toggleAuthDesc = document.getElementById("toggle-auth-desc");
const confirmPasswordInputBox = document.getElementById(
  "confirmPasswordInputBox"
);
const nameInputBox = document.getElementById("nameInputBox");
const submitBtn = document.querySelector(".main-btn");

let users = [];
let currentPage = "signup";
let currentUser = {};

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}
if (localStorage.getItem("currentUser") !== null) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
}

const handleSignUp = () => {
  const foundUser = users.find((user) => user.email == emailInput.value);
  if (!foundUser) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      emailInput.value !== "" &&
      nameInput.value !== "" &&
      passwordInput.value !== "" &&
      confirmPasswordInput.value === passwordInput.value
    ) {
      if (emailRegex.test(emailInput.value)) {
        const newUser = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          isLoggedIn: false,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        Swal.fire({
          text: "Account Created Successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Sign In ?",
        }).then((result) => {
          if (result.isConfirmed) {
            handleAuthToggle();
          }
        });
      } else {
        Swal.fire({
          text: "Enter Valid Email",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "Try Again",
        });
      }
    } else {
      Swal.fire({
        text: "All Inputs is Required",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Try Again",
      });
    }
  } else {
    console.log("user is already exist");
    Swal.fire({
      text: "user is already exist",
      icon: "error",
      showCancelButton: false,
      confirmButtonText: "Try Again",
    });
  }
};

const handleSignIn = () => {
  const foundUser = users.find(
    (user) =>
      user.email == emailInput.value && user.password == passwordInput.value
  );
  if (foundUser) {
    if (emailInput.value !== "" && passwordInput.value !== "") {
      foundUser.isLoggedIn = true;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      Swal.fire({
        text: "Logged in Successfully!",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Go to Profile",
      }).then((result) => {
        result.isConfirmed
          ? (location.pathname =
              "/web-masters-tasks/authentication-system/profile.html")
          : (location.pathname =
              "/web-masters-tasks/authentication-system/profile.html");
      });
    } else {
      Swal.fire({
        text: "All Inputs Is Required",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Try Again",
      });
    }
  } else {
    Swal.fire({
      text: "Incorrect creadntials",
      icon: "error",
      showCancelButton: false,
      confirmButtonText: "Try Again",
    });
  }
};

const handleAuthToggle = () => {
  if (toggleAuthBtn.innerText.toLowerCase() === "sign up") {
    toggleAuthBtn.innerText = "sign in";
    heading.innerText = "Sign up";
    headingDesc.innerText = "Hello ! let’s join with us.";
    toggleAuthDesc.innerText = "Do you have an account?";
    nameInputBox.style.display = "flex";
    confirmPasswordInputBox.style.display = "flex";
    submitBtn.innerHTML = "Sign Up";
    currentPage = "signup";
  } else {
    toggleAuthBtn.innerText = "sign up";
    heading.innerText = "Welcome Back";
    headingDesc.innerText = "Hey! Good to see you again";
    toggleAuthDesc.innerText = "Don’t have an account?";
    nameInputBox.style.display = "none";
    confirmPasswordInputBox.style.display = "none";
    submitBtn.innerHTML = "Sign in";
    currentPage = "signin";
  }
};

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (currentPage === "signin") {
    handleSignIn();
  } else if (currentPage === "signup") {
    handleSignUp();
  }
});

toggleAuthBtn?.addEventListener("click", handleAuthToggle);

document.getElementById("logout")?.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.pathname = "/web-masters-tasks/authentication-system/index.html";
});

if (location.pathname.includes("profile")) {
  if (!currentUser.isLoggedIn) {
    location.pathname = "/web-masters-tasks/authentication-system/index.html";
  }
  document.getElementById(
    "welcome"
  ).innerText = `Welcome Back , ${currentUser.name}`;
  document.getElementById("userEmail").innerText = currentUser.email;
}
if (location.pathname.includes("index")) {
  if (currentUser.isLoggedIn) {
    location.pathname = "/web-masters-tasks/authentication-system/profile.html";
  }
}
