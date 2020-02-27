// app.js

document
  .getElementById("show-food-button")
  .addEventListener("click", function() {
    const value = document.getElementById("show-food-input").value
    const alert = document.getElementById("food-alert")

    getFoodData().then(data => {
      const foundFood = data.find(
        f => f.name.toLowerCase() === value.toLowerCase()
      )

      if (foundFood) {
        alert.classList.add("alert-success")
        alert.classList.remove("alert-danger")
        alert.innerHTML = `<h3>${foundFood.name} har</h3>  
                                    <ul>
                                        <li>${foundFood.kcal} kalorier</li>
                                        <li>${foundFood.fat} gram fedt</li>
                                    </ul>`
      } else {
        alert.classList.add("alert-danger")
        alert.classList.remove("alert-success")
        alert.innerHTML = "Fødevaren kan ikke findes"
      }
    })
  })

async function getFoodData() {
  const response = await fetch("data.json")
  return await response.json()
}
