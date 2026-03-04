// Dom selectors

const city = document.querySelector("#city");

 const submitbtn = document.querySelector("#button");
 

 //  Dom selector text content from the process api data
 
const cityname = document.querySelector("#cityname")

const  condition = document.querySelector("#conditions")

const feelsLike = document.querySelector("#feelsLike")

const icon = document.querySelector("#icon")

const humidity = document.querySelector("#humidity")

const time = document.querySelector("#time")


//Api
const fetchWeatherTimelineData = async (location) => {
    const apiKey = 'Z69KDMKEPVEWW766AF88A8X6F';
    const unitGroup = 'metric';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const weatherinfo = processWeatherData(data)
        displayweather(weatherinfo)
        // Further processing 
    } catch (error) {
        console.error('Failed to fetch the weather data:', error);
        // Extracts error message from the response body if possible
        if (error.response && error.response.text) {
            error.response.text().then(message => {
                console.error('Error message:', message);
            });
        }
    }
};

//add event listener for  botton 
submitbtn.addEventListener("click", () =>  {
   const value = city.value;
if (value ==="") {
    alert("please enter a City name")
} else {
    fetchWeatherTimelineData(value)
}

});


// process important Data i need from the Api Data

function processWeatherData(data) {
  return {
    city: data.resolvedAddress,
    description: data.description,
    conditions: data.currentConditions.conditions,
    feelsLike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    icon: data.currentConditions.icon,
    time: data.currentConditions.datetime
  }
}
   
   // Dom selector text content from the process api data
 function displayweather (weatherinfo) {
     const cityname = document.querySelector("#cityname").textContent = `City: ${weatherinfo.city}`

const  condition = document.querySelector("#conditions").textContent =` Condition: ${weatherinfo.conditions}`

const feelsLike = document.querySelector("#feelsLike").textContent = `FeelsLike: ${weatherinfo.feelsLike}`
const icon = document.querySelector("#icon").textContent = `Icon: ${weatherinfo.icon}`
const humidity = document.querySelector("#humidity").textContent =`Humidity:  ${weatherinfo.humidity}`
const time = document.querySelector("#time").textContent = `Time: ${weatherinfo.time}`
 }



