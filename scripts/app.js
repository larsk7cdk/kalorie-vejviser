// app.js

// Validation configuration
const VALIDATOR_CONFIG = {
  errorClass: "invalid",
  rules: {
    search_input: {
      required: true,
      minlength: 2,
      numberNotAllowed: true
    }
  },
  messages: {
    search_input: {
      required: "Feltet skal være udfyldt!",
      minlength: "Din indtastning skal være på minimum 2 karakterer!"
    }
  }
}

// Document Ready
$(function() {
  $("#search-form").validate({
    VALIDATOR_CONFIG,
    submitHandler: validatorSubmitHandler
  })
})

// Validation functions
function validatorAddMethods() {
  jQuery.validator.addMethod(
    "numberNotAllowed",
    (value, element) => isNaN(value),
    "Må ikke være et tal!"
  )
}

function validatorSubmitHandler(form) {
  form.preventDefault
  const searchInput = document.getElementById("search-input")

  Promise.all([
    findAndRenderFoodAsync("#food-table", searchInput.value),
    findAndRenderMealAsync("#meal-table", searchInput.value)
  ]).then(function(values) {
    const hasFood = values[0]
    const hasMeal = values[1]

    if (hasFood || hasMeal) {
      $("#no-result").addClass("hide")
    } else {
      $("#no-result").removeClass("hide")
    }
  })
}

// Render functions
async function findAndRenderFoodAsync(table, input) {
  return await getFoodDataAsync().then(data => {
    deleteTableRows($(table))

    const foundFood = data.find(
      f => f.name.toLowerCase() === input.toLowerCase()
    )

    if (foundFood) {
      $(table)
        .removeClass("hide")
        .find("tbody")
        .append(
          $("<tr>")
            .append($('<th scope="row">').text(`${foundFood.name}`))
            .append($("<td>").text(`${foundFood.kcal}`))
            .append($("<td>").text(`${foundFood.fat} gr.`))
        )
      return true
    } else {
      $(table).addClass("hide")
      return false
    }
  })
}

async function findAndRenderMealAsync(table, input) {
  return await getMealDataAsync().then(data => {
    deleteTableRows($(table))

    const foundMeals = data.filter(f =>
      f.meal.toLowerCase().includes(input.toLowerCase())
    )

    if (foundMeals.length > 0) {
      const t = $(table)
        .removeClass("hide")
        .find("tbody")

      for (let index = 0; index < foundMeals.length; index++) {
        t.append($("<tr>").append($("<td>").text(foundMeals[index].meal)))
      }
      return true
    } else {
      $(table).addClass("hide")
      return false
    }
  })
}

// Get data from API functions
async function getFoodDataAsync() {
  const response = await fetch("data/food-data.json")
  return await response.json()
}

async function getMealDataAsync() {
  const response = await fetch("data/meal-data.json")
  return await response.json()
}

// Helper functions
function deleteTableRows(table) {
  $(table)
    .find("tbody")
    .each(function() {
      $("tr", this).remove()
    })
}
