import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import swal from 'sweetalert';

var guestCount = 0;

export default class IndexRsvp extends Component {
    constructor(props){
        super(props);
        this.state = {rsvp: []};
    }
    componentDidMount(){
        axios.get('/rsvp')
             .then(response => {
                 //console.log(response.data);
                 this.setState({ rsvp: response.data});
            }).catch((error) => {
                swal("Nothing Here !","I cant get your guest data right now", "error");
            });
    }
    tabRow(){
        return this.state.rsvp.map((rsvp, i) => {
            guestCount = guestCount + rsvp.Guests;
            return <TableRow obj={rsvp} key={i} />;
        });
    }
    render() {
        return (
            <div>
                <h3>Your RSVPs</h3>
                <table className="table table-striped">
                    <thead className="rsvp-thead">
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Attending</td>
                            <td>Guests</td>
                            <td colSpan='2'>Actions</td>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table>
            </div>
        )
    }
}