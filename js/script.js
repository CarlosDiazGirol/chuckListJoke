const fetchJoke = document.getElementById("fetchJoke")
const jokeList = document.getElementById("jokeList")


// funcion obtenerdatos

// fetch con promesas
// fetch("https://api.chucknorris.io/jokes/random")
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.log("Este es el error", err))

const getJoke = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random")
    const data = await response.json()
    return data
  } catch(err) {
    console.log("Este es el error", err)
  }
}

//Clicko en el botón para traer los chistes. Paso luego a renderJokes data para la función  
fetchJoke.addEventListener("click", () => {
  getJoke().then(data => {
    const joke = [...loadFromLocalStorage(), data.value]
    saveToLocalStorage(joke)
    renderJokes(joke)
  })
})

// función renderizar
const renderJokes = (jokes) => {
  jokeList.innerHTML = ""
  jokes.forEach((joke, index) => {
    const template = `
      <li>
      <h2>${joke}</h2>
      <button onclick="deleteJoke(${index})">ELIMINAR</button>
      </li>`
    jokeList.innerHTML += template
  })
}

// función grabar localStorage
const saveToLocalStorage = (joke) => {
  localStorage.setItem("chuckNorrisJokes", JSON.stringify(joke))
}

// funcion obtenerdatos localStorage
const loadFromLocalStorage = () => {
  const savedItems = localStorage.getItem("chuckNorrisJokes")
  return savedItems ? JSON.parse(savedItems) : [] 
}

// BONUS BORRAR

const deleteJoke = (indexToDelete) => {
  //Esta es la opción con filter
  const allItems = loadFromLocalStorage()
  const deletedItem = allItems.filter((_, index) => index !== indexToDelete)
  saveToLocalStorage(deletedItem)
  renderJokes(deletedItem)

  //Esta es la opción con splice
  
  // const allItems = loadFromLocalStorage()
  // // const deletedItem = allItems.filter((_, index) => index !== indexToDelete)
  // allItems.splice(indexToDelete, 1)
  // saveToLocalStorage(allItems)
  // renderJokes(allItems)
}

renderJokes(loadFromLocalStorage())