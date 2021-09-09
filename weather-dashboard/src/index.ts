import { IDBPDatabase, openDB } from 'idb';
import { DashboardConfiguration } from './dashboard-configuration';
import { Unit } from './unit';

const apiKey = '5f123066e65d7d7d222b668bbb71e8cb';
const dashboard = document.getElementById('dashboard');
let db: IDBPDatabase;

// load configuration from local storage
let configuration: DashboardConfiguration = JSON.parse(
  localStorage.getItem('dashboardConfiguration')
);
if (!configuration) {
  configuration = { cities: [] };
}

init();

/**
 * Add city to dashboard.
 */
(<any>window).addCity = async () => {
  const city = (<HTMLInputElement>document.querySelector('#newCity')).value;
  const unit = <Unit>(
    (<HTMLInputElement>document.querySelector('input[name="units"]:checked'))
      .value
  );
  await loadWeather(city, unit);

  (<HTMLInputElement>document.querySelector('#newCity')).value = '';

  configuration.cities.push({ name: city, unit: unit });
  localStorage.setItem('dashboardConfiguration', JSON.stringify(configuration));
};

/**
 * Remove city from dashboard.
 */
(<any>window).removeCity = async (city: string) => {
  const index = configuration.cities.findIndex((c) => c.name === city);
  if (index >= 0) {
    configuration.cities.splice(index, 1);
    const child = dashboard.children[index];
    dashboard.removeChild(child);

    localStorage.setItem(
      'dashboardConfiguration',
      JSON.stringify(configuration)
    );

    const txRemove = db.transaction('weatherForecasts', 'readwrite');
    let weatherForecasts = txRemove.objectStore('weatherForecasts');
    weatherForecasts.delete(city);
    await txRemove.done;
  }
};

/**
 * Initialize grid with saved cities.
 */
async function init(): Promise<void> {
  db = await openDB('weather-dashboard', 1, {
    upgrade(db) {
      const store = db.createObjectStore('weatherForecasts', {
        // The 'id' property of the object will be the key.
        keyPath: 'city',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: false,
      });
    },
  });

  for (let city of configuration.cities) {
    await loadWeather(city.name, city.unit);
  }
}

/**
 * Load weather data for city.
 * @param city City to load.
 * @param unit Unit for degrees.
 */
async function loadWeather(city: string, unit: Unit = 'metric'): Promise<void> {
  // check if data exists
  const txRead = db.transaction('weatherForecasts', 'readonly');
  let data = (await txRead.store.get(city))?.data;
  let reloadRequired = false;

  if (
    !data?.refreshTime ||
    new Date().getTime() - data.refreshTime.getTime() > 60 * 1000
  ) {
    data = null;
    reloadRequired = true;
  }

  if (!data || reloadRequired) {
    console.log(`load city ${city}`);

    // load data from service
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&lang=de&appid=${apiKey}`
    );

    data = await response.json();
    data.refreshTime = new Date();

    if (data.cod === '404') {
      alert(`Die Stadt ${city} wurde nicht gefunden.`);
      return;
    }

    const txAdd = db.transaction('weatherForecasts', 'readwrite');
    if (reloadRequired) {
      // update data in database
      await txAdd.store.put({ city, data });
    } else {
      // add data to database
      await txAdd.store.add({ city, data });
    }

    await txAdd.done;
  }

  // add city to dashboard
  const node = document.createElement('div');
  const date = new Date();
  node.innerHTML = `<div>
        <h3>${data.name}</h3>
        <img src='http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png' />
        <div class='degree'>${Math.round(data.main.temp)}${
    unit === 'metric' ? '°' : 'F'
  }</div>
        <div>${data.weather[0].description}</div>
        <p class="date">${date.toDateString()} ${date.getHours()}:${date.getMinutes()}</p>
        <div class="remove" onclick="removeCity('${city}')">X</div>
    </div>`;

  dashboard.children[dashboard.children.length - 1].insertAdjacentElement(
    'beforebegin',
    node
  );
}
