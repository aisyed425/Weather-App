# Weather App ☀️
A simple weather application that fetches real-time weather data using the **OpenWeather API**. Users can search by city, zip code, or GPS location to get current weather details and a 5-day forecast.

## Installation & Setup
Follow these steps to run the project on your local machine:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aisyed425/Weather-App.git
cd Weather-App
```

### 2️⃣ Open the Project
Since this is a front-end project, you only need to open the `index.html` file in a browser.  

If you want to run a local server (optional but recommended for API calls):  

- **Using VS Code Live Server Extension**:  
  1. Open the project in **VS Code**  
  2. Install the **Live Server** extension  
  3. Right-click `index.html` and select **"Open with Live Server"**  

- **Using Python HTTP Server**:  
  ```bash
  python -m http.server 8000
  ```
  Then open `http://localhost:8000/` in your browser.

## How It Works
✅ **Search for Weather** using a city name, zip code, or GPS coordinates  
✅ **Use My Location** to get weather automatically using geolocation  
✅ **Displays Current Weather** (Temperature, Humidity, Wind Speed, Condition)  
✅ **5-Day Forecast** for extended weather details  

## API Usage
This project uses the **OpenWeather API**. You'll need an API key:  
1. Sign up at [OpenWeather](https://openweathermap.org/)  
2. Replace the placeholder in `script.js`:  

   ```js
   const API_KEY = 'your-api-key-here';
   ```

## Technologies Used
- HTML, CSS, JavaScript  
- OpenWeather API  
- Geolocation API  

## Contributing
Feel free to fork the repo and submit pull requests. 🎉  
