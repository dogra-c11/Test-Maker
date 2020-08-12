import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import ShowResponse from './ShowResponse';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'


export default class MyForms extends React.Component {
  constructor() {
    super();
    const user = localStorage.getItem("user");
    this.state = {
      loggedin: true,
      forms: [],
        user: user,
      showformid:"",
      deleteformid: "",
      lgShow: false,
      spinner:true,
    };
  }

  componentWillMount() {
    axios
      .post("http://localhost:9000/showforms", this.state)
      .then((res) => {
        console.log(res.data);
        
        this.setState({ forms: res.data ,lgShow:false,spinner:false});
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  setLgShow = () => {
    this.setState({ lgShow: false });
  };

    showform = (id) => {
        this.setState({ showformid: id });
  }
  
  deleteformconfirm = (id) => {
    this.setState({ deleteformid: id },()=>{this.setState({lgShow:true})});
  }

  deleteformexecute = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/deleteform", this.state)
      .then((res) => {
        console.log(res.data);
        if (res.data.result.n === 1)
          this.componentWillMount();
      })
      .catch((err) => {
        console.error(err);
      });
  }


  render() {
    // if (!this.state.loggedin) {
    //   return <Redirect to="/sign-in" />;
    // }
    let id = this.state.showformid;
      if (id != "") {
        return <Redirect
        to={{
          pathname: "/show_response",
          search: "?utm="+id+"",
        }}
      />
      }
    return (
      <>
        <div className="forms">
          <Jumbotron className="jb">
            <h2>Create a new Form</h2>
            <Link to="/create_form" className="btn btn-primary link">
              Create Form
            </Link>
          </Jumbotron>
          <h3><u>Previous Forms</u></h3><br/>
          {this.state.forms.length === 0 ? (<>
           {this.state.spinner===true?(<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>):<p>No form made yet.</p>} 
        </>  ) : (
            this.state.forms.map((form) => (
              <>
                <div
                  style={{
                    padding:"4%",
                    backgroundColor: "#d580ff",
                    marginBottom: "30px",
                    boxShadow: "5px 5px 2px 2px #b3b3b3",
                  }}
                >
                  <p> Form Id : {form._id}</p>
                  <p> Form Name : {form.name}</p>
                  <Button variant="info" onClick={() => this.showform(form._id)}>Show Responses</Button><br/><br/>
                  <Button variant="danger" onClick={()=>this.deleteformconfirm(form._id)}>Delete</Button>
                </div>
              </>
            ))
          )}
        </div>

        <Modal 
          show={this.state.lgShow}
          onHide={this.setLgShow}>
  <Modal.Header closeButton>
    <Modal.Title>Confirmation</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Are you sure you want to delete.</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="danger" onClick={(e) =>this.deleteformexecute(e)}>Delete</Button>
  </Modal.Footer>
</Modal>
      </>
    );
  }
}
