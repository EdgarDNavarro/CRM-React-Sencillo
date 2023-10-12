import React, {Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Producto from './Producto';
import clientesAxios from '../../config/axios';
import Spinner from '../layout/Spinner'

function Productos() {

    const [productos, guardarProductos] = useState([]);

    useEffect( () => {
        const consultarAPI = async () => {
            const productoConsulta = await clientesAxios.get('/productos')
            guardarProductos(productoConsulta.data)
        }
        consultarAPI()
    }, [productos])

    if(!productos.length) return <Spinner/>

    return(
        <Fragment>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map((producto) => (
                    <Producto
                    key={producto._id}
                    producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Productos