interface HourlyWeatherForecast {
    time: string;
    icon: string;
    temp: number;
}

interface HourlyForecastProps {
    hourlyForecast: HourlyWeatherForecast[];
}

export function HourlyForecast({ hourlyForecast }: HourlyForecastProps) {
    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Pronóstico por Hora</h3>
            <div className="relative">
                <div
                    className="flex space-x-4 overflow-x-auto pb-4"
                >
                    {hourlyForecast.map((forecast, index) => (
                        <div
                            className="glass-card flex-shrink-0 w-24 text-center p-4 rounded-2xl shadow-lg"
                            key={index}
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {forecast.time}
                            </p>
                            <div className="text-3xl mb-2">{forecast.icon}</div>
                            <div className="text-xl font-semibold">
                                {forecast.temp}°
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
