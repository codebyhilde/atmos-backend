import { Header } from "./components/Header";
import { Location } from "./components/Location";
import { CurrentTime } from "./components/CurrentTime";
import { WeatherCondition } from "./components/WeatherCondition";
import { HourlyForecast } from "./components/HourlyForecast";
import { useToggleTheme } from "./hooks/useToggleTheme";
import forecast from "./mocks/forecast.json"
import data from "./mocks/with-results.json";

function App() {
    const { theme, toggleTheme } = useToggleTheme();
    const location = data.location;
    const currentTime = data.current;

    return (
        <div class="container mx-auto p-4 max-w-lg min-h-screen">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Location
                place={location.name}
                country={location.country}
                hour={location.localtime.split(" ").slice(1)}
            />
            <CurrentTime
                iconUrl={currentTime.condition.icon}
                tempCelsius={currentTime.temp_c}
                weatherInfo={currentTime.condition.text}
            />
            <WeatherCondition
                humidity={currentTime.humidity}
                windKph={currentTime.wind_kph}
                pressureMb={currentTime.pressure_mb}
            />
            <HourlyForecast hourlyForecast={forecast.hourly}/>
        </div>
    );
}

export default App;
