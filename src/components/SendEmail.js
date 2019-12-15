import React, { Component } from 'react';
import swal from 'sweetalert';

const sendEmail = (email, userName = "Ashanti") => {
    return fetch("http://localhost:4000/rsvp/sendrsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userName })
    }).then((response) => {
      if(response.status === 200){
      swal("Message Sent !", "Message has been sent", "success");
    } else {
      swal("Error !!","Something went wrong :(", "error");
    }
    })
  };


export default class SendEmail extends Component {
  constructor(props){
    super(props);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { email: '' }
}

    onChangeEmailAddress(e){
      this.setState({
        email: e.target.value
      })
    }

    onSubmit(e){
      e.preventDefault();
      const email = this.state.email;
        if (email) {
          sendEmail(email)
        }
      this.setState({ email: '' })
      }

    render(){
        return (
            <div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label htmlFor="EmailAddress">Email Address(s)</label>
                  <input type="email" placeholder="you@youmail.com" className="form-control form-control-sm col-6" id="EmailAddress" onChange={this.onChangeEmailAddress} />
              </div>
              <button className="btn btn-sm btn-info my-2 my-sm-0" type="submit">Send Email</button>
            </form>
          </div>
        )
    }
}