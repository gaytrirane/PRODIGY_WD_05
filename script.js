document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const fetchWeatherButton = document.getElementById('fetchWeather');
    const weatherInfo = document.getElementById('weatherInfo');
    
    const displayWeather = (data) => {
        const { name, main, weather } = data;
        const temperature = (main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
        const description = weather[0].description;

        weatherInfo.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${description}</p>
        `;
    };
    
    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
            if (!response.ok) throw new Error('Location not found');
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    };
    
    fetchWeatherButton.addEventListener('click', () => {
        const location = document.getElementById('location').value;
        if (location) {
            fetchWeatherData(location);
        } else {
            weatherInfo.innerHTML = '<p>Please enter a location.</p>';
        }
    });
});
