/// <reference types="../@types/jquery" />
// side memu
function openCloseMenu() {
  if ($("aside .menu-header > i").hasClass("fa-align-justify")) {
    // open
    $("aside .menu-tab").css("left", "0");
    $("aside .menu-header").css("left", "250px");
    $("aside .menu-header > i").attr("class", "fas fa-xmark fa-2x");
    $("aside .menu-tab .links li").css(
      "cssText",
      `top: 0;
   `
    );
  } else {
    // close
    $("aside .menu-tab").css("left", "-250px");
    $("aside .menu-header").css("left", "0");
    $("aside .menu-header > i").attr("class", "fas fa-2xl fa-align-justify");
    $("aside .menu-tab .links li").css(
      "cssText",
      `top: 30px;
    `
    );
  }
}
$("aside .menu-header > i").on("click", () => {
  openCloseMenu();
});
// **************************************************************************************************
// index Data
async function getDataIndex() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  let data = await response.json();
  displayData(data.meals);
}
getDataIndex();

function displayData(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
        <div class="box  position-relative">
        <img src='${arr[i].strMealThumb}' alt="" class="w-100">
        <div class="overlay d-flex align-items-center">
          <h3 class="ps-3">${arr[i].strMeal}</h3>
        </div>
        </div>
        </div>
    `;
  }
  $("#dataContainer").html(cartona);
}

function displayNoData() {
  let cartona = ``;
  $("#dataContainer").html(cartona);
}
function displayNoSearch() {
  let cartona = ``;
  $("#searchContainer").html(cartona);
}
function displayNoContact() {
  let cartona = ``;
  $("#contactWrap").html(cartona);
}

// **************************************************************************************************
// Search
function searchInputs() {
  let cartona = `
  <div class="row gy-4 py-5">
  <div class="col-md-6">
    <input
      type="text"
      class="form-control"
      placeholder="Search By Name"
      id="searchInputName"
    />
  </div>
  <div class="col-md-6">
    <input
      type="text"
      class="form-control"
      placeholder="Search By First Letter"
      id="searchInputLetter"
    />
  </div>
</div>
  `;
  $("#searchContainer").html(cartona);
}
$("#search").on("click", () => {
  searchInputs();
  displayNoData();
  displayNoContact();
  $("#searchInputName").on("input", () => {
    getDataNameSearch();
  });
  $("#searchInputLetter").on("input", () => {
    getMealsL($("#searchInputLetter").val().substring(0, 1));
  });
});
// nameSearch
async function getDataNameSearch() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  let data = await response.json();
  searchDataName(data.meals);
}

function searchDataName(arr) {
  let term = $("#searchInputName").val().toLowerCase();
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].strMeal.toLowerCase().includes(term)) {
      cartona += `
      <div class="col-md-3">
          <div class="box  position-relative">
          <img src='${arr[i].strMealThumb}' alt="" class="w-100">
          <div class="overlay d-flex align-items-center">
            <h3 class="ps-3">${arr[i].strMeal}</h3>
          </div>
          </div>
          </div>
      `;
    }
  }
  $("#dataContainer").html(cartona);
}
// **************************************************************
// letterSearch
async function getMealsL(letter) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await response.json();
  console.log(data.meals);
  searchDataL(data.meals);
}

function searchDataL(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].strMeal
        .toLowerCase()
        .includes($("#searchInputLetter").val().toLowerCase().substring(0, 1))
    ) {
      cartona += `
      <div class="col-md-3">
          <div class="box position-relative">
          <img src='${arr[i].strMealThumb}' alt="" class="w-100">
          <div class="overlay d-flex align-items-center">
            <h3 class="ps-3">${arr[i].strMeal}</h3>
          </div>
          </div>
          </div>
      `;
    }
  }
  $("#dataContainer").html(cartona);
}

// **************************************************************************************************
// catogories
async function getCategoreis() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  let categories = data.categories;
  console.log(categories);
  displayCategories(categories);
}
$("#categories").on("click", () => {
  displayNoSearch();
  displayNoContact();
  getCategoreis();
});

function displayCategories(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3" onclick="getMeals('${arr[i].strCategory}')" >
      <div class="box position-relative">
          <img src="${arr[i].strCategoryThumb}" alt="image" class="w-100">
          <div class="overlay text-center p-3">
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription.substring(0, 100)}</p>
          </div>
      </div>
    </div>
      `;
  }
  $("#dataContainer").html(cartona);
}
async function getMeals(meal) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );
  let data = await response.json();
  let meals = data.meals;
  console.log(meals);
  displayMeals(meals);
}

