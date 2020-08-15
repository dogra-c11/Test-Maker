import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner'


export default class MyForms extends React.Component {
  constructor() {
    super();
    const user = localStorage.getItem("user");
    this.state = {
      loggedin: true,
      responses: [],
      response: { form: { questions: [] } },
      user: user,
      lgShow: false,
      spinner:true,
    };
  }

  componentWillMount() {
    axios
      .post("http://localhost:9000/showmyresponses", this.state)
      .then((res) => {
        console.log("mount",res.data);
        this.setState({ responses: res.data,spinner:false });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  responseHandler = (e, res) => {
    e.preventDefault();
    this.setState({ response: res, lgShow: true });
  };
  setLgShow = () => {
    this.setState({ lgShow: false });
  };

  render() {
    // if (!this.state.loggedin) {
    //   return <Redirect to="/sign-in" />;
    // }
    return (
      <>
        <div className="forms">
          <Jumbotron className="jb">
            <h2>Give a Test here</h2>
            <p>
              <Link to="/fill_response" className="btn btn-hover color-10 link">
                Answer Test
              </Link>

            </p>
          </Jumbotron><br/>
          <h3><u>Previous Responses</u></h3><br/>

          {this.state.responses.length === 0 ? (<>
            {this.state.spinner===true?(<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>):<p>No tests submitted yet.</p>}
         </> ) : (
            this.state.responses.map((response) => (
              <>
                <div
                  style={{
                    padding:"4%",

                    backgroundColor: "#d580ff",
                    marginBottom: "30px",
                    boxShadow: "5px 5px 2px 2px #b3b3b3",
                  }}
                >
                  <p> Test Id : <b>{response.id}</b></p>
                  <p> Test Name : <b>{response.form.name}</b></p>
                  <p> Submission Date :<b> {response.date.toString().substring(0,10)}</b></p>

                  <Button
                    variant="success"
                    onClick={(e) => this.responseHandler(e, response)}
                  >
                    Show Response
                  </Button>
                </div>
              </>
            ))
          )}
        </div>
        
        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={this.setLgShow}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Response
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.state.response.form.name}</h4>
            {this.state.response.form.description}
            <br />
            <br />
            {this.state.response.form.questions.map((question) => (
              <>
                {" "}
                <p>Q: {question.question}</p>
                <p>A: {question.answer}</p>
              </>
            ))}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
