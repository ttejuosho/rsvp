import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">RSVP Now</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                  <Link to={'/'} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to={'/newrsvp'} className="nav-link">RSVP Here</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/guests'} className="nav-link">Guests</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/sendemail'} className="nav-link">Send Email</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                <button className="btn btn-sm btn-secondary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
        )
    }
}