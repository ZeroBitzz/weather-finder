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

    let forecastDate1 = document.getElementById('forecastDate1')
    let forecastDate2 = document.getElementById('forecastDate2')
    let forecastDate3 = document.getElementById('forecastDate3')
    let forecastDate4 = document.getElementById('forecastDate4')
    let forecastDate5 = document.getElementById('forecastDate5')

    let forecastIcon1 = document.getElementById('forecastIcon1')
    let forecastIcon2 = document.getElementById('forecastIcon2')
    let forecastIcon3 = document.getElementById('forecastIcon3')
    let forecastIcon4 = document.getElementById('forecastIcon4')
    let forecastIcon5 = document.getElementById('forecastIcon5')

    let forecastTemp1 = document.getElementById('forecastTemp1')
    let forecastTemp2 = document.getElementById('forecastTemp2')
    let forecastTemp3 = document.getElementById('forecastTemp3')
    let forecastTemp4 = document.getElementById('forecastTemp4')
    let forecastTemp5 = document.getElementById('forecastTemp5')

    let forecastWind1 = document.getElementById('forecastWind1')
    let forecastWind2 = document.getElementById('forecastWind2')
    let forecastWind3 = document.getElementById('forecastWind3')
    let forecastWind4 = document.getElementById('forecastWind4')
    let forecastWind5 = document.getElementById('forecastWind5')

    let forecastHumidity1 = document.getElementById('forecastHumidity1')
    let forecastHumidity2 = document.getElementById('forecastHumidity2')
    let forecastHumidity3 = document.getElementById('forecastHumidity3')
    let forecastHumidity4 = document.getElementById('forecastHumidity4')
    let forecastHumidity5 = document.getElementById('forecastHumidity5')

    // DAY COMPARISON VARIABLES AND OBJECTS
    let currentDay = Number(dayjs().format('DD'))
    console.log(`currentDay is ${currentDay}`)
    let forecast1 = 0
    let forecast2 = 0
    let forecast3 = 0
    let forecast4 = 0
    let forecast5 = 0


    // ICON DECIDER FUNCTION
    function iconDecider(switchCase, today=true){
        if(today){
            switch(switchCase){
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
        }else{
            switch(switchCase){
                case 'clear':
                    return "today-weather-icon-sun"
                case 'rain':
                    return "today-weather-icon-rain"
                case 'drizzle':
                    return "today-weather-icon-rain"
                case 'snow':
                    return "today-weather-icon-snow"
                case 'clouds':
                    return "today-weather-icon-cloud"
                default:
                    return "today-weather-icon-cloud"
            }
        }
    }

    // SEARCH PREVIOUS FUNCTION FOR CALLING HISTORY
    function searchPrevious(){
        document.getElementById('search-textbox').value = history1.innerHTML
        callApi()
    }

    // API CALLER FUNCTION
    function callApi(){
        localStorage.setItem('history1', searchTextbox.value)
        todayDate.innerHTML = `${searchTextbox.value} ${dayjs().format('YYYY/MM/DD')}`
        history1.innerHTML = searchTextbox.value
        history1.addEventListener("click", searchPrevious)
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
                iconDecider(data.weather[0].main.toLowerCase())
            })
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                forecast5 = Number(data.list[data.list.length - 1].dt_txt[8] + data.list[data.list.length - 1].dt_txt[9])
                forecastDate5.innerHTML = data.list[data.list.length - 1].dt_txt.slice(0,10)
                console.log(data.list[data.list.length - 1].weather[0].main)
                forecastIcon5.id = iconDecider(data.list[data.list.length - 1].weather[0].main.toLowerCase(), false)
                forecastIcon5.innerHTML = ''
                forecastTemp5.innerHTML = `${Math.round((data.list[data.list.length - 1].main.temp - 273) * 9/5 + 32)} F`
                forecastWind5.innerHTML = `${(data.list[data.list.length - 1].wind.speed)} MPH`
                forecastHumidity5.innerHTML = `${data.list[data.list.length - 1].main.humidity} %`

                console.log(`forecast1 is ${forecast5}`)
                for(let i=data.list.length - 1; i>0; i--){
                    let listHour = Number(data.list[i].dt_txt[8] + data.list[i].dt_txt[9])
                    let listDate = data.list[i].dt_txt.slice(0,10)
                    if(listHour === forecast5 - 1){
                        forecast4 = listHour
                        forecastDate4.innerHTML = listDate
                        forecastIcon4.id = iconDecider(data.list[i].weather[0].main.toLowerCase(), false)
                        forecastIcon4.innerHTML = ''
                        forecastTemp4.innerHTML = `${Math.round((data.list[i].main.temp - 273) * 9/5 + 32)} F`
                        forecastWind4.innerHTML = `${(data.list[i].wind.speed)} MPH`
                        forecastHumidity4.innerHTML = `${data.list[i].main.humidity} %`
                    }else if(listHour === forecast4 - 1){
                        forecast3 = listHour
                        forecastDate3.innerHTML = listDate
                        forecastIcon3.id = iconDecider(data.list[i].weather[0].main.toLowerCase(), false)
                        forecastIcon3.innerHTML = ''
                        forecastTemp3.innerHTML = `${Math.round((data.list[i].main.temp - 273) * 9/5 + 32)} F`
                        forecastWind3.innerHTML = `${(data.list[i].wind.speed)} MPH`
                        forecastHumidity3.innerHTML = `${data.list[i].main.humidity} %`
                    }else if(listHour === forecast3 - 1){
                        forecast2 = listHour
                        forecastDate2.innerHTML = listDate
                        forecastIcon2.id = iconDecider(data.list[i].weather[0].main.toLowerCase(), false)
                        forecastIcon2.innerHTML = ''
                        forecastTemp2.innerHTML = `${Math.round((data.list[i].main.temp - 273) * 9/5 + 32)} F`
                        forecastWind2.innerHTML = `${(data.list[i].wind.speed)} MPH`
                        forecastHumidity2.innerHTML = `${data.list[i].main.humidity} %`
                    }else if(listHour === forecast2 - 1){
                        forecast1 = listHour
                        forecastDate1.innerHTML = listDate
                        forecastIcon1.id = iconDecider(data.list[i].weather[0].main.toLowerCase(), false)
                        forecastIcon1.innerHTML = ''
                        forecastTemp1.innerHTML = `${Math.round((data.list[i].main.temp - 273) * 9/5 + 32)} F`
                        forecastWind1.innerHTML = `${(data.list[i].wind.speed)} MPH`
                        forecastHumidity1.innerHTML = `${data.list[i].main.humidity} %`
                    }
                }
                console.log('forecast dates', forecast1, forecast2, forecast3, forecast4, forecast5)
        
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