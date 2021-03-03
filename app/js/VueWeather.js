let vueWeather = {}

vueWeather.is_loadedData = false;
vueWeather.inputValue  =  ''
vueWeather.city  = '';
vueWeather.country =  '';
vueWeather.temperature =  '';
vueWeather.weather_icon =  '';
vueWeather.description =  '';
vueWeather.wind_speed =  '';
vueWeather.humidity =  '';
vueWeather.feelslike =  '';

Math.round(new Date().getTime()/1000.0)


function parsVueWeather(vueData,data) 

{ 
	vueData.is_loadedData = true;

	vueData.inputValue  =  '';
	vueData.city  =  data.name;
	vueData.country = data.sys.country;
	vueData.temperature = data.main.temp;
	vueData.weather_icon = `https://openweathermap.org/img/wn/`+data.weather[0].icon +`@2x.png`;
	vueData.description = data.weather[0].description;
	vueData.wind_speed = data.wind.speed ;
	vueData.humidity = data.main.humidity;
	vueData.feelslike = data.main.feels_like;

}

function catchVueWeather(vueData,data) 

{ 
	vueData.is_loadedData = true;

	vueData.city  = 'Город не найден  ';
	vueData.country = 'Вы уверены в запросе? :  '+ vueData.inputValue;
	vueData.temperature =  '.';
	vueData.weather_icon =  'no Image';
	vueData.description =  '.';
	vueData.wind_speed =  '.';
	vueData.humidity =  '.';
	vueData.feelslike =  'nan';

}

function makeUrl(query) 
{
const apiKey = '3427c22a63089519ba7e9b378b942e2e'
const url= `https://api.openweathermap.org/data/2.5/weather?q=`+query+`&units=metric&lang=ru&appid=`+apiKey+``;
return url
} 




function sendRequest(url) 
{

return fetch(url).then(response => 

{
if (response.ok) {

return response.json()
}
else 
{
catchVueWeather(vueWeather,response) 
}

})
}


function getMyPosition() 
{
const options = 
{
enableHighAccuracy: true,
timeout: 5000,
maximumAge: 0
};

function success(position) 
{

const urlLocal= `https://api.openweathermap.org/data/2.5/weather?lat=`+position.coords.latitude+`&lon=`+position.coords.longitude+`&units=metric&lang=ru&appid=3427c22a63089519ba7e9b378b942e2e`

sendRequest(urlLocal)
.then((data) => 
{
console.log(data)
parsVueWeather(vueWeather,data) 
})
}

function error() 
{

sendRequest(makeUrl("Санкт-Петербург"))
.then((data) => 
{
parsVueWeather(vueWeather,data) 
})
}
navigator.geolocation.getCurrentPosition(success, error, options);
}

function FindCity (city) 
{
vueWeather.is_loadedData = false;
sendRequest(makeUrl(city))

.then((data) => 
{
parsVueWeather(vueWeather,data) 
})


}

const weatherApp = new Vue({
	el: '#weatherApp',

	data: vueWeather
,
methods: {
mobileMenuToggle() 
{
	document.querySelector('.nav').classList.toggle('active')
},
FindCity,
getMyPosition
}
})

setTimeout(() => 
{

getMyPosition()

vueWeather
}, 0);



