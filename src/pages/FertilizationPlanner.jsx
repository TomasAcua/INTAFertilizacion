import React, { useState, useRef } from 'react';
import { Download, Plus, BarChart2 } from 'lucide-react';
import Dolar from '../components/Dolar/Dolar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FertilizationPlanner = () => {
  // Estado para manejar múltiples productos dentro de un plan (array de objetos)
  const [productForms, setProductForms] = useState([
    { id: 1, producto: '', unidad: '', dosis: '', presentacion: '', precio: '', costo: '' }
  ]);
  
  // Estado para almacenar todos los planes con detalles de productos
  const [plans, setPlans] = useState([]);

  // Controla mostrar u ocultar el formulario de carga
  const [showForm, setShowForm] = useState(true);

  // Referencia para el gráfico para exportar a PDF
  const chartRef = useRef();

  // Añadir nuevo producto al formulario actual
  const handleAddProductForm = () => {
    setProductForms([...productForms, { id: productForms.length + 1, producto: '', unidad: '', dosis: '', presentacion: '', precio: '', costo: '' }]);
  };

  // Maneja el cambio de cada input en los productos cargados
  const handleInputChange = (id, field, value) => {
    const updatedForms = productForms.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    setProductForms(updatedForms);
  };

  // Validar que todos los campos estén completos antes de cargar plan
  const isCurrentPlanValid = () => {
    return productForms.every(product => 
      Object.values(product).every(val => val !== '' && val !== null)
    );
  };

  // Al cargar los productos como un plan completo
  const handleCargarProductos = () => {
    if (!isCurrentPlanValid()) {
      alert('Por favor, completá todos los campos de todos los productos.');
      return;
    }
    const nuevoPlan = {
      nombre: `Plan ${String.fromCharCode(65 + plans.length)}`,
      productos: productForms.map(({ id, ...rest }) => rest)
    };

    setPlans([...plans, nuevoPlan]);
    setShowForm(false);
    // Reiniciar formulario con un solo producto vacío para el próximo plan
    setProductForms([{ id: 1, producto: '', unidad: '', dosis: '', presentacion: '', precio: '', costo: '' }]);
  };

  // Al hacer click en + Agregar otro plan: muestra el formulario
  const handleAddPlan = () => {
    setShowForm(true);
  };

  // Preparar datos para gráfico: suma costos de productos en cada plan
  const chartData = {
    labels: plans.map(plan => plan.nombre),
    datasets: [
      {
        label: 'Costo por ha',
        data: plans.map(plan => 
          plan.productos.reduce((acc, prod) => acc + parseFloat(prod.costo || 0), 0)
        ),
        backgroundColor: ['#3B82F6', '#60A5FA', '#93C5FD', '#A78BFA', '#F472B6'],
      },
    ],
  };

  // Opciones para gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Comparación de costos por plan' },
    },
  };

  // Descargar PDF con lista de planes y gráfico
  const downloadPDF = async () => {
    const pdf = new jsPDF();
    let y = 10;

    plans.forEach((plan, idx) => {
      pdf.setFontSize(14);
      pdf.text(`📄 ${plan.nombre}`, 10, y);
      y += 8;

      plan.productos.forEach((prod, pIdx) => {
        pdf.setFontSize(12);
        pdf.text(`Producto ${pIdx + 1}:`, 10, y);
        y += 6;
        pdf.text(`- Producto: ${prod.producto}`, 12, y);
        y += 6;
        pdf.text(`- Unidad: ${prod.unidad}`, 12, y);
        y += 6;
        pdf.text(`- Dosis x ha: ${prod.dosis}`, 12, y);
        y += 6;
        pdf.text(`- Presentación: ${prod.presentacion}`, 12, y);
        y += 6;
        pdf.text(`- Precio por envase: $${prod.precio}`, 12, y);
        y += 6;
        pdf.text(`- Costo estimado: $${prod.costo}`, 12, y);
        y += 8;
      });

      if (y > 270 && idx < plans.length - 1) {
        pdf.addPage();
        y = 10;
      }
    });

    // Agregar gráfico en nueva página
    if (chartRef.current) {
      const chartCanvas = chartRef.current.canvas;
      const canvas = await html2canvas(chartCanvas);
      const imgData = canvas.toDataURL('image/png');
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text('📊 Comparación Gráfica', 10, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 100);
    }

    pdf.save('Planes_Fertilizacion.pdf');
  };

  // Validar para mostrar gráfico y botón PDF: mínimo 2 planes
  const isFormValid = plans.length >= 2;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">
        VISUALIZADOR DE COSTO <span className="text-gray-700">Fertilización</span>
      </h1>

      <Dolar />

      {/* Formulario de carga de productos */}
      {showForm && (
        <div className="border p-4 rounded mb-6 bg-white shadow">
          <h2 className="font-semibold text-lg mb-4">CARGA DE PRODUCTOS Y COSTOS</h2>
          {productForms.map(({ id, producto, unidad, dosis, presentacion, precio, costo }) => (
            <div key={id} className="grid grid-cols-6 gap-4 mb-4">
              <select
                className="border p-2 rounded"
                value={producto}
                onChange={e => handleInputChange(id, 'producto', e.target.value)}
              >
                <option value="" disabled>Producto</option>
                <option value="urea">Urea</option>
                <option value="fosfato">Fosfato</option>
              </select>
              <select
                className="border p-2 rounded"
                value={unidad}
                onChange={e => handleInputChange(id, 'unidad', e.target.value)}
              >
                <option value="" disabled>Unidad de dosis</option>
                <option value="kg">Kg</option>
                <option value="lts">Lts</option>
              </select>
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Dosis x ha"
                value={dosis}
                onChange={e => handleInputChange(id, 'dosis', e.target.value)}
              />
              <select
                className="border p-2 rounded"
                value={presentacion}
                onChange={e => handleInputChange(id, 'presentacion', e.target.value)}
              >
                <option value="" disabled>Presentación del envase</option>
                <option value="bolsa">Bolsa 50kg</option>
                <option value="bidon">Bidón 20lts</option>
              </select>
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Precio por envase"
                value={precio}
                onChange={e => handleInputChange(id, 'precio', e.target.value)}
              />
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Costo estimado"
                value={costo}
                onChange={e => handleInputChange(id, 'costo', e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={handleAddProductForm}
            className="flex items-center gap-1 bg-sky-500/50 hover:bg-sky-500/100 text-white text-sm px-2 py-1 rounded ml-2 transition duration-200"
          >
            <Plus className="w-3 h-3" />
            <span>Añadir producto</span>
          </button>

          <button
            onClick={handleCargarProductos}
            className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Cargar Plan
          </button>
        </div>
      )}

      {/* Planes generados */}
      <div className="border p-4 rounded bg-white shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">PLANES GENERADOS</h2>
        {plans.length === 0 && <p>No hay planes cargados aún.</p>}
        {plans.map((plan, idx) => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <strong>{plan.nombre}</strong>
            <ul className="list-disc pl-5">
              {plan.productos.map((prod, pIdx) => (
                <li key={pIdx}>
                  {prod.producto} - {prod.unidad} - Dosis: {prod.dosis} - {prod.presentacion} - Precio: ${prod.precio} - Costo: ${prod.costo}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={handleAddPlan}
          className="mt-4 text-blue-600 text-sm hover:underline"
        >
          + Agregar otro plan
        </button>
      </div>

      {/* Gráfico y botón para descargar PDF */}
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
              onClick={downloadPDF}
              className="mt-4 bg-sky-500/50 hover:bg-sky-500/100 text-white px-4 py-2 rounded"
            >
              Descargar PDF
            </button>
          </>
        ) : (
          <p className="text-gray-600">Agregá al menos dos planes válidos para visualizar el gráfico.</p>
        )}
      </div>

    
    </div>
  );
};

export default FertilizationPlanner;

