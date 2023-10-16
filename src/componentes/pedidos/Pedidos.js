import React, {useState, useEffect, Fragment, useContext} from 'react'
import clientesAxios from '../../config/axios'
import DetallesPedidos from './DetallesPedidos'
import { CRMContext } from '../../context/CRMcontext'
import { useNavigate } from 'react-router-dom'

function Pedidos() {

    const [pedidos, guardarPedidos] = useState([])

    const navigate = useNavigate();
    //utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext)

    useEffect(() => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const resultado = await clientesAxios.get('/pedidos', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })
                    guardarPedidos(resultado.data)
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

    }, [pedidos])

    return(
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                
                {pedidos.map(pedido => (
                    <DetallesPedidos key={pedido._id} pedido={pedido} />
                ))}

            </ul>
        </Fragment>
    )
}

export default Pedidos