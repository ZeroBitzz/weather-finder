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
        $('#today-weather-icon').css("background-image", "url("+ '../images/sun.svg' +")")

        console.log(searchedCity)
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
        .then(response => response.json())
        .then((data) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=4a95e5cd2ec6b313c75d4a7c3b046b39`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                console.log(data.weather[0].main)
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