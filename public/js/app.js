const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const search = document.querySelector('input')
const getWeather = document.querySelector('#search')
const get = document.querySelector('#get')

getWeather.addEventListener('click', (e) => {
    e.preventDefault()

    const location = search.value

        messageOne.textContent = 'Loading ... '
        messageTwo.textContent = ''

        fetch('/weather?address=' +location).then((response) => {
            response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

get.addEventListener('click', (e) => {
    e.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = 'Loading ... '

    get.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        fetch('/yourweather?latitude='+ position.coords.latitude + '&longitude=' + position.coords.longitude).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageTwo.textContent = data.forecast
                }
            })
            get.removeAttribute('disabled')
        })
    })
})