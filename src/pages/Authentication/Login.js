import PropTypes from "prop-types";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logo.svg";

const Login = props => {

  //meta title
  document.title = "Login | Scrollit";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    }, 
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please Enter Your Email"),
      password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol'
      ).required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      console.log('values ', values);
      dispatch(loginUser(values, props.router.navigate));
    }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

    const signIn = type => {
        dispatch(socialLogin(type, props.router.navigate));
    };

  //for facebook and google authentication
  const socialResponse = type => {
    signIn(type);
  };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to TWT.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                        <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {/*error ? <Alert color="danger">{error}</Alert> : null*/}

                      <div className="mb-3">
                        <Label className="form-label">Email<span className="text-danger"> *</span></Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password<span className="text-danger"> *</span></Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      {/* <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div> */}

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} TWT. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Scrollit
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
