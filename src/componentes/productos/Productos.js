import React, {Fragment, useEffect, useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Producto from './Producto';
import clientesAxios from '../../config/axios';
import Spinner from '../layout/Spinner'
import { CRMContext } from '../../context/CRMcontext'

function Productos() {

    const [productos, guardarProductos] = useState([]);
    const [auth, guardarAuth] = useContext(CRMContext)

    const navigate = useNavigate();

    useEffect( () => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const productoConsulta = await clientesAxios.get('/productos', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })
                    
                    guardarProductos(productoConsulta.data)
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

    }, [productos])

    if(!auth.auth) {
        return navigate('/iniciar-sesion');
    }

    // if(!productos.length) return <Spinner/>

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