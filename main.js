
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
const input = document.querySelector("input");
const cityLoc = document.querySelector(".location");
const Cel_to_fah = document.querySelector("#checkbox");
let city1 = "Moscow";


// switch between fahrenheit and celsius

Cel_to_fah.addEventListener('change',function(e){
  
  if(e.target.checked){
    const tmpF = temperature.innerHTML.split("°")[0];
    temperature.innerHTML=Math.round((+tmpF*9/5) + 32)+"° F";
    const feels_like_f = ((+(feels_like.innerHTML.split(":")[1].split("°")[0])*9/5) + 32);
    feels_like.innerHTML = "Feels like : "+Math.round(feels_like_f)+"° F";
  }else {
    console.log("no")
    const tmpC = document.querySelector("#temp").innerHTML.split("°")[0];
    const feels_like_C = ((+(feels_like.innerHTML.split(":")[1].split("°")[0])-32) *5/9);
    temperature.innerHTML=Math.round((+tmpC-32) *5/9)+"° C";
    feels_like.innerHTML = "Feels like : "+Math.round(feels_like_C)+"° C";
  }
  
  
});

// get location (latitude,longitude)
const getCityByposition = function(){
    navigator.geolocation.getCurrentPosition((pos)=> {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    getCityByCoords(latitude,longitude);
  },
  err => alert(err.message));
}
getCityByposition();
cityLoc.addEventListener('click',function(e){
    getWeather(city1);
    Cel_to_fah.checked=false;
  });

// get weather for a given city when press the enter button

document.addEventListener('keydown',function(e){
  if (e.key !== "Enter") return ;
  const city = e.target.value;
  getWeather(city);
  Cel_to_fah.checked=false;
});

// get weather for a city by its coords 

const getCityByCoords = async function(latitude,longitude){
  try {
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatheApiKey}` ; 
    const res = await fetch(url);
    const data = await res.json();
    city1 = renderData(data).cityName ;
  } catch (err){
    alert(err.message);
  }
   
}

const getWeather = async function(city){
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatheApiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    insertData(renderData(data));
  } catch (err){
    alert(`This City " ${city} " doesnt exist check the spelling and try again !!`);
  }  
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

function calcTime(city, offset) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000*offset));
  return  nd.toLocaleString();
}


const insertData = function(data){
  city.innerHTML = ` ${data.cityName}, ${data.countryInfo.country} ` ;
  const sunRise = (new Date((+data.countryInfo.sunrise+data.timeZone-3600)*1000)).toLocaleTimeString()  ;
  sun_Rise.innerHTML = "Sun Rise : "+sunRise;
  const sunSet = (new Date((+data.countryInfo.sunset+data.timeZone-3600)*1000)).toLocaleTimeString()  ;
  sun_Set.innerHTML = "Sun Set : "+sunSet;
  //const today = new Date().toString().split("(")[0];
  const todayTime = calcTime(data.cityName,data.timeZone/3600);
  document.querySelector("h3").innerHTML = todayTime;
  const temp = Math.round(+(data.tempInfo.temp) - 273.15);
  temperature.innerHTML = temp+"° C";
  const feelsLike = Math.round(+(data.tempInfo.feels_like) - 273.15);
  feels_like.innerHTML = "Feels like : "+feelsLike+"° C";
  const wind = data.windSpeed;
  windSpeed.innerHTML ="Wind Speed : "+ wind+" Km/h";
  const weatherDes = data.weather.description;
  description.innerHTML = weatherDes.toUpperCase() ;
  const weatherMain = data.weather.main;
  const weatherIcon = data.weather.icon;
  const humidity = data.tempInfo.humidity;
  Hum.innerHTML = "Humidity : "+humidity+"%";
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  const img = document.querySelector(".image");
  if (img){
    document.querySelector(".image").src = iconUrl;
  } else{
    const htmlIcon = `<img src=${iconUrl} alt="Avatar" class="image" width="100" height="100"></img>`;
    tempMain.insertAdjacentHTML('beforeend',htmlIcon);
  } 
  
  document.body.style.backgroundImage = `url('./images/${weatherMain}.jpg')`;  
}
getWeather(city1);











