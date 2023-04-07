import { getWeather } from "./weather.js";
import { ICON_MAP } from "./iconMap.js";

navigator.geolocation.getCurrentPosition(positionSuccess, positiolError);
function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((err) => alert(`Error: ${err.message}`));
}
function positiolError(err) {
  console.log(err.message);
}

function renderWeather(current, daily, hourly) {
  renderCurrentWeather(current);
  renderDailyWeather(current);
  renderHourlyWeather(current);
  console.log(current);
  document.body.classList.remove("blur");
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}
function getIconUrl(code) {
  let svgName = ICON_MAP.get(code);
  return `icons/${svgName}.svg`;
}

const currentIcon = document.querySelector("[data-current-icon]");
function renderCurrentWeather({ current }) {
  currentIcon.src = getIconUrl(current.iconCode);
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.highTemp);
  setValue("current-low", current.lowTemp);
  setValue("current-fl-high", current.highFeelsLike);
  setValue("current-fl-low", current.lowFeelsLike);
  setValue("current-wind", current.windSpeed);
  setValue("current-precip", current.precip);
}

const dailySection = document.querySelector("[data-day-section]");
const dailyTemplate = document.getElementById("day-card-template");
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });

function renderDailyWeather({ daily }) {
  dailySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dailyTemplate.content.cloneNode(true);
    setValue("temp", day.maxTemp, { parent: element });

    setValue("day", DAY_FORMATTER.format(day.timeStamp), { parent: element });
    element.querySelector("[data-icon]").src = getIconUrl(day.iconCode);
    dailySection.append(element);
  });
}

//hourly section
const hourlySection = document.querySelector("[data-hour-section]");
const hourlyTemplate = document.getElementById("hour-row-template");
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" });

function renderHourlyWeather({ hourly }) {
  hourlySection.innerHTML = "";
  hourly.forEach((hour) => {
    const element = hourlyTemplate.content.cloneNode(true);
    setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element });
    setValue("temp", hour.temp, { parent: element });
    setValue("precip", hour.precip, { parent: element });
    setValue("wind", hour.windSpeed, { parent: element });
    setValue("fl-temp", hour.feelsLike, { parent: element });
    setValue("time", HOUR_FORMATTER.format(hour.timestamp), {
      parent: element,
    });
    element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode);
    hourlySection.append(element);
  });
}
