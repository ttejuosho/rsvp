import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this information!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            axios.get('http://localhost:4000/rsvp/delete/'+ this.props.obj._id)
            swal("Guest information has been deleted!", {
                icon: "success",
            });
            document.getElementById(this.props.obj._id).remove();
        } else {
          swal("Your guest information is safe!");
        }
      });
    }

  render() {
    return (
        <tr id={this.props.obj._id}>
          <td>
            {this.props.obj.Name}
          </td>
          <td>
            {this.props.obj.Email}
          </td>
          <td>
            {this.props.obj.Phone}
          </td>
          <td>
            {this.props.obj.Attending}
          </td>
          <td className="count">
            {this.props.obj.Guests}
          </td>
          <td>
            <Link to={"/editrsvp/"+ this.props.obj._id} className="btn btn-dark"><i className="fas fa-edit"></i></Link>
          </td>
          <td>
            <button className="btn btn-danger" onClick={this.delete}><i className="fas fa-trash-alt"></i></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;