export function saveCurrentCity(cityName) {
	localStorage.setItem('CurrentCity', cityName);
}

export function getCurrentCity() {
	return localStorage.getItem('CurrentCity');
}

export function saveFavoriteCitys(favoriteCity) {
	const citys = JSON.stringify([...favoriteCity]);
	localStorage.setItem('FavoriteCitys', citys);
}

export function getFavoriteCitys() {
	const citys = localStorage.getItem('FavoriteCitys');
	return JSON.parse(citys); 
}