import { useMemo } from 'react';

const useChartData = (plans) => {
    // Preparar datos para el gráfico
    const chartData = useMemo(() => ({
        labels: plans.map((plan) => plan.nombre),
        datasets: [
            {
                label: "Costo por ha",
                data: plans.map((plan) => plan.total),
                backgroundColor: [
                    "#3B82F6",
                    "#60A5FA",
                    "#93C5FD",
                    "#A78BFA",
                    "#F472B6",
                ],
            },
        ],
    }), [plans]);

    // Opciones para el gráfico
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Comparación de costos por plan" },
        },
    };

    // Validar si hay suficientes planes para mostrar el gráfico
    const isFormValid = plans.length >= 2;

    return { chartData, chartOptions, isFormValid };
};

export default useChartData;