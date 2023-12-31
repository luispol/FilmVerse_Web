//Funcion que hara posible mostrar los datos de los usuarios
function toggleAccountInfo() {
    const accountInfo = document.querySelector('.account-info');
    const notificationContent = document.querySelector('.notification-content');
    // Cerrar el contenido de notificaciones si está abierto
    if (notificationContent.classList.contains('visible')) {
      notificationContent.classList.remove('visible');
    }
    // Alternar la visibilidad del contenido de la cuenta
    accountInfo.classList.toggle('visible');
  }
  
  
  // Logica para boton de mostrar informacion de notificaciones
  function toggleNotificationContent() {
    const accountInfo = document.querySelector('.account-info');
    const notificationContent = document.querySelector('.notification-content');
  
    // Cerrar el contenido de la cuenta si está abierto
    if (accountInfo.classList.contains('visible')) {
      accountInfo.classList.remove('visible');
    }
  
    // Alternar la visibilidad del contenido de notificaciones
    notificationContent.classList.toggle('visible');
  }

  



//Variables
const formNuevaPelicula = document.querySelector("#formNuevaPelicula")
let token



//Eventos
document.addEventListener("DOMContentLoaded", cargarDatosUsuario)
document.addEventListener("DOMContentLoaded",cargarDatos)
formNuevaPelicula.addEventListener("submit",guardar)

//Funciones
function cargarDatos(){
    token = localStorage.getItem("token")
    if (!token){
        location.href="login.html"
    }
}

function guardar(event){
  event.preventDefault()
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //Validacion para guardar un vector en los genero
  const genresInput = document.querySelector("#genres");
  const genres = genresInput.value.split(',').map(genre => genre.trim());
  //Validacion para guardar un vector en los directores
  const directorsInput = document.querySelector("#directors");
  const directors = directorsInput.value.split(',').map(genre => genre.trim());

  const raw = JSON.stringify({
  "title": document.querySelector("#title").value,
  "genres": genres,
  "directors": directors,
  "fullplot": document.querySelector("#fullplot").value,
  "year": document.querySelector("#year").value,
  "released": document.querySelector("#released").value,
  "countries": document.querySelector("#countries").value,
  "poster": document.querySelector("#poster").value,
  "rating": document.querySelector("#rating").value,
  "trailer": document.querySelector("#trailer").value
  });

  const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch(`${URL}/movies`, requestOptions)
  .then(response => response.json())
  .then(data => {
      if(!data._id){
          alert(data.msg)
      }else{
          location.href="admin_view.html"
      }
  })
  .catch(error => console.log('error', error));
}


// Cargando datos de usuarios
function cargarDatosUsuario() {
    token = localStorage.getItem("token")
    console.log(token)
    if (!token) {
      location.href = "login.html"
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(`${URL}/usuarios/perfil`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let html = ``
  
        html += `
            <div class="name">${data.nombre}</div>
            <div class="category">Admin</div>
            <div class="email">${data.email}</div>
            <div class="logaut"><a onclick="cerrar()">Cerrar Sesion</a></div>
            `
  
        document.querySelector("#usuarioInfo").innerHTML = html
      })
      .catch(error => console.log('error', error));
  }
  function cerrar() {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("tipo")
    location.href = "login.html"
  }