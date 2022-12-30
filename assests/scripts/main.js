$( document ).ready(function() {

    // PREVENTS THE PAGE FROM RELOADING ON SUBMIT
    let form = document.getElementById("search-form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);



    // SEARCH BUTTON
    $('#search-submit-button').on('click', () => {
        $('#current-weather-date').text(($('#search-textbox').val()) + ' ' + dayjs().format('DD/MM/YY'))
        $('#history1').text($('#search-textbox').val())
        let searchedCity = ($('#search-textbox').val())

        console.log(searchedCity)
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
        .then(response => response.json())
        .then((data) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                console.log(data.weather[0].main)
                switch(data.weather[0].main.toLowerCase()){
                    case 'clear':
                        $("#today-weather-icon").attr("id", "today-weather-icon-sun")
                        console.log('clear')
                        break
                    case 'rain':
                        $("#today-weather-icon").attr("id", "today-weather-icon-rain")
                        console.log('rain')
                        break
                    case 'snow':
                        $("#today-weather-icon").attr("id", "today-weather-icon-snow")
                        console.log('snow')
                        break
                    case 'clouds':
                        $("#today-weather-icon").attr("id", "today-weather-icon-cloud")
                        console.log('clouds')
                }
            })
        })


    })
    //api key 4a95e5cd2ec6b313c75d4a7c3b046b39 

    // fetch('http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=4a95e5cd2ec6b313c75d4a7c3b046b39')
    // .then(response => response.json())
    // .then((data) => {
    //     console.log(data)
    // })


})