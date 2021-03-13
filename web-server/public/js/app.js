console.log('Welcome to the Weather App')

const weatherForm = document.querySelector('form')
const searchString = document.getElementById('searchString')
const message1 = document.getElementById('m1')
const message2 = document.getElementById('m2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchString.value

    message1.textContent = 'Loading....'
    message2.textContent = ''
    
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) =>{
        if(data.error) {
            message1.textContent = data.error;
        }

        else{
            message1.textContent = data.places;
            message2.textContent = data.forecast;
        }
    })
})

})