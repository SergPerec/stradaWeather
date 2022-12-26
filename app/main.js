import { saveCurrentCity, getCurrentCity, saveFavoriteCitys, getFavoriteCitys } from './storage.js';
import { getDetails } from './getDetails.js';

const serverUrl = 'http://api.openweathermap.org';
const serverUrlWeather = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const favoriteCity = new Set();

const form = document.querySelector('.header__form');
form.addEventListener("submit", getCity)
function getCity(el) {
	el.preventDefault();
	const city = el.target.querySelector(".form-input").value;
	if (!city) return input.value = '';
	getWeather(city);
	saveCurrentCity(city);
	el.target.reset();
}

async function getWeather(city) {
	try {
		const url = `${serverUrlWeather}?q=${city}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		const data = await response.json();
		const celsiy = Math.floor(data.main.temp);
		const tempHtml = document.querySelector('.tabs__block__degree');
					tempHtml.textContent = `${celsiy}°`;
		const cityHtml = document.querySelectorAll('.tabs__block__title');
					cityHtml.forEach((elem) => elem.textContent = data.name);
		const icon = document.querySelector('.tabs__block__icon');
					icon.src = `${serverUrl}/img/w/${data.weather[0].icon}.png`;			
		getDetails(data);	
	} catch(err) {
		alert (err)
	}
};

const likeButton = document.querySelector('.tabs__block__like');
likeButton.addEventListener("click", addFavoriteCity);

function addFavoriteCity() {
	const cityName = document.querySelector('.tabs__block__title');
	const favoriteCityName = cityName.textContent
	favoriteCity.add(favoriteCityName);
	saveFavoriteCitys(favoriteCity);
	render()
};

function deleteFavoriteCity() {
	let nameCity = this.previousElementSibling.textContent;
	favoriteCity.delete(nameCity);
	saveFavoriteCitys(favoriteCity);
	render()
}

function render() {
	let allCitys = document.querySelectorAll('.right-block__item');
	for (let city of allCitys) {
		city.remove()
	}
	favoriteCity.forEach(function (element) {
		let li = document.createElement('li');
		li.className = 'right-block__item';

		let div = document.createElement('div');
		div.className = 'favorite-city';
		div.textContent = element;
		div.addEventListener("click", (event) => {
      event.preventDefault();
      getWeather(element);
			saveCurrentCity(element);
		});

		let div2 = document.createElement('div');
		div2.className = 'remove-city';
		div2.textContent = '+';
		div2.addEventListener("click", deleteFavoriteCity);

		let block__list = document.querySelector('.right-block__list');
		block__list.append(li);
		li.append(div);
		li.append(div2);
	})
}

window.onload = function() {
	const cityName = getCurrentCity();
  getWeather(cityName);
	const listCity = getFavoriteCitys();
	listCity.forEach((e) => {
		favoriteCity.add(e);
	})
	render();
};







