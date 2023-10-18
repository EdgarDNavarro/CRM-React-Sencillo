import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import clientesAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMcontext';

function Login() {
    const [auth, guardarAuth] = useContext(CRMContext)

    const [credenciales, guardarCredenciales] = useState({})
    const navigate = useNavigate();

    const iniciarSesion = async e => {
        e.preventDefault()

        try {
            const respuesta = await clientesAxios.post('/iniciar-sesion', credenciales)
            //extraer token y colocarlo en localstorage
            const { token } = respuesta.data
            localStorage.setItem('token', token)

            //colocarlo en el state
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has Iniciado Sesión',
                'success'
            )
            navigate('/');
        } catch (error) {
            // console.log(error)
            if(error.response) {
                Swal.fire({
                    icon: 'error',
                    text: 'Hubo un error',
                    title: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Hubo un error',
                    title: 'Hubo un Error'
                })
            }

        }
    }

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }


    return(
        <div className='login'>
            <h2>Iniciar Sesión</h2>

            <div className='contenedor-formulario'>
                <form onSubmit={iniciarSesion}>

                    <div className='campo'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Email para Iniciar Sesion' required onChange={leerDatos}/>
                    </div>

                    <div className='campo'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Tú Password' required onChange={leerDatos}/>
                    </div>
                    <input type='submit' value="Iniciar Sesión" className='btn btn-verde btn-block'/>
                </form>
            </div>
        </div>

    )
}
export default Login