import React, {Fragment, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import clientesAxios from '../../config/axios'
import { useParams } from 'react-router-dom';


function EditarCliente(props) {
    const {id} = useParams();
    const [cliente, datosCliente] = useState({
        nombre: '', 
        apellido: '', 
        email: '', 
        telefono: '', 
        empresa: ''
    })
    
    const navigate = useNavigate();

    //Query a la api
    const consultarAPI = async () => {
        const clienteConsulta = await clientesAxios.get(`/clientes/${id}`)
        datosCliente(clienteConsulta.data)
    }

    //useEffect
    useEffect( () => {
        consultarAPI()
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

        clientesAxios.put(`/clientes/${cliente._id}`, cliente).then(res => {
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