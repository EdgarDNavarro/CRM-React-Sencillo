import React, {Fragment, useState} from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clientesAxios from '../../config/axios';


function NuevoProducto() {

    const [producto, guardarProductos] = useState({
        nombre: '',
        precio: ''
    })

    const [archivo, guardarArchivo] = useState('')

    const navigate = useNavigate();

    const agregarProducto = async e => {
        e.preventDefault();

        //crear un nuevo fromData
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        try {
            const res = await clientesAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
            navigate('/productos');

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    const leerInfoProducto = e => {
        guardarProductos({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] )
    }

    const validarProducto = () => {
        const {nombre, precio} = producto
        let valido = !nombre.length || !precio.length
        return valido
    }

    return(
        <Fragment>
            <h2>Nuevo Producto</h2>
            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInfoProducto}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerInfoProducto}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto" disabled={validarProducto()}/>
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoProducto