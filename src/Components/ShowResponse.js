import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Redirect } from "react-router-dom";

import Table from "react-bootstrap/Table";

export default class ShowResponse extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    let id = (new URLSearchParams(window.location.search)).get("utm")
    this.state = {
      id: id,
      responses: [{}],
      showresponses: false,
      showresponse: false,
      response: { form: { questions: [] } },
      lgShow: false,
      loggedin:false,
    };
  }

  componentWillMount() {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user)
      this.setState({loggedin:true})
    }

    this.myIdHandler();
  }
  
  myIdChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({ id: e.target.value });
  };

  myIdHandler = () => {
    //event.preventDefault();
    // if (this.state.id.trim() != "") {
      axios
        .post("http://localhost:9000/showresponses", this.state)
        .then((res) => {
          console.log(res.data);
          this.setState({ responses: res.data, showresponses: true });
        })
        .catch((err) => {
          console.error(err);
        });
  // } 
  //   else alert("Fill all details correctly");
  };

  responseHandler = (e, res) => {
    e.preventDefault();
    this.setState({ response: res, lgShow: true });
  };
  setLgShow = () => {
    this.setState({ lgShow: false });
  };

  render() {
    if (!this.state.loggedin) {
      return (
        <Redirect to="/sign-in"/>
      );
      }
    return (
      <>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              {this.state.showresponses === false ? (
               <p>No response yet</p> 
                // <Form onSubmit={this.myIdHandler}>
                //   <Form.Group
                //     style={{ padding: "10px", borderTop: "15px solid black" }}
                //   >
                //     <Form.Label>Enter Unique Id of the Form.</Form.Label>
                //     <Form.Control
                //       size="lg"
                //       type="text"
                //       required
                //       onChange={this.myIdChangeHandler}
                //     />
                //     <br />
                //     <Button variant="success" type="submit" size="lg">
                //       Next
                //     </Button>
                //   </Form.Group>
                // </Form>
              ) : (
                <>
                  <h2>RESPONSES </h2><br/>
                  <Table striped bordered hover>
                    {" "}
                    <thead>
                      <tr>
                          <th>Response ID</th>
                          <th>Name</th>
                          <th>RollNo</th>
                          <th>Email Id</th>
                          <th>....</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.responses.map((response) => (
                        <tr>
                          <td>{response._id}</td>
                          <td>{response.form.details.name}</td>
                          <td>{response.form.details.rollno}</td>
                          <td>{response.form.details.email}</td>

                          <td>
                            <Button
                              variant="primary"
                              onClick={(e) => this.responseHandler(e, response)}
                            >
                              Show
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
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
                  {this.state.response.form.description}<br/><br/>
                  {this.state.response.form.questions.map((question) => (
                    <>
                      {" "}
                      <p>Q: {question.question}</p>
                      <p>A: {question.answer}</p>
                    </>
                  ))}
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
