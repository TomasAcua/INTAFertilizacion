import { useState, useEffect } from 'react';

/**
 * Básicamente acá manejamos los useState y useEffect del componente ProductForm.jsx
 * @returns estados, handles, funciones necesarias
 */

const useProductForm = () => {
    // Valores por defecto para los errores de validación
    const defaultErrors = {
        producto: "",
        unidad: "",
        presentacion: "",
        dosis: "",
        precio: "",
        tratamientos: "",
    };

    // Estado para manejar múltiples productos dentro de un plan
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
    const [lastProductId, setLastProductId] = useState(
        storedProductForms ? storedProductForms[storedProductForms.length - 1].id : 1
    );

    // Función para calcular el costo basado en dosis, precio y tratamientos
    const calcularCosto = (id, field, value) => {
        const productForm = productForms.find((form) => form.id === id);
        const { dosis, precio, tratamientos } = productForm;

        const dosisIsNumber = !isNaN(dosis) && parseFloat(dosis) > 0;
        const precioIsNumber = !isNaN(precio) && parseFloat(precio) > 0;
        const tratamientosIsNumber = !isNaN(tratamientos) && parseFloat(tratamientos) > 0;
        const valueIsNumber = !isNaN(value) && parseFloat(value) > 0;

        let costo = "";
        if (field === "dosis" && valueIsNumber && precioIsNumber && tratamientosIsNumber) {
            costo = (parseFloat(value) * parseFloat(precio) * parseFloat(tratamientos)).toFixed(2);
        } else if (field === "precio" && dosisIsNumber && valueIsNumber && tratamientosIsNumber) {
            costo = (parseFloat(dosis) * parseFloat(value) * parseFloat(tratamientos)).toFixed(2);
        } else if (field === "tratamientos" && dosisIsNumber && precioIsNumber && valueIsNumber) {
            costo = (parseFloat(dosis) * parseFloat(precio) * parseFloat(value)).toFixed(2);
        }
        return costo;
    };

    // Función de validación para cada campo del formulario
    const validate = (field, value) => {
        const newErrors = {};
        switch (field) {
            case "producto": case "unidad": case "presentacion":
                if (!value) {
                    newErrors[field] = `El campo ${field} es obligatorio`;
                } else {
                    newErrors[field] = "";
                }
                break;
            case "dosis": case "precio": case "tratamientos":
                if (!value) {
                    newErrors[field] = `El campo ${field} es obligatorio`;
                } else if (isNaN(value) || parseFloat(value) <= 0) {
                    newErrors[field] = `El campo ${field} debe ser un número positivo`;
                } else {
                    newErrors[field] = "";
                }
                break;
        }
        return newErrors;
    };

    // Función para actualizar los valores de los campos del formulario
    const handleInputChange = (id, field, value) => {
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

    // Función para limpiar los productos cargados
    const cleanProducts = () => {
        if (productForms.length === 1) {
            const updatedProductForms = productForms.map((form) => {
                return { ...form, producto: "", unidad: "", dosis: "", presentacion: "", precio: "", tratamientos: "", costo: "", errors: defaultErrors };
            });
            setProductForms(updatedProductForms);
        } else {
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
    };

    // Función para validar que todos los campos estén completos correctamente
    const isCurrentPlanValid = () => {
        const updatedProductForms = productForms.map((form) => {
            const newErrors = {
                producto: validate("producto", form.producto).producto,
                unidad: validate("unidad", form.unidad).unidad,
                presentacion: validate("presentacion", form.presentacion).presentacion,
                dosis: validate("dosis", form.dosis).dosis,
                precio: validate("precio", form.precio).precio,
                tratamientos: validate("tratamientos", form.tratamientos).tratamientos,
            };
            return { ...form, errors: newErrors };
        });

        const valid = updatedProductForms.every((form) => {
            return (
                form.errors.producto === "" &&
                form.errors.unidad === "" &&
                form.errors.presentacion === "" &&
                form.errors.dosis === "" &&
                form.errors.precio === "" &&
                form.errors.tratamientos === ""
            );
        });

        if (!valid) {
            setProductForms(updatedProductForms);
        }

        return valid;
    };

    // Función para resetear los productos después de añadir un plan
    const resetProductForms = () => {
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

    // Guardar productos en localStorage cuando cambian
    useEffect(() => {
        const storedProductForms = productForms.map((form) => {
            const { errors, ...rest } = form;
            return { ...rest, errors: defaultErrors };
        });
        localStorage.setItem("productForms", JSON.stringify(storedProductForms));
    }, [productForms]);

    return {
        productForms,
        addProductForm,
        handleInputChange,
        deleteProductForm,
        cleanProducts,
        isCurrentPlanValid,
        resetProductForms
    };
};

export default useProductForm;