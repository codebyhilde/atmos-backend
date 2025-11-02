interface CurrentTimeProps {
    iconUrl: string;
    tempCelsius: number;
    weatherInfo: string;
}

export function CurrentTime({
    iconUrl,
    tempCelsius,
    weatherInfo
}: CurrentTimeProps) {
    return (
        <section className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <img className="h-24 w-auto" src={iconUrl} alt={`${weatherInfo} icon`} />
            </div>
            <div className="text-7xl font-bold">
                {tempCelsius}
                <span className="text-5xl align-top">°C</span>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300">
                {weatherInfo}
            </p>
        </section>
    );
}
