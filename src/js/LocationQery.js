

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
const myPosition =``+position.coords.latitude+`,`+position.coords.longitude+``

sendRequest(makeUrl(myPosition))
.then((data) => 
{

parsVueWeather(vueWeather,data) 
})

}

function error() 
{

// console.log('вычисляю по ip');

sendRequest(makeUrl("fetch:ip"))
.then((data) => 
{
parsVueWeather(vueWeather,data) 
})

}

navigator.geolocation.getCurrentPosition(success, error, options);

}

