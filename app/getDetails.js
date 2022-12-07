export function getDetails(value) {
	const feelsLike = Math.floor(value.main.feels_like);
	const blockFeels = document.querySelector('.tabs__block__feels');
	blockFeels.textContent = `Feels like: ${feelsLike}°;`; 

	const weather = value.weather[0].description;
	const blockWeather = document.querySelector('.tabs__block__weather');
	blockWeather.textContent = `Weather: ${weather};`;  

	const sunriseHours = new Date(value.sys.sunrise * 1000).getHours();
	const sunriseMinutes = new Date(value.sys.sunrise * 1000).getMinutes();
	const sunriseBlock = document.querySelector('.tabs__block__sunrise');
	sunriseBlock.textContent = `Sunrise: ${sunriseHours}:${sunriseMinutes}`;  

	const sunsetHours = new Date(value.sys.sunset * 1000).getHours();
	const sunsetMinutes = new Date(value.sys.sunset * 1000).getMinutes();
	const sunsetBlock = document.querySelector('.tabs__block__sunset');
	sunsetBlock.textContent = `Sunset: ${sunsetHours}:${sunsetMinutes}`;  
	
}


