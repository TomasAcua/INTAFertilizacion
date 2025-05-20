import { Plus, CircleX } from 'lucide-react'
import Button from "../Button/Button"

const ProductForm = ({ productForms, handleInputChange, addProductForm, deleteProductForm, cleanProducts, handleCargarProductos }) => {
    return (
        <div className="border p-4 rounded mb-6 bg-white shadow">
            <h2 className="font-semibold text-lg mb-4">CARGA DE PRODUCTOS Y COSTOS</h2>

            {productForms.map((product) => (
                <div key={product.id} className="mb-4 p-2 border rounded">
                    <div className="grid grid-cols-3 gap-4 mb-2">
                        <div>
                            <label className="block text-sm">Producto</label>
                            <select
                                className={`w-full border p-2 rounded ${product.errors.producto ? 'border-red-500' : 'border-gray-300'}`}
                                value={product.producto}
                                onChange={e => handleInputChange(product.id, 'producto', e.target.value)}
                            >
                                <option value="" disabled>Seleccionar</option>
                                <option value="urea">Urea</option>
                                <option value="fosfato">Fosfato</option>
                                {/* Agregar más opciones según sea necesario */}
                            </select>
                            {product.errors.producto && <p className="text-red-500 text-xs">{product.errors.producto}</p>}
                        </div>

                        <div>
                            <label className="block text-sm">Unidad</label>
                            <select
                                className={`w-full border p-2 rounded ${product.errors.unidad ? 'border-red-500' : 'border-gray-300'}`}
                                value={product.unidad}
                                onChange={e => handleInputChange(product.id, 'unidad', e.target.value)}
                            >
                                <option value="" disabled>Seleccionar</option>
                                <option value="kg">Kg</option>
                                <option value="lts">Lts</option>
                            </select>
                            {product.errors.unidad && <p className="text-red-500 text-xs">{product.errors.unidad}</p>}
                        </div>

                        <div>
                            <label className="block text-sm">Dosis x ha</label>
                            <input
                                type="text"
                                className={`w-full border p-2 rounded ${product.errors.dosis ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Dosis"
                                value={product.dosis}
                                onChange={e => handleInputChange(product.id, 'dosis', e.target.value)}
                            />
                            {product.errors.dosis && <p className="text-red-500 text-xs">{product.errors.dosis}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-2">
                        <div>
                            <label className="block text-sm">Presentación</label>
                            <select
                                className={`w-full border p-2 rounded ${product.errors.presentacion ? 'border-red-500' : 'border-gray-300'}`}
                                value={product.presentacion}
                                onChange={e => handleInputChange(product.id, 'presentacion', e.target.value)}
                            >
                                <option value="" disabled>Seleccionar</option>
                                <option value="bolsa">Bolsa 50kg</option>
                                <option value="bidon">Bidón 20lts</option>
                            </select>
                            {product.errors.presentacion && <p className="text-red-500 text-xs">{product.errors.presentacion}</p>}
                        </div>

                        <div>
                            <label className="block text-sm">Precio por envase</label>
                            <input
                                type="text"
                                className={`w-full border p-2 rounded ${product.errors.precio ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Precio"
                                value={product.precio}
                                onChange={e => handleInputChange(product.id, 'precio', e.target.value)}
                            />
                            {product.errors.precio && <p className="text-red-500 text-xs">{product.errors.precio}</p>}
                        </div>

                        <div>
                            <label className="block text-sm">Tratamientos</label>
                            <input
                                type="text"
                                className={`w-full border p-2 rounded ${product.errors.tratamientos ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Tratamientos"
                                value={product.tratamientos}
                                onChange={e => handleInputChange(product.id, 'tratamientos', e.target.value)}
                            />
                            {product.errors.tratamientos && <p className="text-red-500 text-xs">{product.errors.tratamientos}</p>}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <label className="block text-sm">Costo por ha</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded bg-gray-100"
                                value={product.costo ? `$${product.costo}` : ''}
                                readOnly
                            />
                        </div>

                        {productForms.length > 1 && (
                            <Button
                                onClick={() => deleteProductForm(product.id)}
                                className="text-red-500 bg-red-100 hover:text-red-700"
                            >
                                <CircleX size={18} />
                            </Button>
                        )}
                    </div>
                </div>
            ))}

            <div className="flex gap-2 mt-4">
                <Button
                    onClick={addProductForm}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                    <Plus size={16} />
                    <span>Añadir producto</span>
                </Button>

                <Button
                    onClick={handleCargarProductos}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                >
                    Cargar Plan
                </Button>

                <Button
                    onClick={cleanProducts}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
                >
                    Limpiar
                </Button>
            </div>
        </div>
    );
};

export default ProductForm