import { useState } from "react";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader.tsx";
import { ErrorState } from "./components/ErrorState.tsx";
import { Location } from "./components/Location";
import { CurrentTime } from "./components/CurrentTime";
import { WeatherCondition } from "./components/WeatherCondition";
import { HourlyForecast } from "./components/HourlyForecast";
import { WeeklyForecastChart } from "./components/WeeklyForecastChart";
import { useTheme } from "./hooks/useTheme";
import { useWeather } from "./hooks/useWeather";
import type { LocationQuery } from "./interfaces/locationQuery";

function App() {
    const { theme, toggleTheme } = useTheme();
    const { data, isLoading, error, fetchWeather } = useWeather();
    const [locationLabel, setLocationLabel] = useState<{
        city: string;
        country: string;
        state?: string;
    } | null>(null);

    // Función orquestadora: actualiza UI y llama a la API
    const handleLocationUpdate = (query: LocationQuery) => {
        // Almacena los nombres asociados al lugar consultado para mostrarlos en Location
        setLocationLabel({
            city: query.city,
            country: query.countryName,
            state: query.stateName
        });

        // Llamada a la API
        fetchWeather({
            city: query.city,
            country: query.countryCode,
            state: query.stateCode
        });
    };

    // Manejo de estados de carga y error
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 max-w-lg min-h-screen">
                <Header
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onSearch={handleLocationUpdate}
                />

                <ErrorState
                    message={error}
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    // Estado inicial de la App (renderizado cuando no hy datos)
    if (!data) {
        return (
            <div className="container mx-auto p-4 max-w-lg min-h-screen">
                <Header
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onSearch={handleLocationUpdate}
                />
                <p className="text-center mt-10">
                    Busca una ciudad para comenzar.
                </p>
            </div>
        );
    }

    // Renderizado con datos
    const { current, hourly, daily } = data;

    return (
        <div className="container mx-auto p-4 max-w-lg min-h-screen">
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                onSearch={handleLocationUpdate}
            />
            <Location
                city={locationLabel?.city || ""}
                country={locationLabel?.country || ""}
                state={locationLabel?.state || ""}
                hour={current.hour}
            />
            <CurrentTime
                icon={current.icon}
                tempCelsius={current.temp}
                weatherInfo={current.description}
            />
            <WeatherCondition
                humidity={current.humidity}
                windSpeedKph={current.wind_speed}
                pressure={current.pressure}
            />
            <HourlyForecast hourlyForecast={hourly} />
            <WeeklyForecastChart weeklyForecast={daily} />
        </div>
    );
}

export default App;
