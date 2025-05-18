import { useState, useEffect } from 'react'

const usePlanList = () => {

    // Estado para almacenar todos los planes con detalles de productos
    // Controla mostrar u ocultar el formulario de carga
    const [plans, setPlans] = useState(JSON.parse(localStorage.getItem("plans")) || []);
    const [showForm, setShowForm] = useState(true);

    const addPlan = (productForms) => {
        const newPlan = {
            nombre: `Plan ${String.fromCharCode(65 + plans.length)}`,
            productos: productForms.map(({ id, ...content }) => content),
            total: productForms.reduce((acc, prod) => acc + parseFloat(prod.costo), 0)
        }

        setPlans([...plans, newPlan])
        setShowForm(false)
    }

    const cleanPlans = () => {
        setPlans([]);
    };

    const showAddPlanForm = () => {
        setShowForm(true);
    };

    useEffect(() => {
        localStorage.setItem("plans", JSON.stringify(plans));
    }, [plans]);

    return {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm
    }
}

export default usePlanList