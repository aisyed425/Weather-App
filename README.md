# Weather-App
A simple weather app created in visual studio code. Used HTML, CSS, and JS

## Features:
- Current weather data (temperature, condition, humidity, wind speed).
- 5-day weather forecast with temperature and condition for each day.
- "Use My Location" button to fetch weather data based on the user's current location.
- Information about the app in the "Info" section.

## Technologies Used:
- **HTML**: Structure of the web page.
- **CSS**: Styling for the user interface.
- **JavaScript**: Fetches data from the OpenWeather API and handles user interactions.
- **OpenWeather API**: Used for fetching weather data.
- **Restcountries API**: Fetches country names based on country codes.

### Instructions:
git clone https://github.com/aisyed425/Weather-App.git
cd Weather-App
Since this is a front-end project, you only need to open the index.html file in a browser.

If you want to run a local server (optional but recommended for API calls):

Using VS Code Live Server Extension:

Open the project in VS Code

Install the Live Server extension

Right-click index.html and select "Open with Live Server"
How It Works
✅ Search for Weather using a city name, zip code, or GPS coordinates
✅ Use My Location to get weather automatically using geolocation
✅ Displays Current Weather (Temperature, Humidity, Wind Speed, Condition)
✅ 5-Day Forecast for extended weather details

API Usage
This project uses the OpenWeather API. You'll need an API key:

Sign up at OpenWeather

Replace the placeholder in script.js:
