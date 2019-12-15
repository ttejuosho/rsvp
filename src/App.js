import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import NewRsvp from './components/new-rsvp';
import EditRsvp from './components/edit-rsvp';
import IndexRsvp from './components/guests';
import Nav from './components/Nav';
import SendEmail from './components/SendEmail';
import './App.css';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Nav />
          <Switch>
            <Route exact path='/sendemail' component={SendEmail} />
            <Route exact path='/' component={Home} />
            <Route exact path='/newrsvp' component= { NewRsvp } />
            <Route path='/editrsvp/:id' component={ EditRsvp } />
            <Route path='/guests' component={ IndexRsvp } />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
