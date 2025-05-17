
import fetchDolar from "../../services/fetchDolar";
import { useEffect, useState } from "react";

const Dolar = () => {
  const [dolar, setDolar] = useState(null);
  const [estado, setEstado] = useState("Cambiar");
  const [value, setValue] = useState("");
  const [cantDolar, setCantDolar] = useState(1)

  useEffect(() => {
    fetchData();

    setEstado("Cambiar");
  }, []);

  useEffect(() => {
    // console.log(value)
  }, [value]);

  const fetchData = async () => {
    try {
      const data = await fetchDolar();
      setDolar(data.venta); // <- está bien pisar el valor de setDolar?
      localStorage.setItem("dolar", data.venta);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cambiarEstado = () => {
    if (estado === "Cambiar") {
      const multiplicador = parseFloat(value)
      if (!isNaN(multiplicador) && dolar) { // <- quitar el isNaN si después controlamos el valor del input de otra manera
        const nuevoValorDolar = dolar * multiplicador
        setDolar(nuevoValorDolar)
        setCantDolar(value)
        localStorage.setItem("dolar", nuevoValorDolar)
      }

      setEstado("Restaurar");
      setValue("");
    } else if (estado === "Restaurar") {
      setEstado("Cambiar");
      fetchData();
      setCantDolar(1)
    }
  };


  return (
    <div className="bg-green-600 text-white w-50">
      <h2 className="">Dolar</h2>

      <div className="bg-slate-900 h-[0.2vh] w-full my-1"></div>

      <div className="">
        <div className="">
          {dolar ? (
            <h3 className="">
              USD $ {cantDolar} = ARS ${Math.round(dolar).toLocaleString("es-AR")}
            </h3>
          ) : (
            <h3 className="text-slate-400">Cargando...</h3>
          )}
        </div>

        <div className=" bg-green-300 ">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="hover:bg-green-900 ">
          {estado === "Restaurar" ? (
            <button
              className="hover:cursor-pointer w-full"
              onClick={cambiarEstado}
            >
              Restaurar
            </button>
          ) : value !== "" ? (
            <button
              className="hover:cursor-pointer w-full"
              onClick={cambiarEstado}
            >
              Cambiar
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dolar;
