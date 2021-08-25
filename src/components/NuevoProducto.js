import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productosActions'



const NuevoProducto = ({history}) => {

    //State del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');

    //Utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);
    

    //Manda a llamar el action de productoAction
    const agregarProducto = (producto)=> dispatch(crearNuevoProductoAction(producto));

    //Cuando el usuario haga submit
    const submitNuevoProducto = e =>{
        e.preventDefault();

        //Validar formulario
        if(nombre.trim() === '' || precio <= 0){

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center'
            }
            dispatch( mostrarAlerta(alerta));
            return;
        }

        //Si no hay errores
        dispatch(ocultarAlertaAction());

        //Crear el nuevo producto
        agregarProducto({
            nombre,
            precio,
        });

        //Redireccionar
        history.push('/');

    }


    return (
        <div className="row justify-content-center animate__animated animate__bounceInLeft">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}

                            <button
                                type="submit"
                                className="btn btn-success font-weight-bold w-100 mt-3"
                            >Agregar</button>

                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger mt-3 text-center">Hubo un error</p> : null}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto
