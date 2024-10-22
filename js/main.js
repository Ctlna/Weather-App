window.addEventListener('scroll', function() {
    const header = document.getElementById('encabezado');
    const backgroundImg = document.querySelector('.background-img');
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    // Gradualmente desvanece la imagen de fondo
    if (scrollPosition > 50) {
        backgroundImg.style.opacity = 0.5;
    } 
    if (scrollPosition > 100) {
        backgroundImg.style.opacity = 0.2;
    } 
    if (scrollPosition > 150) {
        backgroundImg.style.opacity = 0;
    }

    // Gradualmente reaparece la imagen al subir el scroll
    if (scrollPosition < 50) {
        backgroundImg.style.opacity = 1;
    } 
});

function fetchWeatherTodaay(){
    let xhr = new XMLHttpRequest();
    let apiKey = "5ef27643ffdb4f8cb79164409242110";
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Floridablanca`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange=function(){
        if (this.readyState===4 && this.status===200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            wheatherDataToday(response);
            fetchWeatherMuchos();
        }
        else if (this.readyState==4){
            console.log('Error: ',this.statusText);
        }
    };
    xhr.send();
}

function fetchWeatherMuchos(){
    let xhr = new XMLHttpRequest();
    let apiKeys = "5ef27643ffdb4f8cb79164409242110";
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKeys}&q=Floridablanca&lang=es&days=14`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange=function(){
        if (this.readyState===4 && this.status===200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            wheather10days(response);
            wheatherHourly(response);
        }
        else if (this.readyState==4){
            console.log('Error: ',this.statusText);
        }
    };
    xhr.send();
}


function wheatherDataToday(data){
    let lugarbusque=document.getElementById('lugarYBusqueda');
    let feels=document.getElementById('FeelsLike');
    let cositos=document.getElementById('datos');
    if (data.response==="error"){
        lugarbusque.innerHTML=`<p>Error:${data.error}</p>`;
        feels.innerHTML=`<p>Error:${data.error}</p>`;
        cositos.innerHTML=`<p>Error:${data.error}</p>`;
    }
    else{
        lugarbusque.innerHTML=`
            <p>${data.location.name}, ${data.location.country}</p>
            <img src="./storage/img/search_black.png">
        `
        feels.innerHTML=`
        <p>${data.current.temp_c}°</p>
        <p>${data.current.feelslike_c}°</p>
        <img src="https:${data.current.condition.icon}" alt="Weather Icon">
        `
        cositos.innerHTML=`
        <div class="viento">
            <img class="chiquito" src="./storage/img/air.png">
            <p>Wind speed
            <br>
            ${data.current.wind_kph}</p>
        </div>
        <div class="lluvia">
            <img class="chiquito" src="./storage/img/rainy.png">
            <p>Rain chance
            <br>
            ${data.current.precip_mm}</p>
        </div>
        <div class="presion">
            <img class="chiquito" src="./storage/img/waves.png">
            <p>Pressure
            <br>
            ${data.current.pressure_mb}</p>
        </div>
        <div class="uv">
            <img class="chiquito" src="./storage/img/light_mode.png">
            <p>UV Index
            <br>
            ${data.current.uv}</p>
        </div>
        `
    }
}

function wheatherHourly(data){
    let contenido=document.getElementById('contenido');
    let twiligth=document.getElementById('sol');
    if (data.response==="error"){
        contenido.innerHTML=`<p>Error:${data.error}</p>`;
        twiligth.innerHTML=`<p>Error:${data.error}</p>`;
    }
    else{
        let solecito = data.forecast.forecastday[0].astro;
        let forecast = data.forecast.forecastday[0].hour; 
        let firstSixHours = forecast.slice(0, 24);
        let htmlContent = '';
        firstSixHours.forEach(hour => {
            htmlContent += `
                <div class="forecast-hour">
                    <p class="separa">${hour.time.split(' ')[1]}</p> <!-- Mostrar solo la hora -->
                    <img class="icon" src="https:${hour.condition.icon}" alt="Weather Icon">
                    <p class="separa">${hour.temp_c}°</p>
                </div>
            `;
        
        });
        contenido.innerHTML=htmlContent;
        twiligth.innerHTML=`
            <div class="amanecer">
                <img class="chiquito" src="./storage/img/nights_stay.png">
                <p>Sunrise
                <br>
                ${solecito.sunrise}</p>
            </div>
            <div class="anochecer">
                <img class="chiquito" src="./storage/img/bounding_box.png">
                <p>Sunset
                <br>
                ${solecito.sunset} </p>
            </div>
        `
    }
}

function wheather10days(data){
    let mas=document.getElementById('10dias');
    if (data.response==="error"){
        mas.innerHTML=`<p>Error:${data.error}</p>`;
    }
    else{
        let forecast = data.forecast.forecastday;
        let firstSixDates = forecast.slice(0, 10);
        let htmlContent = '';
        firstSixDates.forEach(day => {
            htmlContent += `
                <div class="forecast-day">
                    <p>${day.date}</p>
                    <img src="${day.day.condition.icon}" alt="Weather Icon">
                    <p>${day.day.avgtemp_c}°</p>
                    <p>${day.day.condition.text}</p>
                </div>
            `;
        });

        
        mas.innerHTML=htmlContent
    }
}