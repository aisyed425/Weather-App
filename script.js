const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your API key

async function getWeather() {
    const location = document.getElementById('location').value.trim();

    if (!location) {
        alert('Please enter a location!');
        return;
    }

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

    // Check if input is a ZIP code (numeric and length >= 5)
    if (!isNaN(location) && location.length >= 5) {
        const countryCode = 'US'; // Modify this for other countries if needed
        apiUrl += `&zip=${location},${countryCode}`; // Use country code for ZIP code
    } 
    // Check if input is coordinates (latitude,longitude)
    else if (location.includes(',') && location.split(',').length === 2) {
        const coords = location.split(',');
        const lat = parseFloat(coords[0].trim());
        const lon = parseFloat(coords[1].trim());
        
        // Validate if lat and lon are within valid ranges
        if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
            apiUrl += `&lat=${lat}&lon=${lon}`;
        } else {
            alert('Invalid coordinates format. Ensure latitude (-90 to 90) and longitude (-180 to 180).');
            return;
        }
    }
    // Otherwise, treat as city name
    else {
        apiUrl += `&q=${location}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const cityName = data.name;
            const countryCode = data.sys.country; // Extract country code
            
            // Fetch full country name from the Restcountries API
            const countryName = await getCountryName(countryCode);

            // Fetch and display the 5-day forecast
            displayForecast(location);

            document.getElementById('weather-result').innerHTML = `
                <h2>Weather in ${cityName}, ${countryName}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            alert('Location not found. Try again or check the coordinates.');
        }
    } catch (error) {
        alert('Error fetching weather data. Please check your input or try again later.');
    }
}

// Fetch the 5-day forecast
async function displayForecast(location) {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(forecastApiUrl);
        const data = await response.json();

        if (response.ok) {
            const forecastData = data.list.filter((item, index) => index % 8 === 0); // 8 entries per day

            let forecastHTML = '<h3>5-Day Forecast:</h3>';
            forecastData.forEach((forecast) => {
                const date = new Date(forecast.dt_txt).toLocaleDateString();
                const temp = forecast.main.temp;
                const description = forecast.weather[0].description;

                forecastHTML += `
                    <div>
                        <h4>${date}</h4>
                        <p>Temperature: ${temp}°C</p>
                        <p>Condition: ${description}</p>
                    </div>
                `;
            });

            document.getElementById('forecast-result').innerHTML = forecastHTML;
        } else {
            alert('Error fetching 5-day forecast.');
        }
    } catch (error) {
        alert('Error fetching 5-day forecast.');
    }
}

// Function to get the full country name from the country code
async function getCountryName(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const countryData = await response.json();
        return countryData[0].name.common; // Extract the common name of the country
    } catch (error) {
        console.error('Error fetching country name:', error);
        return countryCode; // Fallback to country code if the API fails
    }
}

function showInfo() {
    alert(`Created by: Ahmed Syed\n\nProduct Manager Accelerator Program\n\nThe PM Accelerator Program supports professionals through every stage of their careers. From students to directors, our program has helped hundreds fulfill their career aspirations. Our community is ambitious and committed, learning new PM and leadership skills for their future endeavors.`);
}

// Keep the existing content intact and add the buttons once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Create container for buttons
    const buttonContainer = document.createElement('div');
    
    // Add "Use My Location" button only once
    const useMyLocationButton = document.createElement("button");
    useMyLocationButton.innerText = "Use My Location";
    useMyLocationButton.onclick = getLocationWeather;
    buttonContainer.appendChild(useMyLocationButton);

    // Add "Info" button only once
    const infoButton = document.createElement("button");
    infoButton.innerText = "Info";
    infoButton.onclick = showInfo;
    buttonContainer.appendChild(infoButton);

    // Append button container to the body, or to a specific div if needed
    document.body.appendChild(buttonContainer);
});

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lat=${lat}&lon=${lon}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (response.ok) {
                    const cityName = data.name;
                    const countryCode = data.sys.country; // Extract country code
                    
                    // Fetch full country name from the Restcountries API
                    const countryName = await getCountryName(countryCode);

                    // Fetch and display the 5-day forecast
                    displayForecast(`${lat},${lon}`);

                    document.getElementById('weather-result').innerHTML = `
                        <h2>Weather in ${cityName}, ${countryName}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Condition: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    `;
                } else {
                    alert('Error fetching weather data for your location.');
                }
            } catch (error) {
                alert('Error fetching weather data for your location.');
            }
        }, (error) => {
            alert('Geolocation error: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}
