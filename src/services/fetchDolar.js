//https://dolarapi.com/docs/argentina
// Tipo puede ser "oficial", "blue", "bolsa", "ccl" , "tarjeta", "mayorista" o "crypto"
// {"compra": 0,"venta": 0,"casa": "string","nombre": "string","moneda": "string","fechaActualizacion": "string"}


export const fetchDolar = async (type="oficial") => {

    const url = `https://dolarapi.com/v1/dolares/${type}`

    try {

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json()
        return data 
    }catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }


}

export default fetchDolar;