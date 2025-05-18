import { Bar } from 'react-chartjs-2';
import { BarChart2 } from 'lucide-react';

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
                    <button
                        onClick={() => onDownloadPDF(plans, chartRef)}
                        className="mt-4 bg-sky-500/50 hover:bg-sky-500/100 text-white px-4 py-2 rounded"
                    >
                        Descargar PDF
                    </button>
                </>
            ) : (
                <p className="text-gray-600">Agrega mas datos validos</p>
            )}
        </div>
    )
}

export default Chart