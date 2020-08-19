import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Navbar from "./Navbar";

export default class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      questions: [
        {
          question: "",
          answer: "",
          selectValue: "text",
          options: [{ id: "option 1", q: "" }],
          start: "0",
          end: "2",
          required:false,
          i: 1,
        },
      ],
      details: { 
        name: false,
        rollno: false,
        email:false,
      },
      user:{},
      lgShow: false,
      loggedin:false,
    };
  }

  componentWillMount() {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user)
      this.setState({ loggedin: true, user: user }, () => console.log(this.state));
    }
    }

  handleDropdownChange = (e, question) => {
    console.log(e.target.value);
    let n = this.state.questions.indexOf(question);
    let questions = [...this.state.questions];
    questions[n].selectValue = e.target.value;
    this.setState({ questions });
  };

  handleRangeChange = (e, question) => {
    let n = this.state.questions.indexOf(question);
    let questions = [...this.state.questions];
    if(e.target.name==="start")
      questions[n].start = e.target.value;
    else if (e.target.name === "end")
    questions[n].end = e.target.value;
    this.setState({ questions });
    console.log(this.state)
  }

  addoptions = (question) => {
    let n = this.state.questions.indexOf(question);
    let questions = [...this.state.questions];
    questions[n].i += 1;
    questions[n].options.push({
      id: "option " + questions[n].i,
    });
    this.setState({ questions });
  };

  addquestions = () => {
    let newQuestion = {
      selectValue: "text",
      options: [{ id: "option 1" }],
      i: 1,
    };
    let questions = [...this.state.questions];
    questions.push(newQuestion);
    this.setState({ questions });
  };

  deleteQuestion = (question) => {
    let n = this.state.questions.indexOf(question);
    let questions = [...this.state.questions];
    questions.splice(n, 1);
    this.setState({ questions });
  };

  myChangeHandler = (e, question, option) => {
    console.log(e.target.value);

    if (e.target.name === "name") this.setState({ name: e.target.value });
    else if (e.target.name === "description")
      this.setState({ description: e.target.value });
    else {
      let n = this.state.questions.indexOf(question);
      let questions = [...this.state.questions];
      if (e.target.name === "question") questions[n].question = e.target.value;
      else if (e.target.name === "option") {
        let o = questions[n].options.indexOf(option);
        console.log(o);
        questions[n].options[o].q = e.target.value;
      }
      this.setState({ questions });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.name.trim() != "" && this.state.description.trim() != "") {
      axios
        .post("https://cors-anywhere11.herokuapp.com/https://testmaker-server.herokuapp.com/saveform", this.state)
        .then((res) => {
          console.log(res.data);
          this.setState({ lgShow: true });
        })
        .catch((err) => {
          console.error(err);
        });
    } else alert("Fill all details correctly");
  };

  handleClose = () => {
    this.setState({ lgShow: false });
  };
  handleRequire = (e,question) => {
    console.log(e.target.checked);
    let n = this.state.questions.indexOf(question);
    let questions = [...this.state.questions];
    questions[n].required = e.target.checked;
    this.setState({ questions });
  }

  handleDetails = (e) => {
    console.log(e.target.checked);
    let details = { ...this.state.details };
    if (e.target.name === "Name") {
      details.name = e.target.checked;
    }
    else if(e.target.name === "RollNo") {
      details.rollno = e.target.checked;
    }
    else if(e.target.name === "Email") {
      details.email = e.target.checked;
    }
    this.setState({ details });

  }

  render() {
    if (!this.state.loggedin) {
      return (
        <Redirect to="/sign-in"/>
      );
      }
    return (
      <>
        {/* <Navbar/> */}
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={this.mySubmitHandler}>
                <Form.Group
                  style={{ padding: "10px", borderTop: "15px solid black" }}
                >
                  <Form.Label><b>Title</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    onChange={(e) => this.myChangeHandler(e)}
                  />
                  <Form.Label><b>Description</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    required
                    onChange={(e) => this.myChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Row>
                    <Col>
                      {this.state.questions.map((question) => (
                        <Form.Group
                          style={{
                            padding: "10px",
                            backgroundColor: "white",
                            boxShadow:"5px 5px 2px 2px grey"
                          }}
                        >
                          <Form.Row style={{ marginBottom: "7px" }}>
                            <Col>
                              <Form.Control
                                size="lg"
                                placeholder="Untitled Question"
                                name="question"
                                required
                                onChange={(e) =>
                                  this.myChangeHandler(e, question)
                                }
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                as="select"
                                size="lg"
                                custom
                                onChange={(e) => {
                                  this.handleDropdownChange(e, question);
                                }}
                              >
                                <option value="text">Text</option>
                                <option value="dropdown">Dropdown</option>
                                <option value="range">Range</option>
                              </Form.Control>
                            </Col>
                          </Form.Row>
                          {question.selectValue === "text" ? (
                            <Form.Control
                              placeholder="Short answer text"
                              disabled
                            />
                          ) : null}
                          {question.selectValue === "range" ? (<>
                            <Form.Row><Col>
                            <Form.Control 
                            as="select"
                            size="sm"
                                custom
                                name="start"
                            onChange={(e) => {
                              this.handleRangeChange(e, question);
                            }}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                              </Form.Control></Col><Col><span>to</span></Col> 
                              <Col>
                          <Form.Control 
                                as="select"
                                size="sm"
                                  custom
                                  name="end"
                                onChange={(e) => {
                                  this.handleRangeChange(e, question);
                                }}
                              >
                                <option value="2">2</option>
                                <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </Form.Control></Col></Form.Row></>
                          ) : null}
                          {question.selectValue === "dropdown" ? (
                            <>
                              {question.options.map((option) => (
                                <Form.Control
                                  placeholder={option.id}
                                  name="option"
                                  required
                                  onChange={(e) =>
                                    this.myChangeHandler(e, question, option)
                                  }
                                />
                              ))}

                              <Button
                                variant="primary"
                                onClick={() => this.addoptions(question)}
                              >
                                Add options
                              </Button>
                            </>
                          ) : null}
                          <div style={{ marginTop: "5px", textAlign: "right" }}>
                            <label class="switch" >
                              <input type="checkbox" onChange={(e)=>this.handleRequire(e,question)}/>
                              <span class="slider round"> </span>
                            </label>{" "}
                            Required
                            <Button
                              style={{ marginLeft: "7px" }}
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                this.deleteQuestion(question); 
                              }}
                            >
                              X
                            </Button>{" "}
                          </div>
                        </Form.Group>
                      ))}
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" onClick={this.addquestions}>
                    Add Questions
                  </Button>
                </Form.Group>
                <Form.Group style={{backgroundColor:"lightcyan" ,boxShadow:"5px 5px 2px 2px grey",padding:"7px"}}>
                  <b>Details to be asked in response sheet.  </b><br/>
                        <Form.Check inline label="Name" type="checkbox" name="Name" onChange={this.handleDetails}/>
                        <Form.Check inline label="Roll No" type="checkbox" name="RollNo" onChange={this.handleDetails}/>
                        <Form.Check inline label="Email Id" type="checkbox" name="Email"  onChange={this.handleDetails}/><br/>
                </Form.Group>

               <Form.Group>
                <Button variant="success" type="submit">
                    Save
                </Button>
                </Form.Group>
              </Form>
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
                  <b>Form Saved Successfully!</b>
                </Modal.Body>
              </Modal>
            
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
