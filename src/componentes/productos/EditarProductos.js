import React, {Fragment, useState, useEffect, useContext} from 'react'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clientesAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMcontext';

function EditarProductos() {
    const {id} = useParams();

    const navigate = useNavigate();
    const [auth, guardarAuth] = useContext(CRMContext)

    const [producto, guardarProductos] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

    const [archivo, guardarArchivo] = useState('')
    
    useEffect(() => {

        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const productoConsulta = await clientesAxios.get(`/productos/${id}`, {
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

    }, [])

    const editarProducto = async e => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        try {
            const res = await clientesAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    Authorization: `Bearer ${auth.token}`
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


    const {nombre, precio, imagen} = producto



    return(
        <Fragment>
            <h2>Editar Producto</h2>
            <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInfoProducto} defaultValue={nombre}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerInfoProducto} defaultValue={precio}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt='imagen' width="200" />
                    ): null}
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
    )
}

export default EditarProductos