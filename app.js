// app.js

const searchButton = document.getElementById("search-button")
const messageAlert = document.getElementById("message-alert")

document
  .getElementById("search-button")
  .addEventListener("click", function(event) {
    event.preventDefault()

    const input = document.getElementById("input")
    const alert = document.getElementById("alert")

    const isValidated = validateInput(input)
    if (!isValidated) return

    findFood(input, alert)
  })

function validate(event) {
  const value = event.target.value

  input.classList.remove("input-danger")
  searchButton.disabled = false
  messageAlert.innerText = ""

  if (!isNaN(value) || value.length === 0) {
    input.classList.add("input-danger")
    searchButton.disabled = true
  }

  if (!isNaN(value) || value.length === 0) {
    messageAlert.innerText = "Værdien må ikke være et tal!"
  }

  if (value.length === 0) {
    messageAlert.innerText = "Værdien skal indeholde mindst 1 karakter!"
  }
}

function validateInput(input) {
  if (!isNaN(input.value) || input.value.length === 0) {
    input.classList.add("input-danger")
    return false
  } else {
    input.classList.remove("input-danger")
    return true
  }
}

function findFood(input, alert) {
  getFoodData().then(data => {
    const foundFood = data.find(
      f => f.name.toLowerCase() === input.value.toLowerCase()
    )

    if (foundFood) {
      alert.classList.add("alert-success")
      alert.classList.remove("alert-danger")
      alert.innerHTML = `<h3>${foundFood.name} har</h3>  
                                  <ul>
                                      <li>${foundFood.kcal} kalorier</li>
                                      <li>${foundFood.fat} gram fedt</li>
                                  </ul>`

      return true
    }

    return false
    if (!foundFood || !foundMenu) {
      alert.classList.add("alert-danger")
      alert.classList.remove("alert-success")
      alert.innerHTML = "Fødevaren kan ikke findes"
    }
  })
}

async function getFoodData() {
  const response = await fetch("food-data.json")
  return await response.json()
}

async function getMenuData() {
  const response = await fetch("menu-data.json")
  return await response.json()
}
