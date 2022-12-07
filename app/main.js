import { saveCurrentCity, getCurrentCity, saveFavoriteCitys, getFavoriteCitys } from './storage.js';
import	{ getDetails } from './getDetails.js';

const serverUrl = 'http://api.openweathermap.org';
const serverUrlWeather = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const favoriteCity = [];

const form = document.querySelector('.header__form');
form.addEventListener("submit", getCity)
function getCity(el) {
	el.preventDefault();
	let city = el.target.querySelector(".form-input").value;
	if (!city) return input.value = '';
	getWeather(city);
	saveCurrentCity(city);
	el.target.reset();
}

function getWeather(city) {
	const url = `${serverUrlWeather}?q=${city}&appid=${apiKey}&units=metric`;
	const response = fetch(url);
	response
		.then((data) => data.json())
		.then((value) => {
			// console.log(value);
			const celsiy = Math.floor(value.main.temp);
			const tempHtml = document.querySelector('.tabs__block__degree');
				tempHtml.textContent = `${celsiy}°`;

			const cityHtml = document.querySelectorAll('.tabs__block__title');
				cityHtml.forEach((elem) => elem.textContent = value.name);

			const icon = document.querySelector('.tabs__block__icon');
				icon.src = `${serverUrl}/img/w/${value.weather[0].icon}.png`;
			
				getDetails(value);	
		});
};

const likeButton = document.querySelector('.tabs__block__like');
likeButton.addEventListener("click", addFavoriteCity);

function addFavoriteCity() {
	const favoriteCityName = document.querySelector('.tabs__block__title');
	const favoriteCityName2 = favoriteCityName.textContent
	favoriteCity.push({ name: favoriteCityName2 });
	saveFavoriteCitys(favoriteCity);
	render()
};

function deleteFavoriteCity() {
	let nameCity = this.previousElementSibling.textContent;
	let deleteCity = favoriteCity.findIndex(el => el.name === nameCity);
	favoriteCity.splice(deleteCity, 1)
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
		div.textContent = element.name;
		div.addEventListener("click", (event) => {
      event.preventDefault();
      getWeather(element.name);
			saveCurrentCity(element.name);
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
		favoriteCity.push(e);
	})
	render();
};







