import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default class EditRsvp extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAttending = this.onChangeAttending.bind(this);
        this.onChangeGuests = this.onChangeGuests.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Email: '',
            Phone: '',
            Attending: '',
            Guests: ''
        }
    }

    componentDidMount(){
        axios.get('/rsvp/edit/' + this.props.match.params.id)
             .then(response => {
                 this.setState({
                     Name: response.data.Name,
                     Email: response.data.Email,
                     Phone: response.data.Phone,
                     Attending: response.data.Attending,
                     Guests: response.data.Guests });
                }).catch( function (error) {
                     console.log(error);
                })
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            Email: e.target.value
        });
    }
    onChangePhone(e){
        this.setState({
            Phone: e.target.value
        });
    }
    onChangeAttending(e){
        this.setState({
            Attending: e.target.value
        });
    }

    onChangeGuests(e){
        this.setState({
            Guests: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();           
        const rsvpData = {
            Name: this.state.Name,
            Email: this.state.Email,
            Phone: this.state.Phone,
            Attending: this.state.Attending,
            Guests: this.state.Guests
        }

        swal({
            title: "Updating Guest Information",
            text: "Click OK to confirm update",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((update) => {
            if (update) {
                axios.post('/rsvp/update/' + this.props.match.params.id, rsvpData)
                .then(res => console.log(res.data)); 
                swal("Guest information has been updated!", {
                    icon: "success",
                });
                
            } else {
                swal("Nothings' Changed");
            }
            }).then(()=>{
            this.props.history.push('/guests');            
            })
    }

    render() {
        return (
            <div>
                <h3>Change Your RSVP Details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-2 text-right">Name:  </label>
                        <div className="col-6"><input type="text" id="Name" className="form-control form-control-sm" placeholder="Name"                        
                        value={this.state.Name} 
                        onChange={this.onChangeName} /></div>  
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right">Email: </label>
                        <div className="col-6"><input type="text" id="Email" className="form-control form-control-sm" placeholder="Email" 
                        value={this.state.Email}
                        onChange={this.onChangeEmail}/></div> 
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right">Phone: </label>
                        <div className="col-6"><input type="text" id="Phone" className="form-control form-control-sm" placeholder="Phone Number" 
                        value={this.state.Phone}
                        onChange={this.onChangePhone}/></div> 
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right">Attending: </label>
                        <div className="col-6">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Attending" id="AttendingYes" 
                                value="Yes" 
                                onChange={this.onChangeAttending} 
                                checked= {this.state.Attending === "Yes"}/>
                                <label className="form-check-label" htmlFor="AttendingYes">Yes</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Attending" id="AttendingNo" 
                                value="No" 
                                onChange={this.onChangeAttending}
                                checked= {this.state.Attending === "No"} 
                                />
                                <label className="form-check-label" htmlFor="AttendingNo">No</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Attending" id="AttendingUndecided" 
                                value="Undecided" 
                                onChange={this.onChangeAttending} 
                                checked= {this.state.Attending === "Undecided"} 
                                />
                                <label className="form-check-label" htmlFor="AttendingUndecided">Undecided</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 text-right">Guests: </label>
                        <div className="col-6">
                            <input type="number" id="Guests" className="form-control form-control-sm" placeholder="Number of Guests" 
                            value={this.state.Guests}
                            onChange= {this.onChangeGuests}/>
                        </div> 
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6 col-sm-10 offset-2">
                        <input type="submit" value="Update" className="btn btn-sm btn-secondary mr-3"/>
                        <Link to={"/guests"} className="btn btn-info btn-sm">Cancel</Link>
                        </div>                       
                    </div>
                </form>
            </div>
        )
    }
}