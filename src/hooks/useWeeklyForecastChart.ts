import { useMemo } from 'react';
import { useTheme } from "./useTheme";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface WeeklyData {
    labels: string[];
    maxTemps: number[];
    minTemps: number[];
}

interface useWeeklyForecastChartArgs {
    weeklyForecast: WeeklyData;
}

export function useWeeklyForecastChart({
    weeklyForecast
}: useWeeklyForecastChartArgs) {
    const { theme } = useTheme();
    const [gridColor, labelColor, colorMax, colorMin, tooltipBg, tooltipText] =
        useMemo(() => {
            const grid =
                theme === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)";
            const label = theme === "dark" ? "#e5e7eb" : "#374151";
            const max = theme === "dark" ? "#fb923c" : "#f97316";
            const min = theme === "dark" ? "#60a5fa" : "#3b82f6";
            const bg = theme === "dark" ? "#1f2937" : "#ffffff";
            const text = theme === "dark" ? "#e5e7eb" : "#374151";

            return [grid, label, max, min, bg, text];
        }, [theme]);

    const data: ChartData<"line"> = useMemo(
        () => ({
            labels: weeklyForecast.labels,
            datasets: [
                {
                    label: "Max",
                    data: weeklyForecast.maxTemps,
                    borderColor: colorMax,
                    backgroundColor: colorMax,
                    tension: 0.3,
                    borderWidth: 3
                },
                {
                    label: "Min",
                    data: weeklyForecast.minTemps,
                    borderColor: colorMin,
                    backgroundColor: colorMin,
                    tension: 0.3,
                    borderWidth: 3
                }
            ]
        }),
        [colorMax, colorMin, weeklyForecast]
    );

    const options: ChartOptions<"line"> = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: labelColor,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    mode: "index",
                    intersect: false,
                    backgroundColor: tooltipBg,
                    titleColor: tooltipText,
                    bodyColor: tooltipText,
                    borderColor: gridColor,
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: { color: labelColor },
                    grid: { color: gridColor }
                },
                y: {
                    ticks: { color: labelColor },
                    grid: { color: gridColor }
                }
            }
        }),
        [labelColor, gridColor, tooltipBg, tooltipText]
    );

    return { data, options };
}
