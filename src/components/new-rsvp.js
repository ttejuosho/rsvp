import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import $ from 'jquery';

export default class NewRsvp extends Component {
    
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Email: '',
            Phone: '',
            Attending: 'Yes',
            Guests: '',
            validated: false
        }
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit(e){
        e.preventDefault();
        e.target.className += " was-validated";
        const rsvpData = {
            Name: this.state.Name,
            Email: this.state.Email,
            Phone: this.state.Phone,
            Attending: this.state.Attending,
            Guests: this.state.Guests
        }

        //console.log(rsvpData);
        axios.post('http://localhost:4000/rsvp/new', rsvpData).then((res) => {
        swal("Thanks !", "We got your information. See you at the party", "success");
        this.setState({
            Name: '',
            Email: '',
            Phone: '',
            Attending: 'Yes',
            Guests: '',
            validated: true
        });
        });
    }

    render() {
        return (
            <div>
                <h3>RSVP Here !!</h3>
                <form className="needs-validation" onSubmit={this.onSubmit} noValidate>
                    <div className="form-group row">
                        <label className="col-2 text-right" htmlFor="Name">Name:  </label>
                        <div className="col-6"><input type="text" id="Name" name="Name" className="form-control form-control-sm" placeholder="Name"                        
                        value={this.state.Name} 
                        onChange={this.changeHandler} required/></div>
                         
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right" htmlFor="Email">Email: </label>
                        <div className="col-6"><input type="email" id="Email" name="Email" className="form-control form-control-sm" placeholder="Email" 
                        value={this.state.Email}
                        onChange={this.changeHandler} required/></div>
                        
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right" htmlFor="Phone">Phone: </label>
                        <div className="col-6"><input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="Phone" name="Phone" className="form-control form-control-sm" placeholder="Phone Number" 
                        value={this.state.Phone}
                        onChange={this.changeHandler} required/>
                        <small id="phoneFormat" className="form-text text-muted">Format: 123-456-7890</small>
                        </div>
                       
                    </div>

                    <div className="form-group row">
                        <label className="col-2 text-right" htmlFor="Attending">Attending: </label>
                        <div className="col-6">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Attending" id="AttendingYes" 
                                value="Yes" 
                                onChange={this.changeHandler} 
                                checked= {this.state.Attending === "Yes"} required/>
                                <label className="form-check-label" htmlFor="AttendingYes">Yes</label>
                                
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Attending" id="AttendingNo" 
                                value="No" 
                                onChange={this.changeHandler}
                                checked= {this.state.Attending === "No"} 
                                required/>
                                <label className="form-check-label" htmlFor="AttendingNo">No</label>
                                
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Attending" id="AttendingUndecided" 
                                value="Undecided" 
                                onChange={this.changeHandler} 
                                checked= {this.state.Attending === "Undecided"} 
                                required/>
                                <label className="form-check-label" htmlFor="AttendingUndecided">Undecided</label>
                                
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right">Guests: </label>
                        <div className="col-6">
                            <input type="number" id="Guests" name="Guests" className="form-control form-control-sm" placeholder="Number of Guests" 
                            value={this.state.Guests}
                            onChange= {this.changeHandler} required/>
                            
                        </div> 
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6 col-sm-10 offset-2"><input type="submit" value="RSVP" className="btn btn-sm btn-secondary"/></div>                       
                    </div>
                </form>
            </div>
        )
    }
}