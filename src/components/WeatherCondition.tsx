interface WeatherConditionProps {
    humidity: number;
    windKph: number;
    pressureMb: number;
}

export function WeatherCondition({
    humidity,
    windKph,
    pressureMb
}: WeatherConditionProps) {
    return (
        <section className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
            <div className="glass-card text-center p-4 rounded-2xl shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Humedad
                </p>
                <div className="text-2xl font-semibold">
                    💧 <span>{humidity}%</span>
                </div>
            </div>
            <div className="glass-card text-center p-4 rounded-2xl shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Viento
                </p>
                <div className="text-2xl font-semibold">
                    💨 <span>{windKph} km/h</span>
                </div>
            </div>
            <div className="glass-card text-center p-4 rounded-2xl shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Presión
                </p>
                <div className="text-2xl font-semibold">
                    🌡️ <span>{pressureMb} mb</span>
                </div>
            </div>
        </section>
    );
}
