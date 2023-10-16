import React, {Fragment, useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Layout */
import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'

/** Componentes */
import Clientes from './componentes/clientes/Clientes'
import NuevoCliente from './componentes/clientes/NuevoCliente'
import EditarCliente from './componentes/clientes/EditarCliente'

import Productos from './componentes/productos/Productos';
import EditarProductos from './componentes/productos/EditarProductos';
import NuevoProducto from './componentes/productos/NuevoProducto';

import Pedidos from './componentes/pedidos/Pedidos';
import NuevoPedido from './componentes/pedidos/NuevoPedido';
import EditarPedidos from './componentes/pedidos/EditarPedidos';

import Login from './componentes/auth/Login';
import { CRMContext, CRMProvider } from './context/CRMcontext';


function App() {
    //Utilizar context
    const [auth, guardarAuth] = useContext(CRMContext)

    return (
        <Router>
            <Fragment>
                <CRMProvider value={[auth, guardarAuth]}>
                    <Header />
                    <div className="grid contenedor contenido-principal">
                        <Navegacion />
                        <main className="caja-contenido col-9">
                            <Routes>
                                <Route exact path="/" element={<Clientes/>} />
                                <Route exact path="/clientes/nuevo" element={<NuevoCliente/>} />
                                <Route exact path="/clientes/editar/:id" element={<EditarCliente/>} />

                                <Route exact path="/productos" element={<Productos/>} />
                                <Route exact path="/productos/nuevo" element={<NuevoProducto/>} />
                                <Route exact path="/productos/editar/:id" element={<EditarProductos/>} />

                                <Route exact path="/pedidos" element={<Pedidos/>} />
                                <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido/>} />
                                <Route exact path="/pedidos/editar/:id/:idCliente" element={<EditarPedidos/>} />
                                
                                <Route exact path="/iniciar-sesion" element={<Login/>} />
                                
                            </Routes>
                        </main>
                    </div>
                </CRMProvider>
            </Fragment>
        </Router>   
    );
}

export default App;
