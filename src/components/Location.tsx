interface LocationProps {
    place: string;
    country: string;
    hour: string;
}

export function Location({ place, country, hour }: LocationProps) {
    return (
        <section className="text-center mb-6">
            <h2 className="text-2xl font-semibold">{`${place}, ${country}`}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{hour}</p>
        </section>
    );
}
