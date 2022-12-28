let username = document.querySelector("#username");
let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");
let email = document.querySelector("#email");
let clearBtn = document.querySelector("#clear");
let sendBtn = document.querySelector("#send");
let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector("#close");
let popupContainer = document.querySelector(".popup-container");

let errorText = document.querySelectorAll(".error-text");

let inputs = [username, password, password2, email];

clearBtn.addEventListener("click", (event) => {
    event.preventDefault();

    inputs.forEach((e) => {
        e.value = "";
        clearError(e);
    });
});

sendBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // funkcja sprawdzająca czy cokolwiek jest wpisane w każdym inpucie
    checkForm(inputs);
    // funkcja sprawdzająca, czy w input jest wpisana odpowiednia ilośc znaków
    // - min. 3 znaki w inpucie "username"
    checkName(username, 3);
    // - min. 8 znaków w inpucie "password"
    checkName(password, 8);
    // funkcja sprawdzająca, czy powtórzone hasło jest identyczne jak pierwsze
    checkPassword(password, password2);
    // funkcja sprawdzająca, czy email jest poprawny
    checkEmail(email);

    // funkcja wyświetlająca popup pod warunkiem, że liczba błędów (liczba klas error w DOM) jest równa 0
    checkErrors();
});

function showError(input, msg) {
    const formBox = input.parentElement;
    console.log(formBox);

    const errorMsg = formBox.querySelector(".error-text");
    formBox.classList.add("error");
    errorMsg.textContent = msg;
}

function clearError(input) {
    const formBox = input.parentElement;
    console.log(formBox);

    const errorMsg = formBox.querySelector(".error-text");
    formBox.classList.remove("error");
    errorMsg.textContent = "";
}

function checkForm(input) {
    input.forEach((e) => {
        if (e.value === "") {
            showError(e, e.placeholder);
        } else {
            clearError(e);
        }
    });
}

// funkcja sprawdzająca, czy nazwa ma min. 3 znaki
function checkName(input, min) {
    if (input.value.length < min) {
        showError(
            input,
            `Tekst za krótki. ${input.previousElementSibling.innerHTML.replace(
                ":",
                ""
            )} musi składać się z min. ${min} znaków.`
        );
    } else {
        clearError(input);
    }
}

function checkPassword(somePass1, somePass2) {
    if (somePass1.value !== somePass2.value) {
        showError(somePass2, "Hasła nie zgadzają się!");
    } else {
        clearError(somePass2);
    }
}

function checkEmail(input) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;

    if (re.test(input.value)) {
        clearError(input);
    } else {
        showError(input, `Email niepoprawny.`);
    }
}

function checkErrors() {
    const allInputs = document.querySelectorAll(".error");
    let errorCount = 0;

    allInputs.forEach((e) => {
        if (e.classList.contains("error")) {
            errorCount++;
        }
    });

    console.log("errorcounts: " + errorCount);

    if (errorCount === 0) {
        popup.classList.add("show-popup");

        //tylko do blurowania
        popupContainer.style.display = "block";
    }
}

popupCloseBtn.addEventListener("click", () => {
    popup.classList.remove("show-popup");
    popupContainer.style.display = "none";
});

// Z tym zadaniem też umiem sobie poradzić ;)
