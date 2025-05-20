import { Bar } from 'react-chartjs-2';
import { BarChart2 } from 'lucide-react';
import Button from "../Button/Button"

const Chart = ({ isFormValid, chartData, chartOptions, chartRef, onDownloadPDF, plans }) => {
    return (
        <div className="border p-4 rounded bg-white shadow mb-6">
            <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-lg">VISUALIZACIÓN GRÁFICA</h2>
            </div>

            {isFormValid ? (
                <>
                    <div id="grafico" className="bg-white p-2">
                        <Bar ref={chartRef} data={chartData} options={chartOptions} />
                    </div>
                    <Button
                        onClick={() => onDownloadPDF(plans, chartRef)}
                        className="mt-4 bg-sky-500 hover:bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Descargar PDF
                    </Button>
                </>
            ) : (
                <p className="text-gray-600">Agrega 2 planes para la visualización gráfica</p>
            )}
        </div>
    )
}

export default Chart