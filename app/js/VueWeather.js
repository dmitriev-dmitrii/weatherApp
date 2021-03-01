

let vueWeather = {}

vueWeather.is_loadedData = false;
vueWeather.is_day = '';
vueWeather.inputValue  =  ''
vueWeather.city  = '';
vueWeather.country =  '';
vueWeather.region =  '';
vueWeather.localData =  '';
vueWeather.temperature =  '';
vueWeather.weather_icon =  '';
vueWeather.description =  '';
vueWeather.wind_speed =  '';
vueWeather.humidity =  '';
vueWeather.feelslike =  '';


function parsVueWeather(vueData,data) 

{ 

	vueData.is_loadedData = true;
	vueData.is_day = data.current.is_day;
	vueData.inputValue  =  '';
	vueData.city  =  data.location.name;
	vueData.country = data.location.country;
	vueData.region = data.location.region;
	vueData.localData = (data.location.localtime.substr(2, 9));
	vueData.temperature = data.current.temperature;
	vueData.weather_icon = data.current.weather_icons;
	vueData.description = data.current.weather_descriptions[0];
	vueData.wind_speed = data.current.wind_speed;
	vueData.humidity = data.current.humidity;
	vueData.feelslike = data.current.feelslike;

}

function catchVueWeather(vueData,data) 

{ 
	vueData.is_loadedData = true;
	vueData.is_day = '';

	vueData.city  = 'Cant Find city  ';
	vueData.country = 'error code '+ data.code;
	vueData.region = 'error type ' + data.type;
	vueData.localData =  'Cant Find  ';
	vueData.temperature =  '.';
	vueData.weather_icon =  '.';
	vueData.description =  '.';
	vueData.wind_speed =  '.';
	vueData.humidity =  '.';
	vueData.feelslike =  'you sure  this correct ?  '+ vueData.inputValue;

}


function FindCity (city) 
{
vueWeather.is_loadedData = false;
sendRequest(makeUrl(city))

.then((data) => 
{


if (data.success == false) 
{
console.log(data);
catchVueWeather(vueWeather,data.error) 
}

else
{
	console.log(data);
	parsVueWeather(vueWeather,data) 
}

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
getMyPosition,

FindCity,

}

})


setTimeout(() => 
{

parsVueWeather(vueWeather,fakeResponse) 

vueWeather
}, 2000);