function displayMeals(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3" >
    <div class="box position-relative">
        <img src="${arr[i].strMealThumb}" alt="image" class="w-100">
        <div class="overlay d-flex flex-column justify-content-center p-3">
            <h3>${arr[i].strMeal}</h3>
        </div>
    </div>
  </div>
    `;
  }
  $("#dataContainer").html(cartona);
}
// **************************************************************************************************
// Areas

async function getAreas() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  console.log(data.meals);
  displayAreas(data.meals);
}

$("#areas").on("click", () => {
  displayNoSearch();
  displayNoContact();
  getAreas();
});

function displayAreas(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3" onclick="getMealsC('${arr[i].strArea}')">
      <div class="box text-white text-center">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].strArea}</h3>
      </div>
    </div>
      `;
  }
  $("#dataContainer").html(cartona);
}

async function getMealsC(country) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
  );
  let data = await response.json();
  let meals = data.meals;
  console.log(meals);
  displayMealsC(meals);
}

function displayMealsC(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3" >
    <div class="box position-relative">
        <img src="${arr[i].strMealThumb}" alt="image" class="w-100">
        <div class="overlay d-flex flex-column justify-content-center p-3">
            <h3>${arr[i].strMeal}</h3>
        </div>
    </div>
  </div>
    `;
  }
  $("#dataContainer").html(cartona);
}
// **************************************************************************************************
// Ingredients

async function getIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  console.log(data.meals);
  displayIngredients(data.meals);
}
$("#ingredients").on("click", () => {
  displayNoSearch();
  displayNoContact();
  getIngredients();
});

function displayIngredients(arr) {
  let cartona = ``;
  for (let i = 0; i < 20; i++) {
    cartona += `
      <div class="col-md-3" onclick="getMealsI('${arr[i].strIngredient}')">
          <div class="box-meal text-center text-white p-3">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${arr[i].strIngredient}</h3>
              <p>${arr[i].strDescription.substring(0, 100)}</p>
          </div>
      </div>
      `;
  }
  $("#dataContainer").html(cartona);
}

async function getMealsI(ingredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  let meals = data.meals;
  console.log(meals);
  displayMealsI(meals);
}

function displayMealsI(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3" >
      <div class="box position-relative">
          <img src="${arr[i].strMealThumb}" alt="image" class="w-100">
          <div class="overlay d-flex flex-column justify-content-center p-3">
              <h3>${arr[i].strMeal}</h3>
          </div>
      </div>
    </div>
      `;
  }
  $("#dataContainer").html(cartona);
}
// **************************************************************************************************
// Contact US

function contactInputs() {
  let cartona = `
  <div class="row gy-4" id="contactContainer">
          <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Enter Your Name  ex: suzan eladl" id="inputName">
          </div>
          <div class="col-md-6">
          <input type="email" class="form-control" placeholder="Enter Your Email" id="inputEmail">
          </div>
          <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Enter Your Phone  ex: 1234567899" id="inputPhone">
          </div>
          <div class="col-md-6">
          <input type="number" class="form-control" placeholder="Enter Your Age  ex: +18" id="inputAge">
          </div>
          <div class="col-md-6">
          <input type="password" class="form-control" placeholder="Enter Your Password  ex: 12345678Aa@ " id="inputPass" >
          <!-- <span>for min 8 letter password, with at least a symbol, upper and lower case letters and a number</span> -->
          </div>
          <div class="col-md-6">
          <input type="password" class="form-control" placeholder="Repassword" id="inputRepass">
          </div>
          
        </div>
        <button class="btn btn-outline-danger mt-4" disabled id="btnSubmit">Submit</button>
  `;
  $("#contactWrap").html(cartona);
}

$("#contactus").on("click", () => {
  displayNoSearch();
  displayNoData();
  contactInputs();
  $("input").on("input", () => {
    if (
      validateName() &&
      validateEmail() &&
      validatePhone() &&
      validateAge() &&
      validatePass() &&
      passEqual()
    ) {
      $("#btnSubmit").removeAttr("disabled");
    }
  });
});

function validateName() {
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (regName.test($("#inputName").val())) {
    return true;
  } else {
    return false;
  }
}
function validateEmail() {
  var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (regEmail.test($("#inputEmail").val())) {
    return true;
  } else {
    return false;
  }
}

function validatePhone() {
  var regPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  if (regPhone.test($("#inputPhone").val())) {
    return true;
  } else {
    return false;
  }
}

function validateAge() {
  var regAge = /^(1[89]|[2-9]\d)$/gm;
  if (regAge.test($("#inputAge").val())) {
    return true;
  } else {
    return false;
  }
}

function validatePass() {
  var regPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (regPass.test($("#inputPass").val())) {
    return true;
  } else {
    return false;
  }
}
function passEqual() {
  if ($("#inputPass").val() === $("#inputRepass").val()) {
    return true;
  } else {
    return false;
  }
}
// **************************************************************************************************
// Loading
$(function () {
  // document ready
  $(".loading").fadeOut(2000, function () {
    $("body").css("overflow", "auto");
  });
});
