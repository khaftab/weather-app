window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b9babe3c84a8d1622a5bb79ffa296604`;

      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const temp = data.main.temp;
          const description = data.weather[0].description;
          const timezone = data.name;
          temperatureDescription.innerText = description;
          temperatureDegree.innerText = Math.floor(temp - 273);
          locationTimezone.innerText = timezone;
        })
        .catch((err) => console.log(err));
    });
  }
});
