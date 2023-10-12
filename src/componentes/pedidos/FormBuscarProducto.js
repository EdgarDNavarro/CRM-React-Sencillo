import React from 'react'

function FormBuscarProducto(props) {
    return(
        <form>

            <legend>Busca un Producto y agrega una cantidad</legend>

            <div className="campo">
                <label>Productos:</label>
                <input type="text" placeholder="Nombre Productos" name="productos"/>
            </div>

            <input type='submit' className='btn btn-azul ' value='Buscar Producto'/>

        </form>
    )
}

export default FormBuscarProducto