import React from 'react'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Test Playground</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/tickets/open/">Open Tickets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/tickets/create/">Create a Ticket</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar