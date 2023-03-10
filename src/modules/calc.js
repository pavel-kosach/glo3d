const calc = (price = 100) => {
  const calcInputs = document.querySelectorAll("input.calc-item");
  const messageInputs = document.querySelectorAll("input[placeholder='Ваше сообщение']");
  const textInputs = document.querySelectorAll("input[name=user_name]");
  const emailInputs = document.querySelectorAll("input[type=email]");
  const phoneInputs = document.querySelectorAll("input[type=tel]");

  const calcBlock = document.querySelector(".calc-block");
  const calcType = document.querySelector(".calc-type");
  const calcSquare = document.querySelector(".calc-square");
  const calcCount = document.querySelector(".calc-count");
  const calcDay = document.querySelector(".calc-day");
  const total = document.getElementById("total");

  // В калькуляторе разрешить ввод только цифр
  calcInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D+/g, "");
    });
  });

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

  // Калькулятор
  const countCalc = () => {
    const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
    const calcSquareValue = calcSquare.value;

    let totalValue = 0;
    let countCalcValue = 1;
    let calcDayValue = 1;

    if (calcCount.value > 1) {
      countCalcValue += +calcCount.value / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      calcDayValue = 2;
    } else if (calcDay.value && calcDay.value < 10) {
      calcDayValue = 1.5;
    }

    if (calcType.value && calcSquare.value) {
      totalValue = price * calcTypeValue * calcSquareValue * countCalcValue * calcDayValue;
    } else {
      totalValue = 0;
    }

    // Анимация калькулятора
    let arr = [];
    for (let i = 0; i < totalValue; i++) {
      arr.push(i);
    }
    arr.forEach(function (element, i) {
      setTimeout(function () {
        total.textContent = i;
      }, 5 * ++i);
    });
  };

  calcBlock.addEventListener("input", (e) => {
    if (
      e.target === calcType ||
      e.target === calcSquare ||
      e.target === calcCount ||
      e.target === calcDay
    ) {
      countCalc();
    }
  });
};

export default calc;
