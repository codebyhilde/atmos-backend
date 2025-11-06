import { useWeeklyForecastChart } from '../hooks/useWeeklyForecastChart';
import { Line } from 'react-chartjs-2';

interface WeeklyData {
    labels: string[];
    maxTemps: number[];
    minTemps: number[];
}

interface WeeklyForecastChartProps {
    weeklyForecast: WeeklyData;
}

export function WeeklyForecastChart( { weeklyForecast }:WeeklyForecastChartProps ) {
    const { data, options } = useWeeklyForecastChart({weeklyForecast});
    
    return (
        <section>
            <h3 className="text-lg font-semibold mb-4">Pronóstico Semanal</h3>
            <div className="chart-container glass-card rounded-2xl p-4 shadow-lg">
                <Line options={options} data={data} />
            </div>
        </section>
    );
}
