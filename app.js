window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".cloud-info p");
  const temperatureDegree = document.querySelector(".temp");
  const locationTimezone = document.querySelector(".card-city");
  const iconDOM = document.querySelector(".icon");
  const maxTemp = document.querySelector(".max-temp");
  const minTemp = document.querySelector(".min-temp");
  const feelsLike = document.querySelector(".feels-like p");
  const humidityDOM = document.querySelector(".humidity p");
  const cloudImage = document.querySelector(".card > img");
  const cityName = document.querySelector(".card-city");
  const cityDot = document.querySelector(".city-section div");

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
          const { temp, temp_max, temp_min, feels_like, humidity } = data.main;
          const { description, icon } = data.weather[0];
          const timezone = data.name;

          temperatureDescription.innerText = description;
          temperatureDegree.innerHTML = `${Math.floor(temp - 273)}&deg;C`;
          locationTimezone.innerText = timezone;
          feelsLike.innerContent = `${feels_like}&deg;`;
          maxTemp.innerHTML = `${Math.floor(temp_max - 273)}&deg;C`;
          minTemp.innerHTML = `${Math.floor(temp_min - 273)}&deg;C`;
          humidityDOM.innerHTML = `${humidity}%`;

          // calling the setIcon function
          setIcons(icon);
          changeColor(icon);
        })
        .catch((err) => console.log(err));
    });

    const setIcons = (iconID) => {
      iconDOM.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconID}@2x.png"/>`;
    };

    const changeColor = (icon) => {
      if (icon.includes("n")) {
        cloudImage.src = "./asset/night_image.svg";
        cityName.style.color = "#fff";
        cityDot.style.color = "#fff";
      } else {
        console.log("false");
      }
    };
  }
});
