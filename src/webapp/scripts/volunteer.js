const button = document.getElementById("submit")

button.addEventListener("click", filterTasks);

function filterTasks() {
  const rows = document.getElementsByClassName("task_data")
  const garden = document.getElementById("garden").value.toLowerCase()
  const zipcode = document.getElementById("zipcode_input").value
  const city = document.getElementById("city_input").value.toLowerCase()
  const state = document.getElementById("state_input").value.toLowerCase()
 
  const status = (function() {
    const radio = document.getElementsByClassName("radio");

    for(i = 0; i < radio.length; i++) {
      if(radio[i].checked)
        return radio[i].value.toLowerCase();
    }
  })()
 
  // console.log(garden)
  // console.log(zipcode)
  // console.log(city)
  // console.log(state)
  // console.log(status)

  for(i = 0; i < rows.length; i++) {
    rows[i].style.display = ''

    if(garden.length > 0) {
      if(rows[i].children[1].innerHTML.toLowerCase() != garden){
        rows[i].style.display = "none"
      }
    }

    if(status != "all") {
      const cell = rows[i].children[4].innerHTML.toLowerCase()
      if(status == "current") {
        if (cell != "open" && cell != "claimed") {
          rows[i].style.display = "none"
        }
      } else { 
        if (cell != status){
          rows[i].style.display = "none"
        }
      }
    }
  }
}