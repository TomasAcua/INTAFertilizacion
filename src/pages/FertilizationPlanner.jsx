import React from 'react';
import { Download, Plus, BarChart2 } from 'lucide-react';
import Dolar from '../components/Dolar/Dolar';

const FertilizationPlanner = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">
        VISUALIZADOR DE COSTO <span className="text-gray-700">Fertilización</span>
      </h1>

      <Dolar/>

      {/* Productos */}
      <div className="border p-4 rounded mb-6 bg-white shadow">
        <h2 className="font-semibold text-lg mb-4">CARGA DE PRODUCTOS Y COSTOS</h2>
        <div className="grid grid-cols-6 gap-4 mb-4">
          <select className="border p-2 rounded" placeholder="Producto" />
          <select className="border p-2 rounded" placeholder="Unidad de dosis" />
          <input type="text" className="border p-2 rounded" placeholder="Dosis x ha" />
          <select className="border p-2 rounded" placeholder="Presentación" />
          <input type="text" className="border p-2 rounded" placeholder="Precio por envase" />
          <input type="text" className="border p-2 rounded" placeholder="Costo estimado" />
        </div>
        <button className="text-blue-600 hover:underline flex items-center">
          <Plus className="w-4 h-4 mr-1" /> Añadir Producto
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Planes */}
        <div className="border p-4 rounded bg-white shadow">
          <h2 className="font-semibold text-lg mb-4">GENERACIÓN Y COMPARACIÓN DE PLANES de fertilización</h2>
          <div className="flex flex-col gap-2">
            <textarea placeholder="Plan A" className="border p-2 rounded h-20" />
            <textarea placeholder="Plan B" className="border p-2 rounded h-20" />
          </div>
        </div>

        {/* Gráfica */}
        <div className="border p-4 rounded bg-white shadow">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-gray-700" />
            <h2 className="font-semibold text-lg">VISUALIZACIÓN GRÁFICA</h2>
          </div>
          <p className="text-sm mb-2">Costo total por ha<br />Número de productos</p>
          <div className="h-32 bg-gray-200 rounded flex items-end justify-around p-2">
            <div className="bg-gray-500 w-6 h-3/4"></div>
            <div className="bg-gray-400 w-6 h-1/2"></div>
            <div className="bg-gray-500 w-6 h-2/3"></div>
            <div className="bg-gray-400 w-6 h-1/3"></div>
          </div>
          <p className="text-center mt-2 text-sm">Planes de fertilización</p>
        </div>

        {/* Exportación */}
        <div className="border p-4 rounded bg-white shadow flex flex-col justify-between">
          <h2 className="font-semibold text-lg mb-4">EXPORTACIÓN / IMPRESIÓN</h2>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FertilizationPlanner;
