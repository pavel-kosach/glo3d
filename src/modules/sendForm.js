const sendForm = ({ formId, someElem = [] }) => {
  const form = document.getElementById(formId);
  const statusBlock = document.createElement("div");
  const loadText = "Загрузка";
  const successText = "Успешно отпрвлено";
  const errorText = "Ошибка";
  const messageInputs = document.querySelectorAll("input[placeholder='Ваше сообщение']");
  const textInputs = document.querySelectorAll("input[name=user_name]");
  const emailInputs = document.querySelectorAll("input[type=email]");
  const phoneInputs = document.querySelectorAll("input[type=tel]");

  const name_input = form.querySelector("input[name=user_name]");
  const phone_input = form.querySelector("input[type=tel]");

  // В поля ввода type=text и placeholder="Ваше сообщение" позволить ввод только кириллицы в любом регистре, дефиса и пробела.
  messageInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^а-яА-я\s-]/gi, "");
    });
  });
  textInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^а-яА-я\s-]/gi, "");
    });
  });
  // В поля ввода type=email позволить ввод только  латиницы в любом регистре, цифры и спецсимволы:  @  -  _  . ! ~ * '
  emailInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^a-z-@_\.!'0-9~*]/gi, "");
    });
  });
  // В поля ввода type=tel позволить ввод только цифр, круглых скобок и дефис
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9()-]/g, "");
    });
  });

  const validate = (list) => {
    let success = true;

    if (name_input.value.length < 2) {
      name_input.style.border = "1px solid red";
    } else {
      name_input.classList.add("success");
      name_input.style.border = "";
    }
    if (phone_input.value.length < 6) {
      phone_input.style.border = "1px solid red";
    } else {
      phone_input.classList.add("success");
      phone_input.style.border = "";
    }

    list.forEach((input) => {
      if (
        (!input.classList.contains("success") && input.classList.contains("form-name")) ||
        (!input.classList.contains("success") && input.classList.contains("form-phone"))
      ) {
        success = false;
      }
    });
    console.log(success);
    return success;
  };

  const sendData = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  };

  const submitForm = () => {
    const formElements = form.querySelectorAll("input");
    const formData = new FormData(form);
    const formBody = {};

    statusBlock.textContent = loadText;
    form.append(statusBlock);
    statusBlock.style.color = "white";

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    someElem.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (elem.type === "block") {
        formBody[elem.id] = element.textContent;
      } else if (elem.type === "input") {
        formBody[elem.id] = element.value;
      }
    });

    if (validate(formElements)) {
      sendData(formBody)
        .then((data) => {
          statusBlock.textContent = successText;
          name_input.classList.remove("success");
          phone_input.classList.remove("success");
          formElements.forEach((input) => {
            input.value = "";
          });
        })
        .catch((error) => {
          statusBlock.textContent = errorText;
        });
    } else {
      statusBlock.textContent = errorText;
    }
  };

  try {
    if (!form) {
      throw new Error("Верните форму");
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm();
    });
  } catch (error) {
    console.log(error.message);
  }
};
export default sendForm;
