$( document ).ready(function() {

    // PREVENTS THE PAGE FROM RELOADING ON SUBMIT
    let form = document.getElementById("search-form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);

    // DOM ELEMENTS AND EVENT LISTENERS
    document.getElementById('search-submit-button').addEventListener("click", callApi)
    let todayDate = document.getElementById('today-date')
    let history1 = document.getElementById('history1')
    let searchedCity
    let searchTextbox = document.getElementById('search-textbox')
    let todayWeatherIcon = document.getElementById('today-weather-icon')
    let todayTemp = document.getElementById('today-temp')
    let todayWind = document.getElementById('today-wind')
    let todayHumidity = document.getElementById('today-humidity')

    // API CALLER FUNCTION
    function callApi(){
        todayDate.innerHTML = `${searchTextbox.value} ${dayjs().format('DD/MM/YY')}`
        history1.innerHTML = searchTextbox.value
        searchedCity = document.getElementById('search-textbox').value
        searchTextbox.value = ''
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
        .then(response => response.json())
        .then((data) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                console.log(data.weather[0].main)
                todayTemp.innerHTML = `Temperature: ${data.main.temp} F`
                todayHumidity.innerHTML = `Humidity: ${data.main.humidity} %`
                todayWind.innerHTML = `Wind: ${data.wind.speed} MPH`
                switch(data.weather[0].main.toLowerCase()){
                    case 'clear':
                        todayWeatherIcon.id = "today-weather-icon-sun"
                        console.log('clear')
                        break
                    case 'rain':
                        todayWeatherIcon.id = "today-weather-icon-rain"
                        console.log('rain')
                        break
                    case 'drizzle':
                        todayWeatherIcon.id = "today-weather-icon-rain"
                        console.log('drizzle')
                        break
                    case 'snow':
                        todayWeatherIcon.id = "today-weather-icon-snow"
                        console.log('snow')
                        break
                    case 'clouds':
                        todayWeatherIcon.id = "today-weather-icon-cloud"
                        console.log('clouds')
                        break
                    default:
                        todayWeatherIcon.id = "today-weather-icon-cloud"
                        console.log('default')
                        break
                }
            })
        })
    }

    //api key 4a95e5cd2ec6b313c75d4a7c3b046b39 

    // fetch('http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=4a95e5cd2ec6b313c75d4a7c3b046b39')
    // .then(response => response.json())
    // .then((data) => {
    //     console.log(data)
    // })


})