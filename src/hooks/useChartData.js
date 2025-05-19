import { useMemo } from 'react';

/**
 * Básicamente acá manejamos los useState y useEffect del componente Chart.jsx
 * useMemo es un hook de react que 'guarda' el resultado de una funcion
 * En este caso lo usamos para que 'guarde' lo que se calcula en Chart.jsx y no vuelva a calcularse acá. Si usaramos un useEffect se generaría un gráfico todo el tiempo cuando se renderice la app, aunque no tngamos nada. Si no se detectan cambios en los 'plans' entonces se sigue calculando con los resultados de antes.
 * @returns estados, handles, funciones necesarias
 */

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