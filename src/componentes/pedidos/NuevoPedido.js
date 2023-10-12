import React, {useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom';
import clientesAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';

function NuevoPedido() {
    const {id} = useParams();

    const [cliente, guardarCliente] = useState({})

    useEffect( () => {

        const consultarAPI = async () => {
            const resultado = await clientesAxios.get(`/clientes/${id}`)
            guardarCliente(resultado.data)
        }

        consultarAPI()
    }, [])

    const buscarProductos = () => {

    }

    const leerDatosBusqueda = () => {

    }

    return(
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Empresa: {cliente.empresa} </p>
            </div>

            <FormBuscarProducto buscarProductos={buscarProductos} leerDatosBusqueda={leerDatosBusqueda} />

            <ul className="resumen">
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook Pro</p>
                        <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook Pro</p>
                        <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook Pro</p>
                        <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readOnly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
            </div>
            
        </Fragment>

    )
}

export default NuevoPedido