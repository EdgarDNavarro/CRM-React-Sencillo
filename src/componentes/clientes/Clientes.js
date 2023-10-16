import React, { useEffect, useState, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../layout/Spinner'
//Importar context
import { CRMContext } from '../../context/CRMcontext'

function Clientes() {
    const [clientes, guardarClientes] = useState([])

    const navigate = useNavigate();

    //utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext)


    useEffect( () => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                
                try {

                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })

                    guardarClientes(clientesConsulta.data)

                } catch (error) {
                    if(error.response.status = 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            consultarAPI()
        }else {
            navigate('/iniciar-sesion');
        }

    },[clientes])

    if(!auth.auth) {
        return navigate('/iniciar-sesion');
    }

    if(!clientes.length) return <Spinner/>

    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Clientes