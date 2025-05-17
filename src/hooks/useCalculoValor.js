import { useEffect, useState } from "react"
import fetchDolar from "../services/fetchDolar"

const useCalculoValor = () => {
    const [dolarOficial, setDolarOficial] = useState(null);
    const [dolarActual, setDolarActual] = useState(null)
    const [estado, setEstado] = useState("Cambiar");
    const [value, setValue] = useState("");
    const [cantDolar, setCantDolar] = useState(1)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchDolar();
            setDolarOficial(data.venta);
            setDolarActual(data.venta);
            localStorage.setItem("dolarOficial", data.venta);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const cambiarEstado = () => {
        if (estado === "Cambiar") {
            const nuevoValor = parseFloat(value)
            if (!isNaN(nuevoValor) && nuevoValor > 0) {
                setDolarActual(nuevoValor)
                setEstado("Restaurar")
            }
        } else if (estado === "Restaurar") {
            setDolarActual(dolarOficial)
            setEstado("Cambiar")
            setValue("")
        }
    }

    return {
        dolarOficial,
        dolarActual,
        estado,
        value,
        setValue,
        cantDolar,
        setCantDolar,
        cambiarEstado
    }
}

export default useCalculoValor
