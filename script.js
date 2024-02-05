let input = document.querySelector(".input-title");

let btn = document.querySelector(".add-btn");

let todo = document.querySelector(".todo");

let listToAdd = [];

if (localStorage.getItem("newitem")) {
  listToAdd = JSON.parse(localStorage.getItem("newitem"));
  Add();
}

btn.addEventListener("click", () => {
  let newList = {
    todo: input.value,
    checked: false,
  };

  listToAdd.push(newList);

  input.value = "";
  Add();

  localStorage.setItem("newitem", JSON.stringify(listToAdd));
});

function Add() {
  let newitem = "";
  listToAdd.forEach(function (item, i) {
    newitem += `
      <li>
      <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}/>
      <label for="item_${i}">${item.todo}</label>
      </li>
      <button class="delBtn" data-action="del">Delete</button>
      `;
    todo.innerHTML = newitem;
  });
}

todo.addEventListener("change", function (event) {
  let id = event.target.getAttribute("id");

  let label = todo.querySelector("[for=" + id + "]");

  let labelValue = label.innerHTML;

  listToAdd.forEach(function (item) {
    if (item.todo === labelValue) {
      item.checked = !item.checked;
      localStorage.setItem("newitem", JSON.stringify(listToAdd));
    }
  });
});

todo.addEventListener("click", function (event) {
  listToAdd.forEach(function (item, i) {
    if (item.todo === event.target.innerHTML) {
      listToAdd.splice(i, 1);
    }
  });
  localStorage.setItem("newitem", JSON.stringify(listToAdd));
  document.location.reload();
});
