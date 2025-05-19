import { useRef, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import useProductForm from '../hooks/useProductForm'
import usePlanList from '../hooks/usePlanList'
import useChartData from '../hooks/useChartData'
import useGeneradorPDF from '../hooks/useGeneradorPDF'

import Dolar from '../components/Dolar/Dolar'
import ProductForm from '../components/ProductForm/ProductForm'
import PlanList from '../components/PlanList/PlanList'
import Chart from '../components/Chart/Chart'

/**
 * Acá traemos la importacion de la lógica de los hooks y el renderizado de los componentes
 * Si queremos agregar estilos y demás, vamos a los componentes y los pasamos por classname como siempre
 * FALTA VER LO DEL DOLAR (linea 60 a 74) Y ALGUNAS COSITAS MAS
 * El resto de compos están (boton, titulo y seguro falten algunos chiches más) pero falta agregarlos
 */

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FertilizationPlanner = () => {

  const {
    productForms,
    addProductForm,
    handleInputChange,
    deleteProductForm,
    cleanProducts,
    isCurrentPlanValid,
    resetProductForms
  } = useProductForm()

  const {
    plans,
    showForm,
    addPlan,
    cleanPlans,
    showAddPlanForm
  } = usePlanList()

  const { chartData, chartOptions, isFormValid } = useChartData(plans)
  const { downloadPDF } = useGeneradorPDF()

  const chartRef = useRef(); // <- buscar

  const [currentDolarValue, setCurrentDolarValue] = useState(
    localStorage.getItem("dolarOficial") || 0
  );

  // Actualiza el valor del dólar en el estado
  const updateDolarValue = (newValue) => {
    setCurrentDolarValue(newValue);
  };

  // Handler para cargar productos como un nuevo plan
  const handleCargarProductos = () => {
    if (!isCurrentPlanValid()) {
      alert('Por favor, complete todos los datos requeridos.');
      return;
    }

    addPlan(productForms);
    resetProductForms();
  };

  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen w-%100 font-sans">
      <h1 className="text-3xl font-bold text-center">
        VISUALIZADOR DE COSTO{" "}
        <span className="text-gray-700">Fertilización</span>
      </h1>

      <Dolar onDolarChange={updateDolarValue} />

      {showForm && (
        <ProductForm
          productForms={productForms}
          handleInputChange={handleInputChange}
          addProductForm={addProductForm}
          deleteProductForm={deleteProductForm}
          cleanProducts={cleanProducts}
          handleCargarProductos={handleCargarProductos}
        />
      )}

      <PlanList
        plans={plans}
        onAddPlan={showAddPlanForm}
        onCleanPlans={cleanPlans}
        currentDolarValue={currentDolarValue}
      />

      <Chart
        isFormValid={isFormValid}
        chartData={chartData}
        chartOptions={chartOptions}
        chartRef={chartRef}
        onDownloadPDF={downloadPDF}
        plans={plans}
      />
    </div>
  )
}

export default FertilizationPlanner
