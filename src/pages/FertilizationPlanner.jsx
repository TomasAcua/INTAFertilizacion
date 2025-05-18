import React, { useState, useRef, useEffect } from "react";
import { Download, Plus, BarChart2 } from "lucide-react";
import Dolar from "../components/Dolar/Dolar";
import ProductForm from "../components/ProductForm/ProductForm";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import useGeneradorPDF from '../hooks/useGeneradorPDF'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FertilizationPlanner = () => {

  const { downloadPDF } = useGeneradorPDF();

  // Estado para manejar el valor del dólar
  const [currentDolarValue, setCurrentDolarValue] = useState(
    localStorage.getItem("dolarOficial") || 0
  );

  // Actualiza el valor del dólar en el estado
  const updateDolarValue = (newValue) => {
    setCurrentDolarValue(newValue);
  };

  // Valores por defecto para los errores de validación
  const defaultErrors = {
    producto: "",
    unidad: "",
    presentacion: "",
    dosis: "",
    precio: "",
    tratamientos: "",
  };

  // Estado para manejar múltiples productos dentro de un plan (array de objetos)
  const [productForms, setProductForms] = useState(JSON.parse(localStorage.getItem("productForms")) || [{
    id: 1,
    producto: "",
    unidad: "",
    dosis: "",
    presentacion: "",
    precio: "",
    tratamientos: "",
    costo: "",
    errors: defaultErrors,
  }]);

  // Estado para manejar los ID de los formularios de productos
  const storedProductForms = JSON.parse(localStorage.getItem("productForms"));
  const [lastProductId, setLastProductId] = useState(storedProductForms ? storedProductForms[storedProductForms.length-1].id : 1);

  // Función para calcular el costo basado en dosis, precio y tratamientos
  // Solo realizar el cálculo si los valores son números y mayores a 0
  const calcularCosto = (id, field, value) => {
    const productForm = productForms.find((form) => form.id === id);
    const { dosis, precio, tratamientos } = productForm;

    const dosisIsNumber = !isNaN(dosis) && parseFloat(dosis) > 0;
    const precioIsNumber = !isNaN(precio) && parseFloat(precio) > 0;
    const tratamientosIsNumber = !isNaN(tratamientos) && parseFloat(tratamientos) > 0;
    const valueIsNumber = !isNaN(value) && parseFloat(value) > 0;

    let costo = "";
    if(field === "dosis" && valueIsNumber && precioIsNumber && tratamientosIsNumber){
      costo = (parseFloat(value) * parseFloat(precio) * parseFloat(tratamientos)).toFixed(2);
    }else if(field === "precio" && dosisIsNumber && valueIsNumber && tratamientosIsNumber){
      costo = (parseFloat(dosis) * parseFloat(value) * parseFloat(tratamientos)).toFixed(2);
    }else if(field === "tratamientos" && dosisIsNumber && precioIsNumber && valueIsNumber){
      costo = (parseFloat(dosis) * parseFloat(precio) * parseFloat(value)).toFixed(2);
    }
    return costo;
  };

  // Función para actualizar los valores de los campos del formulario
  const updateProductForm = (id, field, value) => {
    const newErrors = validate(field, value);
    const updatedProductForms = productForms.map((form) => {
      if (form.id === id) {
        const errors = { ...form.errors, ...newErrors };
        const costo = calcularCosto(id, field, value);
        return { ...form, [field]: value, costo, errors };
      }
      return form;
    });
    setProductForms(updatedProductForms);
  };

  // Función para agregar un nuevo formulario de producto
  const addProductForm = () => {
    const newForm = {
      id: lastProductId + 1,
      producto: "",
      unidad: "",
      dosis: "",
      presentacion: "",
      precio: "",
      tratamientos: "",
      costo: "",
      errors: defaultErrors,
    };
    setProductForms((prevForms) => [...prevForms, newForm]);
    setLastProductId(lastProductId + 1);
  };

  // Función para eliminar un formulario de producto
  const deleteProductForm = (id) => {
    if (productForms.length !== 1) {
      const newProductForms = productForms.filter((form) => form.id !== id);
      setProductForms(newProductForms);
    }
  };

  //Funcion para limpiar los productos cargados
  const cleanProducts = () => {
    if(productForms.length === 1){
      const updatedProductForms = productForms.map((form) => {
        return { ...form, producto: "", unidad: "", dosis: "", presentacion: "", precio: "", tratamientos: "", costo: "", errors: defaultErrors };
      });
      setProductForms(updatedProductForms);
    }else{
      setProductForms([{
        id: lastProductId,
        producto: "",
        unidad: "",
        dosis: "",
        presentacion: "",
        precio: "",
        tratamientos: "",
        costo: "",
        errors: defaultErrors,
      }]);
    }
  }

  // Estado para almacenar todos los planes con detalles de productos
  const [plans, setPlans] = useState(JSON.parse(localStorage.getItem("plans")) || []);

  // Función para agregar un nuevo plan basado en los productos cargados
  const addPlan = () => {
    const newPlan = {
      nombre: `Plan ${String.fromCharCode(65 + plans.length)}`,
      productos: productForms.map(({ id, ...rest }) => rest),
      total: productForms.reduce(
        (acc, prod) => acc + parseFloat(prod.costo),
        0
      ),
    };
    setPlans([...plans, newPlan]);
    setProductForms([{
      id: lastProductId + 1,
      producto: "",
      unidad: "",
      dosis: "",
      presentacion: "",
      precio: "",
      tratamientos: "",
      costo: "",
      errors: defaultErrors,
    }]);
    setLastProductId(lastProductId + 1);
  };

  // Guardar los formularios de productos en el localStorage cada vez que cambian
  useEffect(() => {
    const storedProductForms = productForms.map((form) => {
      const { errors, ...rest } = form;
      return {...rest, errors: defaultErrors};
    })
    localStorage.setItem("productForms", JSON.stringify(storedProductForms));
  }, [productForms]);

  // Función para limpiar los planes cargados
  const cleanPlans = () => {
    setPlans([]);
  }

  // Guardar los planes en el localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  },[plans]);

  // Función de validación para cada campo del formulario
  const validate = (field, value) => {
    const newErrors = {}
    switch(field){
      case "producto": case "unidad": case "presentacion":
        if(!value){
          newErrors[field] = `El campo ${field} es obligatorio`;
        }else{
          newErrors[field] = "";
        }
        break;
      case "dosis": case "precio": case "tratamientos":
        if(!value){
          newErrors[field] = `El campo ${field} es obligatorio`;
        }else if(isNaN(value) || parseFloat(value) <= 0){
          newErrors[field] = `El campo ${field} debe ser un número positivo`;
        }else{
          newErrors[field] = "";
        }
        break;
    }
    return newErrors;
  }

  // Función para validar los formularios de productos antes de agregar un nuevo plan
  // Verifica si todos los campos son válidos y actualiza el estado de errores
  const checkForms = () => {
    let valid = true;

    const updatedProductForms = productForms.map((form) => {
      const newErrors = {
        producto: validate("producto", form.producto).producto,
        unidad: validate("unidad", form.unidad).unidad,
        presentacion: validate("presentacion", form.presentacion).presentacion,
        dosis: validate("dosis", form.dosis).dosis,
        precio: validate("precio", form.precio).precio,
        tratamientos: validate("tratamientos", form.tratamientos).tratamientos,
      };
      return {...form, errors: newErrors };
    })

    valid = updatedProductForms.every((form) => {
      return (
        form.errors.producto === "" &&
        form.errors.unidad === "" &&
        form.errors.presentacion === "" &&
        form.errors.dosis === "" &&
        form.errors.precio === "" &&
        form.errors.tratamientos === ""
      );
    })

    if(valid){
      addPlan();
    }else{
      setProductForms(updatedProductForms);
    }
  };

  // Referencia para el gráfico para exportar a PDF
  const chartRef = useRef();

  // Preparar datos para gráfico: suma costos de productos en cada plan
  const chartData = {
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
  };

  // Opciones para gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Comparación de costos por plan" },
    },
  };

  // Validar para mostrar gráfico y botón PDF: mínimo 2 planes
  const isFormValid = plans.length >= 2;

  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen w-%100 font-sans">
      <h1 className="text-3xl font-bold text-center">
        VISUALIZADOR DE COSTO{" "}
        <span className="text-gray-700">Fertilización</span>
      </h1>

      <Dolar onDolarChange={updateDolarValue} />

      {/* Formulario de carga de productos */}
      <div className="border p-4 rounded mb-6 bg-white shadow">
        <h2 className="font-semibold text-lg mb-4">
          CARGA DE PRODUCTOS Y COSTOS
        </h2>
        <div className="flex flex-col justify-center items-center gap-4">
          {productForms.map((product) => (
            <ProductForm
              key={product.id}
              id={product.id}
              producto={product.producto}
              unidad={product.unidad}
              dosis={product.dosis}
              presentacion={product.presentacion}
              precio={product.precio}
              tratamientos={product.tratamientos}
              costo={product.costo}
              errors={product.errors}
              onInputChange={updateProductForm}
              onDeleteProduct={deleteProductForm}
            ></ProductForm>
          ))}
          <div className="w-full flex justify-start items-center">
            <button
            className="text-white flex items-center justify-center gap-1 cursor-pointer"
            onClick={addProductForm}
            >
              <Plus size={20} color="#ffffff" />
              <p>Agregar producto</p>
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-5">
            <button className="text-white" onClick={checkForms}>
              Agregar plan
            </button>
            <button className="text-white" onClick={cleanProducts}>
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Planes generados */}
      <div className="border p-4 rounded bg-white shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">PLANES GENERADOS</h2>
        {plans.length === 0 
        ? <p>No hay planes cargados aún.</p>
        : (
          <div className="flex flex-col items-center gap-4">
            {plans.map((plan) => {
              return(
              <table className="table-auto w-[90%] border-collapse text-center" key={plan.nombre}>
                <caption className="font-bold py-2 text-lg">{plan.nombre}</caption>
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Producto</th>
                    <th className="border px-4 py-2">Unidad</th>
                    <th className="border px-4 py-2">Dosis</th>
                    <th className="border px-4 py-2">Presentación</th>
                    <th className="border px-4 py-2">Precio</th>
                    <th className="border px-4 py-2">Tratamientos</th>
                    <th className="border px-4 py-2">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.productos.map((prod) => {
                    return (
                      <tr key={prod.producto}>
                        <td className="border px-4 py-2">{prod.producto}</td>
                        <td className="border px-4 py-2">{prod.unidad}</td>
                        <td className="border px-4 py-2">{prod.dosis}</td>
                        <td className="border px-4 py-2">{prod.presentacion}</td>
                        <td className="border px-4 py-2">${prod.precio}</td>
                        <td className="border px-4 py-2">{prod.tratamientos}</td>
                        <td className="border px-4 py-2">${prod.costo}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7" className="border px-4 py-2 font-bold">
                        <p className="text-center">Total</p>
                        <p>USD: ${plan.total} / ARS: ${plan.total * currentDolarValue}</p>
                    </td>
                  </tr>
                </tfoot>
              </table>)
            })}
            <button className="text-white" onClick={cleanPlans}>Limpiar</button>
          </div>
        )
        }
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
              onClick={() => downloadPDF(plans, chartRef)}
              className="mt-4 bg-sky-500/50 hover:bg-sky-500/100 text-white px-4 py-2 rounded"
            >
              Descargar PDF
            </button>
          </>
        ) : (
          <p className="text-gray-600">
            Agregá al menos dos planes válidos para visualizar el gráfico.
          </p>
        )}
      </div>
    </div>
  );
};

export default FertilizationPlanner;
