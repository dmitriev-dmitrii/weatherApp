'use strict'

function makeUrl(query) 
{
const apiKey = '0da224781adc46baf9030cc100ec228c';
const http ='http://api.weatherstack.com';
const url =
`
`+http+`/current?access_key=`+apiKey+`&query=`+query+`
`
return url;
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
console.log(response.status);
}

})
}



let fakeResponse =
{"request":

{
"type":"City",
"query":"London, United Kingdom",
"language":"en",
"unit":"m"
}
,
"location":
{"name":"London"
,"country":"United Kingdom",
"region":"City of London, Greater London",
"lat":"51.517",
"lon":"-0.106",
"timezone_id":"Europe\/London",
"localtime":"2021-02-27 13:57",
"localtime_epoch":1614434220,
"utc_offset":"0.0"}
,
"current":
{"observation_time":"01:57 PM"
,"temperature":11,"weather_code":116,
"weather_icons":["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0002_sunny_intervals.png"]
,"weather_descriptions":["Partly cloudy"]
,"wind_speed":9,"wind_degree":80,
"wind_dir":"E","pressure":1041,
"precip":0,
"humidity":58,
"cloudcover":25,
"feelslike":11,
"uv_index":4,
"visibility":10,
"is_day":"yes"}
}




