import { Header } from "./components/Header";
import { Location } from "./components/Location";
import { CurrentTime } from "./components/CurrentTime";
import { WeatherCondition } from "./components/WeatherCondition";
import { HourlyForecast } from "./components/HourlyForecast";
import { WeeklyForecastChart } from "./components/WeeklyForecastChart";
import { useTheme } from "./hooks/useTheme";
import data from "./mocks/with-results.json";

interface WeeklyForecastData {
    labels: string[];
    maxTemps: number[];
    minTemps: number[];
}

function App() {
    const { theme, toggleTheme } = useTheme();
    const currentTime = data.current;
    const currentWeather = data.current.weather;

    const formatUnixToLocalTime = (unixTimestamp: number) => {
        const date = new Date(unixTimestamp * 1000);

        const timeString = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        return timeString.replace(/\./g, "").toUpperCase();
    };

    const getSpecificHourlyForecast = (hourlyData: any[]) => {
        // Horas específicas a mostrar
        const targetHours = [
            "06:00 AM",
            "09:00 AM",
            "12:00 PM",
            "03:00 PM",
            "06:00 PM",
            "09:00 PM",
            "12:00 AM"
        ];

        const icons = ["🌥️", "☀️", "☀️", "🌤️", "🌥️", "🌙", "🌙"];

        const forecastLookup = new Map<string, number>();

        const allHours = hourlyData.slice(0, 24);

        // Normalización de los datos
        for (const forecast of allHours) {
            const hourString = formatUnixToLocalTime(forecast.dt);
            const temp = Math.round(forecast.temp);

            forecastLookup.set(hourString, temp);
        }

        // Construcción del array final iterando sobre nuestras horas objetivo
        const hourlyForecast = [];

        for (let i = 0; i < targetHours.length; i++) {
            const time = targetHours[i];
            const icon = icons[i];
            const temp = forecastLookup.get(time);

            if (temp !== undefined) {
                hourlyForecast.push({
                    time: time,
                    temp: temp,
                    icon: icon
                });
            }
        }

        return hourlyForecast;
    };
    const getWeeklyForecastData = (dailyData: any[]): WeeklyForecastData => {
        const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

        // Almacenamiento final de los datos
        const processedData: WeeklyForecastData = {
            labels: [],
            maxTemps: [],
            minTemps: []
        };

        const weeklySlice = dailyData.slice(0, 7);

        for (const day of weeklySlice) {
            const date = new Date(day.dt * 1000);
            const dayIndex = date.getDay(); // 0 (Domingo) a 6 (Sábado)

            const label = day === weeklySlice[0] ? "Hoy" : dayNames[dayIndex];

            const maxTemp = Math.round(day.temp.max);
            const minTemp = Math.round(day.temp.min);

            processedData.labels.push(label);
            processedData.maxTemps.push(maxTemp);
            processedData.minTemps.push(minTemp);
        }

        return processedData;
    };
    
    const hourlyForecast = getSpecificHourlyForecast(data.hourly);
    
    const weeklyForecastData = getWeeklyForecastData(data.daily);
    
    return (
        <div className="container mx-auto p-4 max-w-lg min-h-screen">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Location
                place={data.timezone}
                hour={formatUnixToLocalTime(currentTime.dt)}
            />
            <CurrentTime
                iconCode={currentWeather[0].icon}
                tempCelsius={currentTime.temp}
                weatherInfo={currentWeather[0].description}
            />
            <WeatherCondition
                humidity={currentTime.humidity}
                windSpeedKph={currentTime.wind_speed}
                pressure={currentTime.pressure}
            />
            <HourlyForecast hourlyForecast={hourlyForecast} />
            <WeeklyForecastChart weeklyForecast={weeklyForecastData} />
        </div>
    );
}

export default App;
