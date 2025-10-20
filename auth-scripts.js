// References to elements
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const signupMessage = document.getElementById('signup-message');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginMessage = document.getElementById('login-message');

const logoutSection = document.getElementById('logout-section');
const logoutBtn = document.getElementById('logout-btn');
const welcomeMessage = document.getElementById('welcome-message');

// SIGN UP
signupBtn.addEventListener('click', () => {
  const email = signupEmail.value;
  const password = signupPassword.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      signupMessage.textContent = "Sign up successful!";
      signupEmail.value = "";
      signupPassword.value = "";
      console.log(userCredential.user);
    })
    .catch(error => {
      signupMessage.textContent = error.message;
    });
});

// LOGIN
loginBtn.addEventListener('click', () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      loginMessage.textContent = "Login successful!";
      loginEmail.value = "";
      loginPassword.value = "";
      console.log(userCredential.user);
    })
    .catch(error => {
      loginMessage.textContent = error.message;
    });
});

// LOGOUT
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    logoutSection.style.display = "none";
  });
});

// AUTH STATE CHANGE
auth.onAuthStateChanged(user => {
  if (user) {
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    logoutSection.style.display = "block";
    welcomeMessage.textContent = `Welcome, ${user.email}`;
  } else {
    logoutSection.style.display = "none";
    signupForm.style.display = "block";
    loginForm.style.display = "block";
  }
});
