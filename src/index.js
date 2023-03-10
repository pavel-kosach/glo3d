import timer from "./modules/timer";
import menu from "./modules/menu";
import modal from "./modules/modal";
import calc from "./modules/calc";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import sendForm from "./modules/sendForm";

timer("15 march 2023");
menu();
modal();
calc(100);
tabs();
slider();
sendForm({
  formId: "form1",
  someElem: [
    {
      type: "block",
      id: "total",
    },
  ],
});
// sendForm({
//   formId: "form2",
//   someElem: [
//     {
//       type: "block",
//       id: "total",
//     },
//   ],
// });
// sendForm({
//   formId: "form3",
//   someElem: [
//     {
//       type: "block",
//       id: "total",
//     },
//   ],
// });
