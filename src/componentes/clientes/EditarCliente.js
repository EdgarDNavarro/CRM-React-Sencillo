import React, {Fragment, useEffect, useState, useContext} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import clientesAxios from '../../config/axios'
import { useParams } from 'react-router-dom';
import { CRMContext } from '../../context/CRMcontext'

function EditarCliente(props) {
    const {id} = useParams();
    const [cliente, datosCliente] = useState({
        nombre: '', 
        apellido: '', 
        email: '', 
        telefono: '', 
        empresa: ''
    })
    const [auth, guardarAuth] = useContext(CRMContext)
    const navigate = useNavigate();

    //useEffect
    useEffect( () => {
        if(auth.token !== '') {
            //Query a la api
            const consultarAPI = async () => {

                try {
                    const clienteConsulta = await clientesAxios.get(`/clientes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })
                    datosCliente(clienteConsulta.data)
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

    }, [])

    //leer los datos del formulario
    const actualizarState = e => {
        //Almacenra lo que el usuario escribe en el state

        datosCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    const actualizarCliente = e => {
        e.preventDefault()

        clientesAxios.put(`/clientes/${cliente._id}`, cliente, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }).then(res => {
            if(res.data.code === 11000) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Ese email ya está en uso'
                })
            }else {
                Swal.fire(
                    'Se Actualizó el Cliente',
                    'Se ha actualizado Correctamente',
                    'success'
                )
            }
            navigate('/');
        })
    }

    const validarCliente = () => {
        const { nombre, apellido, email, telefono, empresa } = cliente
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length


        return valido
        //Revisar que las propiedades tengan contenido
    }

    return(
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>
                <div className="campo" >
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" value={cliente.nombre} onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" value={cliente.apellido} onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" value={cliente.empresa} onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" value={cliente.email} onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" value={cliente.telefono} onChange={actualizarState}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarCliente()}/>
                </div>
            </form>
        </Fragment>
        
    )
}
// HOC
export default EditarCliente