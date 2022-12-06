$( document ).ready(function() {
    
    // PREVENTS THE PAGE FROM RELOADING ON SUBMIT
    let form = document.getElementById("search-form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);

    // SEARCH BUTTON
    $('#search-submit-button').on('click', () => {
        console.log('search')
    })
})