import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clientesAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMcontext'

function DetallesPedidos({pedido}) {
    const [auth, guardarAuth] = useContext(CRMContext)
    const {cliente} = pedido

    const eliminarPedido = idPedido => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Un pedido eliminado no de puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clientesAxios.delete(`/pedidos/${idPedido}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }).then( res => {
                    Swal.fire(
                        'Eliminado!',
                        res.data.mensaje,
                        'success'
                    )
                })

            }
        })
    }

    return(
        <li className="pedido">
            
            <div className="info-pedido">

                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">Cliente: {cliente ? cliente.nombre : 'No se ha encontrado ese Cliente'} {cliente ? cliente.apellido : null} </p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.pedido.map(articulos => (
                            <li key={articulos.producto ? pedido._id+articulos.producto._id : pedido._id+pedido._id}>
                                <p>{articulos.producto ? articulos.producto.nombre : 'Producto no encontrado'}</p>
                                <p>Precio: ${articulos.producto ? articulos.producto.precio : 'Por favor, realizar el pedido nuevamente'}</p>
                                <p>Cantidad: {articulos.producto ? articulos.cantidad : null}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="total">Total: ${pedido.total} </p>

            </div>

            <div className="acciones">
                
                {cliente ? (
                    <Link to={`/pedidos/editar/${pedido._id}/${cliente._id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Pedido
                    </Link>
                ) : null}


                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(pedido._id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>

        </li>
    )
}
export default DetallesPedidos