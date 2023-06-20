import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'

function Sidbar() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <>
    <div id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">

        <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">              
            <NavLink 
            to="/cows"
            className={ ({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "list-group-item list-group-item-action py-2 ripple active" : "list-group-item list-group-item-action py-2 ripple"
            }

            class="list-group-item list-group-item-action py-2 ripple" >
              <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>All Cows list</span>
            </NavLink>
            <NavLink to="/milk" 
              className={ ({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "list-group-item list-group-item-action py-2 ripple active" : "list-group-item list-group-item-action py-2 ripple"
            }>
            <i class="fas fa-chart-area fa-fw me-3"></i><span>All Milk List</span>
            </NavLink>
            
            <NavLink to="/children" 
              className={ ({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "list-group-item list-group-item-action py-2 ripple active" : "list-group-item list-group-item-action py-2 ripple"
            }>
              <i class="fas fa-lock fa-fw me-3"></i><span>All children List</span>
            </NavLink>
        </div>
        </div>
 
    </div>
    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
        aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
    </button>


    </>
  )
}

export default Sidbar