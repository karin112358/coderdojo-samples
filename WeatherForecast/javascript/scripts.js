/*node browser: true */ /*global $ console document openWeatherMapUrl luisUrl */
'use strict';

class TimeRange {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

function getDate(time) {
    return new Date(time.getFullYear(), time.getMonth(), time.getDate());
}

function showLuisResponse(message) {
    $('#luisResponse').html('<pre>' + message + '</pre>');
    $('#luisResponse').show();
}

function showWeatherResponse(message) {
    $('#weatherResponse').html('<pre>' + message + '</pre>');
    $('#weatherResponse').show();
}

function showError(message) {
    $('#luisResponse').hide();
    $('#weatherResponse').hide();
    $('#weatherForecast').hide();
    $('#error').html(message);
    $('#error').show();
}

function resetResponseMessages() {
    $('#luisResponse').hide();
    $('#weatherResponse').hide();
    $('#weatherForecast').hide();
    $('#error').html('');
    $('#error').hide();
}

function showForecast(timeRange, data) {
    var result = '';

    data.list.forEach(item => {
        var dateTime = new Date(item.dt_txt);
        var date = getDate(dateTime);
        if (date >= timeRange.startDate && date <= timeRange.endDate) {
            result += '<div class="forecast">';
            result += '<div class="image"><img src="https://openweathermap.org/img/w/' + item.weather[0].icon + '.png"></div>';
            result += '<div class="temp">' + item.main.temp_max + '&deg; C</div>';
            result += '<div class="time">' + dateTime.getDate() + '.' + dateTime.getDate() + '. ' + dateTime.getHours() + ':00</div>';
            result += '</div>';
        }
    });

    $('#weatherForecast').html(result);
    $('#weatherForecast').show();
}

function getLocation(data) {
    var entity = data.entities.find((entity) => entity.type === 'builtin.geographyV2.city');
    if (entity) {
        return entity.entity;
    }

    entity = data.entities.find((entity) => entity.type.indexOf('builtin.geographyV2.') === 0);
    if (entity) {
        throw new Error('Please provide a city name instead of ' + entity.entity);
    }

    return 'Linz';
}

function getTimeRange(data) {
    var timeRange;

    var entity = data.entities.find((entity) => entity.type === 'builtin.datetimeV2.date');
    if (entity) {
        var date = getDate(new Date(entity.resolution.values[0].value));
        return new TimeRange(date, date);
    }

    entity = data.entities.find((entity) => entity.type === 'builtin.datetimeV2.daterange');
    if (entity) {
        return new TimeRange(getDate(new Date(entity.resolution.values[0].start)), getDate(new Date(entity.resolution.values[0].end)));
    }

    var today = getDate(new Date());
    return new TimeRange(today, today);
}

function getWeather(data) {
    try {
        var location = getLocation(data);
        var timeRange = getTimeRange(data);

        $.get(openWeatherMapUrl + encodeURIComponent(location), function (data) {
            showWeatherResponse(JSON.stringify(data, null, 4));
            showForecast(timeRange, data);
        });
    } catch (e) {
        showError(e.message);
    }
}

function getResponse() {
    resetResponseMessages();
    var query = $('#weatherQuery').val();

    if (query) {
        $.get(luisUrl + encodeURIComponent(query), function (data) {
            showLuisResponse(JSON.stringify(data, null, 4));

            if (data.topScoringIntent && data.topScoringIntent.intent === 'Weather.GetForecast') {
                getWeather(data);
            } else {
                showError('The query does not seem to be a weather forecast query.');
            }
        });
    } else {
        showError('Please enter a weather query.');
    }
}

$(document).ready(function () {
    $('body').bootstrapMaterialDesign();
    resetResponseMessages();
});