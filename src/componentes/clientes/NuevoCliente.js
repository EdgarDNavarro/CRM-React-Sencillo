import React, {Fragment, useState, useContext} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import clientesAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMcontext'

function NuevoCliente() {
    const [cliente, guardarCliente] = useState({
        nombre: '', 
        apellido: '', 
        email: '', 
        telefono: '', 
        empresa: ''
    })
    const [auth, guardarAuth] = useContext(CRMContext)
    const navigate = useNavigate();

    //leer los datos del formulario
    const actualizarState = e => {
        //Almacenra lo que el usuario escribe en el state

        guardarCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }
    const agregarCliente = e => {


        try {
            e.preventDefault();
            clientesAxios.post('/clientes', cliente, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }).then(res =>{
                //Validar si hay errores de Mongo
                if(res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya esta registrado'
                    })
                }else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        'success'
                    )
                }

                navigate('/');
            })
        } catch (error) {
            if(error.response.status = 500) {
                navigate('/iniciar-sesion');
            }
        }

    }

    const validarCliente = () => {
        const { nombre, apellido, email, telefono, empresa } = cliente
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length


        return valido
        //Revisar que las propiedades tengan contenido
    }
    if(!auth.auth || (localStorage.getItem('token') !== auth.token)) {
        navigate('/');
    }

    return(
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>
                <div className="campo" >
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()}/>
                </div>
            </form>
        </Fragment>
        
    )
}
// HOC
export default NuevoCliente