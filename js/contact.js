const contactForm = document.getElementById("contact-form");
const fullNameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");

fullNameInput.addEventListener("input", () => {
  const fullName = fullNameInput.value.trim();
  const errorText = document.getElementById("fullname-error");
  if (fullName.length === 0 || fullName.split(" ").length < 2) {
    fullNameInput.classList.add("error");
    errorText.textContent = "Please enter your full name";
    errorText.style.display = "block";
  } else {
    fullNameInput.classList.remove("error");
    errorText.style.display = "none";
  }
});

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  const errorText = document.getElementById("email-error");
  if (email.length > 0 && !isValidEmail(email)) {
    emailInput.classList.add("error");
    errorText.textContent = "Please enter a valid email address";
    errorText.style.display = "block";
  } else {
    emailInput.classList.remove("error");
    errorText.style.display = "none";
  }
});

subjectInput.addEventListener("input", () => {
  const subject = subjectInput.value.trim();
  const errorText = document.getElementById("subject-error");
  if (subject.split(" ").length <= 2) {
    subjectInput.classList.add("error");
    errorText.textContent = "Please enter your full message";
    errorText.style.display = "block";
  } else {
    subjectInput.classList.remove("error");
    errorText.style.display = "none";
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Perform form validation
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();

  let isValid = true;

  const fullNameErrorText = document.getElementById("fullname-error");
  const emailErrorText = document.getElementById("email-error");
  const subjectErrorText = document.getElementById("subject-error");

  if (fullName.length === 0 || fullName.split(" ").length < 2) {
    fullNameInput.classList.add("error");
    fullNameErrorText.textContent = "Please enter your full name";
    fullNameErrorText.style.display = "block";
    isValid = false;
  } else {
    fullNameInput.classList.remove("error");
    fullNameErrorText.style.display = "none";
  }

  if (email.length > 0 && !isValidEmail(email)) {
    emailInput.classList.add("error");
    emailErrorText.textContent = "Please enter a valid email address";
    emailErrorText.style.display = "block";
    isValid = false;
  } else {
    emailInput.classList.remove("error");
    emailErrorText.style.display = "none";
  }

  if (subject.split(" ").length <= 2) {
    subjectInput.classList.add("error");
    subjectErrorText.textContent = "Please enter your full message";
    subjectErrorText.style.display = "block";
    isValid = false;
  } else {
    subjectInput.classList.remove("error");
    subjectErrorText.style.display = "none";
  }

  if (isValid) {
    alert(
      "Thank you for your message! You will hear back from me very soon! If it is urgent, call or send a text message to: 98767493😄"
    );
    contactForm.reset();
  }
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
