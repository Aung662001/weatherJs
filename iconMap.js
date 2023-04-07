export const ICON_MAP = new Map();

addMapping([0, 1], "sun");
addMapping([2, 3], "cloud-sun");
addMapping([45, 48], "cloud");
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67], "cloud-showers-heavy");
addMapping([71, 73, 75, 77, 85, 86, 80, 81, 82], "snowflake");
addMapping([95, 96, 99], "cloud-bolt");
function addMapping(values, icon) {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
}
