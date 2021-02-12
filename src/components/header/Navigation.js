import React from 'react'
import {Link} from 'react-router-dom'
const Navigation = () => {
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/addproduct">
                Add Product
              </Link>
            </li>
          </ul>
        
        </div>
    )
}

export default Navigation
