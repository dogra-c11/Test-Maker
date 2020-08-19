import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";

export default class FillResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      form: {},
      user: {},
      showform: false,
      lgShow: false,
      loggedin: false,
      loadingbtn: false,
    };
    String.prototype.unquoted = function () {
      return this.replace(/(^")|("$)/g, "");
    };
  }

  componentWillMount() {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user);
      this.setState({ loggedin: true, user: user });
    }
  }

  myIdChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({ id: e.target.value });
  };

  myResponseChangeHandler = (e, question) => {
    console.log(e.target.value);
    let n = this.state.form.questions.indexOf(question);
    let form = { ...this.state.form };
    form.questions[n].answer = e.target.value;
    this.setState({ form });
  };

  myIdHandler = (event) => {
    event.preventDefault();
    if (this.state.id.trim() != "") {
      this.setState({ loadingbtn: true }, () => {
        axios
          .post(
            "https://cors-anywhere11.herokuapp.com/https://testmaker-server.herokuapp.com/fillform",
            this.state,
          )
          .then((res) => {
            console.log(res.data);
            if (res.data === false) alert("enter correct id");
            else this.setState({ form: res.data, showform: true });
            this.setState({ loadingbtn: false });

          })
          .catch((err) => {
            console.error(err);
            this.setState({ loadingbtn: false });
          });
      });
    } else alert("Fill all details correctly");
  };

  myResponseHandler = (event) => {
    event.preventDefault();
    const un = localStorage.getItem("username").unquoted();
    const em = localStorage.getItem("email").unquoted();

    let form = { ...this.state.form };
    if (form.details.name === false) form.details.name = un;
    if (form.details.email === false) form.details.email = em;
    this.setState({ form }, () => {
      this.myResponseHandler2();
    });
  };

  myResponseHandler2() {
    let submit = true;
    this.state.form.questions.map((question) => {
      if (question.required && question.answer.trim() == "") {
        alert("Fill all answers");
        submit = false;
      }
    });
    if (submit) {
      axios
        .post(
          "https://cors-anywhere11.herokuapp.com/https://testmaker-server.herokuapp.com/saveresponse",
          this.state,
        )
        .then((res) => {
          console.log(res.data);
          this.setState({ lgShow: true });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  handleDropdownChange = (e, question) => {
    console.log(e.target.value);
    let n = this.state.form.questions.indexOf(question);
    let form = { ...this.state.form };
    form.questions[n].answer = e.target.value;
    this.setState({ form });
  };

  handleClose = () => {
    this.setState({ lgShow: false, showform: false });
  };

  handleRangeChange = (e, question) => {
    console.log(e.target.value);
    let n = this.state.form.questions.indexOf(question);
    let form = { ...this.state.form };
    form.questions[n].answer = e.target.value;
    this.setState({ form });
    console.log(this.state);
  };

  detailsHandler = (e) => {
    let form = { ...this.state.form };
    console.log(e.target.value);
    if (e.target.name === "name") form.details.name = e.target.value;
    else if (e.target.name === "rollno") form.details.rollno = e.target.value;
    else if (e.target.name === "email") form.details.email = e.target.value;
    this.setState({ form });
    console.log(this.state);
  };

  getRange = (start, end) => {
    let ar = [];
    for (let i = parseInt(start); i <= end; i++) {
      ar.push(i);
    }
    return ar;
  };

  render() {
    if (!this.state.loggedin) {
      return <Redirect to="/sign-in" />;
    }
    return (
      <>
        <Navbar />

        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              {this.state.showform === false ? (
                <>
                  <Form onSubmit={this.myIdHandler}>
                    <Form.Group
                      style={{ padding: "10px", borderTop: "15px solid black" }}
                    >
                      <Form.Label>Enter Test Id .</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        required
                        onChange={this.myIdChangeHandler}
                      />
                      <br />

                      {this.state.loadingbtn === false ? (
                        <Button variant="warning" type="submit" size="lg">
                          Next
                        </Button>
                      ) : (
                        <Button variant="warning" disabled>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Fetching your Test...
                        </Button>
                      )}
                    </Form.Group>
                  </Form>
                </>
              ) : (
                <Form onSubmit={this.myResponseHandler}>
                  <Form.Group
                    style={{ padding: "10px", borderTop: "15px solid black" }}
                  >
                    <Form.Label>
                      <h2>{this.state.form.name}</h2>
                    </Form.Label>
                    <br />

                    <Form.Label>{this.state.form.description}</Form.Label>
                  </Form.Group>
                  <Form.Group
                    style={{ backgroundColor: "white", marginBottom: "30px" }}
                  >
                    {this.state.form.details.name === true ? (
                      <>
                        <Form.Label>
                          <b>Name</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          onChange={this.detailsHandler}
                        />
                      </>
                    ) : null}
                    {this.state.form.details.rollno === true ? (
                      <>
                        <Form.Label>
                          <b>Roll No</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="rollno"
                          required
                          onChange={this.detailsHandler}
                        />
                      </>
                    ) : null}
                    {this.state.form.details.email === true ? (
                      <>
                        <Form.Label>
                          <b>Email Id</b>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          required
                          onChange={this.detailsHandler}
                        />
                      </>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Col>
                        {this.state.form.questions.map((question) => (
                          <Form.Group
                            style={{
                              backgroundColor: "white",
                              padding: "10px",
                              boxShadow: "5px 5px 2px 2px dimgrey",
                            }}
                          >
                            <span>Q: </span>
                            {question.selectValue === "text" ? (
                              <>
                                <Form.Label>
                                  <b>{question.question}</b>
                                </Form.Label>
                                {question.required === true ? (
                                  <span
                                    style={{ color: "red", fontSize: "25px" }}
                                  >
                                    *
                                  </span>
                                ) : null}

                                <Form.Control
                                  placeholder="Short answer text"
                                  onChange={(e) =>
                                    this.myResponseChangeHandler(e, question)
                                  }
                                />
                              </>
                            ) : null}
                            {question.selectValue === "range" ? (
                              <>
                                <Form.Label>
                                  <b>{question.question}</b>
                                </Form.Label>
                                {question.required === true ? (
                                  <span
                                    style={{ color: "red", fontSize: "25px" }}
                                  >
                                    *
                                  </span>
                                ) : null}
                                <br />

                                {this.getRange(
                                  question.start,
                                  question.end,
                                ).map((l) => (
                                  <Form.Check
                                    inline
                                    name="radiogrp"
                                    label={l}
                                    type="radio"
                                    value={l}
                                    onChange={(e) =>
                                      this.handleRangeChange(e, question)
                                    }
                                  />
                                ))}
                              </>
                            ) : null}
                            {question.selectValue === "dropdown" ? (
                              <>
                                <Form.Label>
                                  <b>{question.question}</b>
                                </Form.Label>
                                {question.required === true ? (
                                  <span
                                    style={{ color: "red", fontSize: "25px" }}
                                  >
                                    *
                                  </span>
                                ) : null}
                                <Form.Control
                                  as="select"
                                  size="lg"
                                  custom
                                  onChange={(e) => {
                                    this.handleDropdownChange(e, question);
                                  }}
                                >
                                  {question.options.map((option) => (
                                    <option value={option.q}>{option.q}</option>
                                  ))}
                                </Form.Control>
                              </>
                            ) : null}
                          </Form.Group>
                        ))}
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  
                  {this.state.loadingbtn === false ? (
                        <Button variant="success" type="submit">
                        Submit
                    </Button>
                      ) : (
                        <Button variant="success" disabled>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Submitting...
                        </Button>
                      )}
                </Form>
              )}

              <Modal
                show={this.state.lgShow}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <b>Response Submitted Successfully!</b>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
