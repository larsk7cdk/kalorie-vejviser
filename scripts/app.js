// app.js
$(function () {
  const searchInput = document.getElementById('search-input')

  jQuery.validator.addMethod(
    'numberNotAllowed',
    function (value, element) {
      return isNaN(value)
    },
    'Må ikke være et tal!'
  )

  $('#search-form').validate({
    errorClass: 'invalid',
    rules: {
      search_input: {
        required: true,
        minlength: 2,
        numberNotAllowed: true
      }
    },
    messages: {
      lastname: 'Please enter your lastname',
      search_input: {
        required: 'Feltet skal være udfyldt!',
        minlength: 'Din indtastning skal være på minimum 2 karakterer!'
      }
    },
    submitHandler: function (form) {
      form.preventDefault

      Promise.all([
        findAndRenderFood('#food-table', searchInput.value),
        findAndRenderMenu('#menu-table', searchInput.value)
      ]).then(function (values) {
        const hasFood = values[0]
        const hasMenu = values[1]

        if (hasFood || hasMenu) {
          $('#no-result').addClass('hide')
        } else {
          $('#no-result').removeClass('hide')
        }
      })
    }
  })
})

function findAndRenderFood (table, input) {
  return getFoodData().then(data => {
    deleteTableRows($(table))

    const foundFood = data.find(
      f => f.name.toLowerCase() === input.toLowerCase()
    )

    if (foundFood) {
      $(table)
        .removeClass('hide')
        .find('tbody')
        .append(
          $('<tr>')
            .append($('<th scope="row">').text(`${foundFood.name}`))
            .append($('<td>').text(`${foundFood.kcal}`))
            .append($('<td>').text(`${foundFood.fat} gr.`))
        )
      return true
    } else {
      $(table).addClass('hide')
      return false
    }
  })
}

function findAndRenderMenu (table, input) {
  getFoodData().then(data => {
    deleteTableRows($(table))

    const foundFood = data.find(
      f => f.name.toLowerCase() === input.toLowerCase()
    )

    if (foundFood) {
      $(table)
        .removeClass('hide')
        .find('tbody')
        .append(
          $('<tr>').append($('<th scope="row">').text(`${foundFood.name}`))
        )
    } else {
      $(table).addClass('hide')
    }
  })
}

async function getFoodData () {
  const response = await fetch('food-data.json')
  return await response.json()
}

async function getMenuData () {
  const response = await fetch('menu-data.json')
  return await response.json()
}

function deleteTableRows (table) {
  $(table)
    .find('tbody')
    .each(function () {
      $('tr', this).remove()
    })
}
