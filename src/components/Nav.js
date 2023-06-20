import React from 'react'

import { Link } from 'react-router-dom'



export default function Navbar() {
    
  return (
    <nav class="navbar navbar-light bg-light justify-content-between pd-2">
      <a class="navbar-brand">Cows system</a>
      <form class="form-inline d-flex mx-auto">
        <input class="form-control mr-sm-2" type="search" placeholder="Search by number" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>
  )
}
