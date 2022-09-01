const calculations = [];

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  findBMI();
});

function findBMI() {
  const errors = validateForm();
  const isValidated =
    Object.entries(errors).every(([field, message]) => message == undefined) ||
    Object.keys(errors).length === 0;
  if (isValidated) {
    console.log("validated");
    const user = {
      name: form.elements.user_name.value,
      height: Number(form.elements.user_height.value),
      weight: Number(form.elements.user_weight.value),
    };
    user.bmi = calculateBMI(user.height, user.weight);
    clearForm();
    calculations.push(user);
    console.log(calculations);
    displayBMI(user.bmi);
  } else {
    displayErrors(errors);
  }
}

function validateForm() {
  const error = {};
  const stringRegEx = new RegExp("^[a-zA-Z]+$");
  const numberRegEx = new RegExp("^[0-9]+$");

  if (form.elements.user_name.value == "") {
    error.user_name = "Please enter your name";
  } else if (!form.elements.user_name.value.match(stringRegEx)) {
    error.user_name = "Name should only consist of letters";
  } else {
    error.user_name = undefined;
  }

  if (form.elements.user_height.value == "") {
    error.user_height = "Please enter your height";
  } else if (!form.elements.user_height.value.match(numberRegEx)) {
    error.user_height = "Height should only consist of digits";
  } else {
    error.user_height = undefined;
  }

  if (form.elements.user_weight.value == "") {
    error.user_weight = "Please enter your height";
  } else if (!form.elements.user_weight.value.match(numberRegEx)) {
    error.user_weight = "Weight should only consist of digits";
  } else {
    error.user_weight = undefined;
  }

  return error;
}

function calculateBMI(height, weight) {
  return ((weight / height / height) * 10000).toFixed(1);
}

function displayBMI(bmi) {
  document.querySelector(".result_field").style.display = "block";
  document.querySelector("#user_bmi").value = bmi;
  document.querySelector(".result_field").scrollIntoView({
    behavior: "smooth",
  });
}

function clearForm() {
  console.log("clear form");
  form.querySelectorAll(".error").forEach((elem) => {
    console.log("remove error");
    elem.classList.remove("error");
    elem.querySelector("span.help").textContent = "";
  });
  form.elements.user_name.value = "";
  form.elements.user_height.value = "";
  form.elements.user_weight.value = "";
}

function displayErrors(errors) {
  Object.entries(errors).forEach(displayError);
}

function displayError([field, message]) {
  if (message != undefined) {
    form
      .querySelector(`input[name=${field}]`)
      .closest(".field")
      .classList.add("error");
    form.querySelector(`input[name=${field}] + .help`).textContent = message;
  } else {
    form
      .querySelector(`input[name=${field}]`)
      .closest(".field")
      .classList.remove("error");
    form.querySelector(`input[name=${field}] + .help`).textContent = "";
  }
}
