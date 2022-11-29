const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
 const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'; 
const cityHtml = document.querySelectorAll('.tabs__block__title');
function cityNameToUp(elem) {return elem.charAt(0).toUpperCase() + elem.slice(1)};

const form = document.querySelector('.header__form');
form.addEventListener("submit", getCity)

function getCity(el) {
	el.preventDefault();
    let input = el.target.querySelector(".form-input");
    let cityName = cityNameToUp(input.value);
		if (!cityName) return input.value = '';
		cityHtml.forEach((elem) => elem.textContent = cityName);
		getUrl(cityName);
		el.target.reset();
}

function getUrl(cityName){
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
		const response =  fetch(url);
		response
			.then((data) => data.json())
			.then((value) => {
				console.log(value)
				// const gender = value.gender
				// addGender(gender, name)
			})
}