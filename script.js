//clock //
const watchCont = document.querySelector(".watch-container");
const today = document.querySelector(".today");
const timme = new Date();
const getDeutschDate = timme.toLocaleDateString("de", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const splitDate = getDeutschDate.split(" ");

const todayDate = setTimeout(() => {
  watchCont.innerHTML = `           <div class="today">

<ul class="dashakh">
 <li>${splitDate[2]}</li>
 <li class="days">${splitDate[1]}</li>
 <li>${splitDate[0]}</li>
</ul>
</div>`;
}, 1000);
setTimeout(() => {
  watchCont.innerHTML = "";
}, 4000);

setTimeout(() => {
  watchCont.innerHTML = `<div class="containerr">
<div class="sec"></div>
<div class="min"></div>
<div class="hour"></div>
</div>`;
  let sec = document.querySelector(".sec");
  let min = document.querySelector(".min");
  let hour = document.querySelector(".hour");
  let s = 0;
  let m = 0;
  let h = 0;

  setInterval(clock, 1000);
  let datee = new Date();
  let time = datee.getSeconds();

  function clock() {
    let datee = new Date();
    let ho = (datee.getMinutes() * 6) / 12;
    sec.style.rotate = `${datee.getSeconds() * 6}deg`;
    min.style.rotate = `${datee.getMinutes() * 6}deg`;
    hour.style.rotate = `${datee.getHours() * 30 + ho}deg`;
  }
}, 4000);

// todolist //
const submit = document.querySelector(".todo-form");
const inp = document.querySelector(".inp");
const option = document.querySelector(".opt");
const ul = document.querySelector(".yoal");
let filters = "all";
submit.addEventListener("submit", sub);
function sub(e) {
  e.preventDefault();
  if (!inp.value) {
    return null;
  }
  const obj = {
    date: new Date().toISOString(),
    title: inp.value,
    Id: Date.now(),
    isCompelete: true,
  };

  saveTodo(obj);
  filter();
}

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  fun(todos);
});

function fun(arr) {
  let result = "";
  arr.forEach((s) => {
    result += `<li class="list ${s.isCompelete ? "liii" : "done"}">
<span class="span1 ${s.isCompelete ? "" : "line"}">${s.title}</span
><span class="span2"
><span class="tarikh">${new Date(s.date).toLocaleDateString("de")}</span
><i class="fa-regular fa-pen-to-square edit" data-pw="${
      s.Id
    }"></i><i class="fa-regular fa-circle-check tik ${
      s.isCompelete ? "" : "color"
    }"" data-pw="${s.Id}"></i
><i class="fa-solid fa-trash-can ter" data-pw="${s.Id}"></i
></span>
</li>`;
  });
  ul.innerHTML = result;
  inp.value = "";

  const dele = document.querySelectorAll(".ter");
  dele.forEach((s) => {
    s.addEventListener("click", dlt);
  });
  const complt = document.querySelectorAll(".tik");
  complt.forEach((s) => {
    s.addEventListener("click", done);
  });
  const edit = document.querySelectorAll(".edit");
  edit.forEach((s) => {
    s.addEventListener("click", eddt);
  });
}

option.addEventListener("change", (e) => {
  filters = e.target.value;
  filter();
});
function filter(e) {
  const arr = getAllTodos();
  switch (filters) {
    case "all":
      fun(arr);
      break;
    case "compelete":
      const com = arr.filter((s) => {
        return !s.isCompelete;
      });
      fun(com);
      break;
    case "uncompelete":
      const uncom = arr.filter((s) => {
        return s.isCompelete;
      });
      fun(uncom);
      break;
    default:
      fun(arr);
      break;
  }
}

function dlt(e) {
  let id = e.target.dataset.pw;
  let arr = getAllTodos();
  const deleIndex = arr.findIndex((s) => {
    return s.Id == id;
  });
  arr.splice(deleIndex, 1);
  localStorage.setItem("todos", JSON.stringify(arr));
  filter();
}
function done(e) {
  let id = e.target.dataset.pw;
  let arr = getAllTodos();
  const done = arr.find((s) => {
    return s.Id == id;
  });
  done.isCompelete = !done.isCompelete;
  localStorage.setItem("todos", JSON.stringify(arr));
  filter();
}
const all = document.querySelector(".allcont");
const editInp = document.querySelector(".ali");
let numIndx = 0;
const modul = document.querySelector(".modul");
const edtDone = document
  .querySelector(".btn-ok")
  .addEventListener("click", editt);
const cls = document.querySelector(".close").addEventListener("click", () => {
  modul.classList.toggle("disp");
});

function eddt(e) {
  modul.classList.toggle("disp");

  let allTodos = getAllTodos();
  const tar = e.target.dataset.pw;

  const ed = allTodos.find((s) => {
    return s.Id == tar;
  });
  const finder = allTodos.findIndex((s) => {
    return s.Id == tar;
  });
  numIndx = finder;
  editInp.value = ed.value;
  editInp.value = ed.title;
  localStorage.setItem("todos", JSON.stringify(allTodos));
  filter();
}

function editt() {
  modul.classList.toggle("disp");
  let allTodos = getAllTodos();
  allTodos[numIndx].title = editInp.value;

  localStorage.setItem("todos", JSON.stringify(allTodos));
  filter();
}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
