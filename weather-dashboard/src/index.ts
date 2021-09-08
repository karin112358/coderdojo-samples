import { DashboardConfiguration } from './dashboard-configuration';
import { Unit } from './unit';

const apiKey = '5f123066e65d7d7d222b668bbb71e8cb';
let configuration: DashboardConfiguration = JSON.parse(localStorage.getItem('dashboardConfiguration'))
if (!configuration) {
    configuration = { cities: []};
} 

init();

(<any>window).addCity = async () => {
    const city = (<HTMLInputElement>document.querySelector('#newCity')).value;
    const unit = <Unit>(<HTMLInputElement>document.querySelector('input[name="units"]:checked')).value;
    await loadWeather(city, unit);

    (<HTMLInputElement>document.querySelector('#newCity')).value = '';
    
    configuration.cities.push({ name: city, unit: unit});
    localStorage.setItem('dashboardConfiguration', JSON.stringify(configuration));
}

(<any>window).removeCity = (city: string) => {
    alert(city)
}

async function init() {
    for (let city of configuration.cities) {
        await loadWeather(city.name, city.unit);
    }
}

async function loadWeather(city: string, unit: Unit = 'metric'): Promise<void> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&lang=de&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
        alert(`Die Stadt ${city} wurde nicht gefunden.`);
        return;
    } 

    const node = document.createElement('div');
    node.innerHTML = `<div>
        <h3>${data.name}</h3>
        <img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' />
        <div>${data.main.temp}${unit === 'metric' ? '°' : 'F'}</div>
        <div>${data.weather[0].description}</div>
        <div class="remove" onclick="removeCity('${city}')">X</div>
    </div>`;
  
    const dashboard = document.getElementById('dashboard');
    dashboard.children[dashboard.children.length - 1].insertAdjacentElement('beforebegin', node);
}

