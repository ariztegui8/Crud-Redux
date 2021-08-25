import React from 'react'
import { useDispatch } from 'react-redux'
import {useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { borrarProductosAction, obtenerProductoEditar } from '../actions/productosActions'

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto

    const dispatch = useDispatch();

    //Habilitar history para redireccionar
    const history = useHistory();

    //Confirmar so desea eliminarlo
    const onfirmarEliminarProducto = id =>{

        //Preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                //Pasarlo al action
                dispatch(borrarProductosAction(id));
            }
          })

    }

    //Funcion que redirige de forma programada
    const redireccionarEdition = producto =>{
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }


    return (
        <tr className="animate__animated animate__backInUp">
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td>
                <button 
                    className="btn btn-warning mr-3"
                    type="button"
                    onClick={()=> redireccionarEdition(producto)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=> onfirmarEliminarProducto(id)}
                >Eliminar</button>

            </td>
        </tr>
    )
}

export default Producto
