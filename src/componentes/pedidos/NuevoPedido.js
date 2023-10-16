import React, {useState, useEffect, Fragment, useContext} from 'react'
import { useParams } from 'react-router-dom';
import clientesAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMcontext';

function NuevoPedido() {
    const {id} = useParams();

    const [cliente, guardarCliente] = useState({})
    const [busqueda, guardarBusqueda] = useState('')
    const [productos, guardarProductos] = useState([])
    const [total, guardarTotal] = useState(0)
    const [auth, guardarAuth] = useContext(CRMContext)

    const navigate = useNavigate();

    useEffect( () => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const resultado = await clientesAxios.get(`/clientes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })
                    guardarCliente(resultado.data)
                } catch (error) {
                    if(error.response.status = 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            consultarAPI()
        } else {
            navigate('/iniciar-sesion');
        }

        actualizarTotal()
    }, [productos])

    const buscarProductos = async e => {
        e.preventDefault()

        const resultadoBusqueda = await clientesAxios.post(`/productos/busqueda/${busqueda}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })

        if(resultadoBusqueda.data[0]) {

            let productoResultado = resultadoBusqueda.data[0]
            //agregar la llave "producto" (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0;
            guardarProductos([...productos, productoResultado])
        }else{
            //NO hay resultados
            Swal.fire({
                icon: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }
    }

    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value )
    }

    const restarProducto = i => {
        const todosProductos = [...productos]

        if(todosProductos[i].cantidad === 0) return

        todosProductos[i].cantidad--;

        guardarProductos(todosProductos)
    }

    const aumentarProducto = i => {
        const todosProductos = [...productos]

        todosProductos[i].cantidad++;

        guardarProductos(todosProductos)
    }

    const eliminarProducto = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id)

        guardarProductos(todosProductos)
    }

    //Actualizar el total a pagar
    const actualizarTotal = () => {
        if(productos.length === 0) {
            guardarTotal(0)
            return
        }

        let nuevoTotal = 0

        productos.map(producto => nuevoTotal += (producto.precio * producto.cantidad))

        guardarTotal(nuevoTotal.toFixed(2) * 1)

    }

    const realizarPedido = async e => {
        e.preventDefault()

        //construir objeto
        const pedido = {
            cliente : id,
            pedido : productos,
            total : total
        }
        
        const resultado = await clientesAxios.post(`/pedidos/nuevo/${id}`, pedido, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        if(resultado.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'No se pudo realizar el Pedido',
                text: 'Intente nuevamente'
            })
        }
        navigate('/pedidos');
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
                {productos.map((producto, index) => (
                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProducto={restarProducto}
                        aumentarProducto={aumentarProducto}
                        index={index}
                        eliminarProducto={eliminarProducto}
                    />
                ))}

                
            </ul>

            <p className='total'>Total a Pagar: <span>$ {total}</span></p>
                
            { total > 0 ? (
                <form onSubmit={realizarPedido}>
                    <input type='submit' className='btn btn-verde btn-block' value='Realizar Pedido'/>

                </form>
            ) : null }

        </Fragment>

    )
}

export default NuevoPedido