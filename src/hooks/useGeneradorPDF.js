import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

/**
 * Toda la instancia de la libreria jsPDF se maneja acá
 * @returns pdf
 */

const useGeneradorPDF = () => {
    const downloadPDF = async (plans, chartRef) => {
        const pdf = new jsPDF();
        let y = 10;
        // Título de planes centrado
        pdf.setFontSize(16);
        const plansTitle = 'Planes de Fertilización';
        const pageWidth = pdf.internal.pageSize.getWidth();
        const textWidth = pdf.getTextWidth(plansTitle);
        const plansX = (pageWidth - textWidth) / 2;
        pdf.text(plansTitle, plansX, y);

        y += 10;
        pdf.setFontSize(12);

        // Cabeceras de la tabla
        const headers = ['Producto', 'Unidad', 'Dosis x ha', 'Presentación', 'Precio', 'Tratamientos', 'Costo x ha'];

        plans.forEach((plan) => {
            pdf.text(plan.nombre, 10, y);
            y += 5;

            const planData = plan.productos.map(prod => [
                prod.producto,
                prod.unidad,
                prod.dosis,
                prod.presentacion,
                `$${prod.precio}`,
                prod.tratamientos,
                `$${prod.costo}`
            ]);

            autoTable(pdf, {
                head: [headers],
                body: planData,
                foot: [[{ content: `Total: $${plan.total}`, colSpan: 7 }]],
                startY: y,
                theme: 'grid',
                headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
                bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'center' },
                footStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'center', fontSize: 12 },
                styles: {
                    lineWidth: 0.1,
                    lineColor: [0, 0, 0],
                }
            });

            // Actualizar posición Y para la siguiente tabla
            y = pdf.lastAutoTable.finalY + 10;

        });

        // calcular el height de la pagina, si chart mide 10px entonces podemos poner hasta 190 px como tope, ya 191px enviaria al grafico a otra hoja
        const espacioNecesario = 150
        const pageHeight = pdf.internal.pageSize.getHeight()
        if (y + espacioNecesario > pageHeight) {
            pdf.addPage()
            y = 10
        }

        // Agregar gráfico y título en la posición y actual
        if (chartRef.current) {
            const chartCanvas = chartRef.current.canvas;
            const canvas = await html2canvas(chartCanvas);
            const imgData = canvas.toDataURL('image/png');

            // Título del gráfico centrado
            pdf.setFontSize(16);
            const chartTitle = 'Gráfico de comparación de costos';
            const chartTextWidth = pdf.getTextWidth(chartTitle);
            const chartX = (pageWidth - chartTextWidth) / 2;
            pdf.text(chartTitle, chartX, y);
            y += 10; // espacio después del título
            pdf.setFontSize(12);
            pdf.addImage(imgData, 'PNG', 10, y, 180, 100);
        }

        pdf.save('Planes_Fertilizacion.pdf');
    };

    return { downloadPDF }
}

export default useGeneradorPDF