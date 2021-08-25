import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1 className="text-white">
                    <Link to={'/'} className="text-light text-decoration-none">
                        CRUD - React Redux
                    </Link>
                </h1>
            </div>

            <Link to={'/productos/nuevo'}
                className="btn btn-info"
            >Agregar Producto &#43;</Link>
        </nav>
    )
}

export default Header
