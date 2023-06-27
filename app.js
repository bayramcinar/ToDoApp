var content = document.querySelector("#content");
var enter = document.querySelector("#enter");
var contentText = document.querySelector("#contentText");
var enter = document.querySelector("#enter");


var savedBoxes = JSON.parse(localStorage.getItem("savedBoxes")) || [];

document.querySelector("#enter").addEventListener("click", function () {
  var content = document.querySelector("#content").value;

  if(content == ""){
    alert("ENTER A VALID CONTENT");
  }else{
    var newBox = {
        content: content,
        id: generateUniqueId()
    };
  }
  

  createNewDoBox(newBox);
  savedBoxes.push(newBox);
  localStorage.setItem("savedBoxes", JSON.stringify(savedBoxes));

  document.querySelector("#content").value = "";
});

if (savedBoxes.length > 0) {
  savedBoxes.forEach(function (box) {
    createNewDoBox(box);
  });
}

function createNewDoBox(box) {
  var yeniDiv = document.createElement("div");
  yeniDiv.className = "row";

  var baslik = document.createElement("h2");
  baslik.id = "contentText";
  baslik.textContent = box.content;
  baslik.style.color = "#001C30";
  baslik.style.paddingLeft = "15px";

  var col8Div = document.createElement("div");
  col8Div.className = "col-7";
  col8Div.appendChild(baslik);
  yeniDiv.appendChild(col8Div);

  var ulElement = document.createElement("ul");
  ulElement.style.display = "flex";
  ulElement.style.listStyle = "none";
  ulElement.style.padding = "0";
  ulElement.style.alignItems = "center";
  ulElement.style.justifyContent = "center";
  ulElement.style.marginTop = "20px";
  var liElements = ["fa-pen-to-square fa-beat ", "fa-trash fa-bounce", "fa-check fa-beat-fade"];

  liElements.forEach(function (className) {
    var liElement = document.createElement("li");
    var iElement = document.createElement("i");
    iElement.style.marginRight = "10px";
    iElement.className = "fa-solid " + className;
    liElement.appendChild(iElement);
    ulElement.appendChild(liElement);
  });

  var col4Div = document.createElement("div");
  col4Div.className = "col-5";
  col4Div.appendChild(ulElement);
  yeniDiv.appendChild(col4Div);

  var doBoxDiv = document.createElement("div");
  doBoxDiv.className = "doBox animate__animated animate__bounceInUp";
  doBoxDiv.id = box.id;
  doBoxDiv.appendChild(yeniDiv);

  doBoxDiv.style.borderRadius = "10px !important";
  doBoxDiv.style.width = "350px !important";
  doBoxDiv.style.height = "auto !important";
  doBoxDiv.style.backgroundColor = "#FFEADD !important";
  doBoxDiv.style.marginBottom = "30px !important";
  doBoxDiv.style.marginLeft = "auto !important";
  doBoxDiv.style.marginRight = "auto !important";

  var liste = document.querySelector(".liste");
  liste.insertBefore(doBoxDiv, liste.firstChild);

  var page1 = document.getElementById("1");
  var page2 = document.getElementById("2");
  var page3 = document.getElementById("3");

  var numberDoBoxPage1 = page1.querySelectorAll(".doBox");
  var numberDoBoxPage2 = page2.querySelectorAll(".doBox");
  var numberDoBoxPage3 = page3.querySelectorAll(".doBox");

  if (numberDoBoxPage1.length >= 5) {
    var lastDoBoxPage1 = page1.lastElementChild;
    page1.removeChild(lastDoBoxPage1);
    page2.insertBefore(lastDoBoxPage1, page2.firstChild);
  } else if (numberDoBoxPage1.length < 4 && numberDoBoxPage2.length > 0) {
    var firstDoBoxPage2 = page2.firstElementChild;
    page2.removeChild(firstDoBoxPage2);
    page1.appendChild(firstDoBoxPage2);
  }

  if (numberDoBoxPage2.length >= 4) {
    var lastDoBoxPage2 = page2.lastElementChild;
    page2.removeChild(lastDoBoxPage2);
    page3.insertBefore(lastDoBoxPage2, page3.firstChild);
  }

  var deleteBox = doBoxDiv.querySelector(".fa-trash");
  deleteBox.addEventListener("click", function () {
    var rowElement = this.closest(".doBox");
    rowElement.parentNode.removeChild(rowElement);
    removeBoxFromStorage(rowElement.id);
  });

  var editBox = doBoxDiv.querySelector(".fa-pen-to-square");
  var saveButton = document.querySelector("#save");
  editBox.addEventListener("click", function () {
    enter.style.display = "none";
    saveButton.style.display = "block";
    var contentText = this.closest(".row").querySelector("#contentText");
    content.value = contentText.textContent;

    saveButton.addEventListener("click", function () {
      contentText.textContent = content.value;
      content.value = "";
      enter.style.display = "block";
      saveButton.style.display = "none";
      updateBoxInStorage(doBoxDiv.id, contentText.textContent);
    });
  });

    var doneButton = doBoxDiv.querySelector(".fa-check");
    doneButton.addEventListener("click", function () {
        var contentText = this.closest(".row").querySelector("#contentText");
        contentText.style.textDecoration = "line-through";
        updateBoxInStorage(doBoxDiv.id, contentText.textContent);
    });
  
  
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function removeBoxFromStorage(id) {
  savedBoxes = savedBoxes.filter(function (box) {
    return box.id !== id;
  });
  localStorage.setItem("savedBoxes", JSON.stringify(savedBoxes));
}
window.addEventListener("DOMContentLoaded", function () {
    loadSavedBoxes();
});

function updateBoxInStorage(id, content) {
    var savedBoxes = JSON.parse(localStorage.getItem("savedBoxes")) || [];
    savedBoxes.forEach(function (box) {
        if (box.id === id) {
            box.content = content;
            box.completed = true; // Tamamlandı olarak işaretleyin
        }
    });
    localStorage.setItem("savedBoxes", JSON.stringify(savedBoxes));
}

function loadSavedBoxes() {
    var savedBoxes = JSON.parse(localStorage.getItem("savedBoxes")) || [];
    savedBoxes.forEach(function (box) {
        if (box.completed) {
            var contentText = document.getElementById(box.id).querySelector("#contentText");
            contentText.style.textDecoration = "line-through";
        }
    });
}
  