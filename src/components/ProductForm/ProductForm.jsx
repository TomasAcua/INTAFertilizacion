import React, { useState } from "react";
import { CircleX } from "lucide-react";

const ProductForm = ({ id, producto, unidad, dosis, presentacion, precio, tratamientos, costo, errors,  onInputChange, onDeleteProduct }) => {

    const productDeleteHandler = () => {
        onDeleteProduct(id);
    }

    return (
        <div className="flex w-full gap-2 bg-slate-200 p-4 rounded w-56 relative">
            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="producto" className="text-left">Producto</label>
                <select
                    name="producto"
                    className="border border-black px-2 py-1 rounded"
                    value={producto}
                    onChange={(e) => {
                        onInputChange(id, "producto", e.target.value);      
                    }}
                >
                    <option value="" disabled></option>
                    <option value="urea">Urea</option>
                    <option value="fosfato">Fosfato</option>
                </select>
                {errors.producto && (
                    <p className="text-left text-red-500 text-sm">{errors.producto}</p>
                )}
            </div>
            
            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="unidad" className="text-left">Unidad</label>
                <select
                    name="unidad"
                    className="border border-black px-2 py-1 rounded"
                    value={unidad}
                    onChange={(e) => {
                        onInputChange(id, "unidad", e.target.value);
                    }}
                >
                    <option value="" disabled></option>
                    <option value="kg">Kg</option>
                    <option value="lts">Lts</option>
                </select>
                {errors.unidad && (
                    <p className="text-left text-red-500 text-sm">{errors.unidad}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="dosis" className="text-left">Dosis</label>
                <input
                    name="dosis"
                    type="number"
                    className="border border-black px-2 py-1 rounded"
                    value={dosis}
                    onChange={(e) => {
                        onInputChange(id, "dosis", e.target.value);
                    }}
                />
                {errors.dosis && (
                    <p className="text-left text-red-500 text-sm">{errors.dosis}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="presentacion" className="text-left">Presentación</label>
                <select
                    name="presentacion"
                    className="border border-black px-2 py-1 rounded"
                    value={presentacion}
                    onChange={(e) => {
                        onInputChange(id, "presentacion", e.target.value);
                    }}
                >
                    <option value="" disabled></option>
                    <option value="bolsa">Bolsa 50kg</option>
                    <option value="bidon">Bidón 20lts</option>
                </select>
                {errors.presentacion && (
                    <p className="text-left text-red-500 text-sm">{errors.presentacion}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="precio" className="text-left">Precio p/envase</label>
                <input
                    name="precio"
                    type="number"
                    className="border border-black px-2 py-1 rounded"
                    value={precio}
                    step="0.01"
                    onChange={(e) => {
                        onInputChange(id, "precio", e.target.value);
                    }}
                />
                {errors.precio && (
                    <p className="text-left text-red-500 text-sm">{errors.precio}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="tratamientos" className="text-left">Tratamientos</label>
                <input
                    name="tratamientos"
                    type="number"
                    className="border border-black px-2 py-1 rounded"
                    value={tratamientos}
                    step="1"
                    onChange={(e) => {
                        onInputChange(id, "tratamientos", e.target.value);
                    }}
                />
                {errors.tratamientos && (
                    <p className="text-left text-red-500 text-sm">{errors.tratamientos}</p>
                )}
            </div>

            <div className="flex flex-col gap-1 w-1/7">
                <label htmlFor="costo" className="text-left">Costo p/ha</label>
                <input
                    name="costo"
                    type="number"
                    className="border border-black px-2 py-1 rounded"
                    value={costo}
                    step="0.01"
                    readOnly
                />
            </div>
            <CircleX size={24} color="#000" className="absolute top-2 right-2 cursor-pointer" onClick={productDeleteHandler}/>
        </div>
    );
}

export default ProductForm;