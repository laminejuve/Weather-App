
const weatheApiKey = "bd1e7e6294cb71da8df37a669c977d34";

const city = document.querySelector("#city");
const temperature = document.querySelector("#temp");
const description = document.querySelector("#description");
const tempMain = document.querySelector(".main");
const sun_Rise = document.querySelector("#sunRise");
const sun_Set = document.querySelector("#sunSet");
const feels_like = document.querySelector("#feels_like");
const windSpeed = document.querySelector("#wind");
const Hum = document.querySelector("#humidity");


console.log(tempMain);



const getWeather = async function(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatheApiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  insertData(renderData(data));
}

const renderData= function (data){
  const weatherInfo = {
     weather : data.weather[0],
    countryInfo : data.sys,
    tempInfo : data.main,
    windSpeed : data.wind.speed,
    cityName : data.name,
    timeZone : data.timezone,
  } 
  return weatherInfo;
}

const insertData = function(data){
  city.innerHTML = ` ${data.cityName}, ${data.countryInfo.country} ` ;
  const sunRise = (new Date(data.countryInfo.sunrise*1000)).toLocaleTimeString()  ;
  sun_Rise.innerHTML = "Sun Rise : "+sunRise;
  const sunSet = (new Date(data.countryInfo.sunset*1000)).toLocaleTimeString()  ;
  sun_Set.innerHTML = "Sun Set : "+sunSet;
  const today = new Date().toString().split("(")[0];
  const temp = Math.round(+(data.tempInfo.temp) - 273.15);
  temperature.innerHTML = temp+"° C";
  const feelsLike = Math.round(+(data.tempInfo.feels_like) - 273.15);
  feels_like.innerHTML = "Feels like : "+feelsLike+"° C";
  const wind = data.windSpeed;
  windSpeed.innerHTML ="Wind Speed : "+ wind+" Km/h";
  const weatherDes = data.weather.description;
  description.innerHTML = weatherDes ;
  const weatherMain = data.weather.main;
  const weatherIcon = data.weather.icon;
  const humidity = data.tempInfo.humidity;
  Hum.innerHTML = "Humidity : "+humidity+"%";
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  const htmlIcon = `<img src=${iconUrl} alt="Avatar" class="image"></img>`;
  tempMain.insertAdjacentHTML('beforeend',htmlIcon);
  document.body.style.backgroundImage = `url('./images/${weatherMain}.jpg')`;

  
}







getWeather("setif");



