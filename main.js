import { getWeather } from "./weather.js";
import { ICON_MAP } from "./iconMap.js";
getWeather(
  16.907191,
  96.097532,
  Intl.DateTimeFormat().resolvedOptions().timeZone
)
  .then(renderWeather)
  .catch((err) => alert(`Error: ${err.message}`));

function renderWeather(current, daily, hourly) {
  renderCurrentWeather(current);
  renderDailyWeather(current);
  // renderHourlyWeather(current)
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
