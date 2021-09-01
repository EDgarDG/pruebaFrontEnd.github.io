
// const navButton = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".navBar-menu");

// navButton.addEventListener("click", () => {
//     navMenu.classList.toggle("navBar-menu_visible");
// });

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;

navMenu.classList.toggle("nav-menu_visible");
menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("navBar-menu_visible");

    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    }else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});

const menuLinks = document.querySelectorAll('.navBar-menu a[href^="#"]');

menuLinks.forEach(menuLinks => {
    menuLinks.addEventListener("click", function() {
        navMenu.classList.remove("navBar-menu_visible");
    });
});


const cajaInput = document.querySelector("input");
const btnA = document.querySelector("button");
const containerInfoPais = document.querySelector(".container-info-pais");
const containerInfoCovid = document.querySelector(".container-info-covid");
const containerInfoCovid2 = document.querySelector(".container-info-covid2");

const country = document.getElementById('country').value;

// console.log(country);

btnA.addEventListener('click', (e) => {
    e.preventDefault();
    traerInfo(cajaInput.value);
    window.location.reload();
})

var pais2 = country;

// FUNCION PARA ENLAZAR LA CONEXION CON NUESTRA API
function traerInfo(paisAPI) {
    // ES UNA FUNCION QUE TOMA UNA URL EN LA QUE MANDA UN REQUEST AL SERVIDOR
    const url = 
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${paisAPI}`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(typeof data)

        // var obtpa = data.All.country
        // console.log(obtpa)

        if (country == data.All.country) {
    
            console.log("El pais es el mismo");
            // alert("El pais es el mismo");

            containerInfoCovid2.innerHTML += `
            <h1>Casos de COVID-19 en el país</h1>
            
            <p>Total confirmados: ${data.All.confirmed}</p>
            <p>Tolal Recuperados: ${data.All.recovered}</p>
            <p>Tolal Muertes: ${data.All.deaths}</p>
            `

            containerInfoPais.innerHTML += `
            <h1>Información del país</h1>
            
            <p>País: ${data.All.country}</p>
            <p>Capital: ${data.All.capital_city}</p>
            <p>Continente: ${data.All.continent}</p>
            <p>Locación: ${data.All.location}</p>
            `
            containerInfoCovid.innerHTML += `
            <h1>Casos de COVID-19 en el país</h1>

            <table class="tabla-covid">
                <thead>
                    <tr>
                        <th>Total confirmados</th>
                        <th>Tolal Recuperados</th>
                        <th>Tolal Muertes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${data.All.confirmed}</td>
                        <td>${data.All.recovered}</td>
                        <td>${data.All.deaths}</td>
                    </tr>
                </tbody>
            </table>
            `
            $("#data").html(data)

        } else {
        
            console.log("El pais NO es el mismo Ingresa pais Corecto");
            // alert("El pais es el mismo");
        }
    })
    .catch(error => console.log(error))
}

traerInfo(pais2);

// alert(typeof(country));
// alert(typeof(Obtenerpais));
