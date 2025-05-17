import useCalculoValor from "../../hooks/useCalculoValor"

// si gustan pueden ignorar este custom hook, sigue siendo la misma lógica de siempre, sólo deja el componente más limpio

const Dolar = () => {
  const {
    dolarOficial,
    dolarActual,
    estado,
    value,
    setValue,
    cantDolar,
    setCantDolar,
    cambiarEstado
  } = useCalculoValor()

  return (
    <div className="bg-green-600 text-white w-50">
      <h2>Dólar</h2>
      <div className="bg-slate-900 h-[0.2vh] w-full my-1"></div>
      <div>
        <div>
          {dolarOficial ? (
            <>
              <h3>
                USD $ {cantDolar} = ARS {dolarActual ? Math.round(dolarActual * cantDolar).toLocaleString("es-AR") : "-"}{" "}
                <span className="text-xs">
                  {estado === "Restaurar"
                    ? "según el valor dado por el usuario"
                    : "según el valor oficial del dólar"}
                  {/* mejorar los mensajes después */}
                </span>
              </h3>
              <p className="text-xs text-slate-200 mt-1">
                Dólar oficial actual: <b>${dolarOficial.toLocaleString("es-AR")}</b>
              </p>
            </>
          ) : (
            <h3 className="text-slate-400">Cargando...</h3>
          )}
        </div>
        <div className="bg-green-300 p-2 mt-2 rounded">
          <label className="block text-black text-sm mb-1">
            Ingrese dolares:
          </label>
          <input
            type="number"
            min="1"
            className="w-full p-1 rounded"
            value={cantDolar}
            onChange={e => setCantDolar(e.target.value)}
          />
        </div>
        <div className="bg-green-300 p-2 mt-2 rounded">
          <label className="block text-black text-sm mb-1">
            Valor de dólar a usar (personalizado):
          </label>
          <input
            type="number"
            min="1"
            className="w-full p-1 rounded"
            placeholder={dolarOficial ? dolarOficial : "Valor dólar"}
            value={value}
            onChange={e => setValue(e.target.value)}
            disabled={estado === "Restaurar"}
          />
          {/* acomodar estilos */}
          <button
            className="hover:cursor-pointer w-full bg-green-800 py-1 rounded"
            onClick={cambiarEstado}
            disabled={estado === "Cambiar" && value === ""}
          >
            {estado}
          </button>

        </div>
        <br />
      </div>
    </div>
  );
};

export default Dolar;
