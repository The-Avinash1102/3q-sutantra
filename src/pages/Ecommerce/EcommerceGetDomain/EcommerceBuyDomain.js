import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

import {
  domainOrderId as fetchDomainOrderId,
  buyDomain,
  domainPaymentCleanup,
} from "../../../store/domain/action";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  Table,
  Button,
  UncontrolledTooltip,
  Form,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";

const EcommerceBuyDomain = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const { siteData } = location.state ?? [''];

  const { domainOrderId, domainPayment } = useSelector(state => ({
    domainOrderId: state.domain.domainOrderId,
    domainPayment: state.domain.domainPayment,
  }));

  const [orderId, setOrderId] = useState("");
  const [domain, setDomain] = useState(`${siteData?.domain}`);
  const [paymentId, setPaymentId] = useState("");
  const [price, setPrice] = useState(siteData?.price);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //Discount-- putting a discount on domain price
  const [discount, setDiscount] = useState("25");
  //old Price-- use this if putting a discount
  const [oldPrice, setOldPrice] = useState("999");

  //form validation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This value is required"),
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: values => {
      setName(values.username);
      setEmail(values.email);
    },
  });

  //Discount UI
  let discountUI;

  if (discount) {
    discountUI = (
      <Badge
        color="success"
        pill={true}
        className="font-size-16 domain-Discount"
        style={{ padding: "6px 12px" }}
      >
        Save {discount} %
      </Badge>
    );
  } else {
    discountUI = <></>;
  }

  const razorpayOptions = {
    key: "rzp_test_KCns9y0bMDlFmK",
    amount: Math.round(price) * 100, // Amount in paise
    name: "My Company",
    description: "Domain purchase",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      setPaymentId(response.razorpay_payment_id);
    },
    prefill: {
      name: `${name}`,
      email: `${email}`,
    },
    notes: {
      domain: domain,
    },
    theme: {
      color: "#F37254",
    },
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (domainOrderId && Object.keys(domainOrderId).length) {
      setOrderId(domainOrderId?.id);
    }
  }, [domainOrderId]);

  useEffect(() => {
    if (orderId) {
      new window.Razorpay({
        ...razorpayOptions,
        order_id: orderId,
      }).open();
    }
  }, [orderId]);

  useEffect(() => {
    if (paymentId && paymentId.length) {
      dispatch(buyDomain(domain, paymentId));
    }
  }, [paymentId]);

  useEffect(() => {
    if (domainPayment && Object.keys(domainPayment).length) {
      //more payment status condition need to be added
      if (domainPayment?.statusCode.toString() === "10001") {
        return history({
          pathname: "/ecomm-Domain-paymentStatus/fail",
          state: { siteData },
        });
      }
    }
  }, [domainPayment]);

  useEffect(() => {
    return () => {
      dispatch(domainPaymentCleanup());
    };
  }, []);

    //meta title
    document.title = "Dashboard | Scrollit";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <h1 className="mb-4" style={{ fontWeight: "600" }}>
              You’re almost there! Complete your order
            </h1>

            {/* 1. Choose Period */}
            <h1 className="mt-4 mb-4">1. Choose a period</h1>
            <Card style={{ position: "relative" }}>
              <CardBody>
                <div className="d-flex align-item">
                  <Col>
                    <p
                      className="font-size-20 mb-0 "
                      style={{ fontWeight: 600 }}
                    >
                      <i
                        className="bx bx-check-shield me-2 "
                        id="privacyIcon"
                      />
                      <UncontrolledTooltip
                        placement="bottom"
                        target="privacyIcon"
                      >
                        Domain privacy protection hides your personal
                        information.It helps to avoid spam and keeps your data
                        safe from the public.
                      </UncontrolledTooltip>
                      {siteData?.domain}
                    </p>
                  </Col>
                  <Col className="d-flex align-item justify-space-between ">
                    <Col xs={5} style={{ position: "relative" }}>
                      <span className="domain-period">Period</span>
                      <label
                        className="visually-hidden"
                        htmlFor="inlineFormSelectPref"
                      >
                        Period
                      </label>
                      <select
                        defaultValue="0"
                        className="form-select font-size-16"
                      >
                        <option value="0">1 year</option>
                      </select>
                    </Col>
                    {discountUI}
                    <div style={{ textAlign: "end" }}>
                      <p style={{ margin: "0" }}>
                        <del>{oldPrice}</del>
                      </p>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "20px",
                          fontWeight: "600",
                        }}
                      >
                        Rs {price}/yr
                      </p>
                    </div>
                  </Col>
                </div>
              </CardBody>
            </Card>

            {/* 2. Details */}
            <h1 className="mt-4 mb-4">2. Details</h1>
            <Card>
              <CardBody>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    validationType.handleSubmit();
                    return false;
                  }}
                >
                  <div className="mb-3">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="username"
                      placeholder="Enter Name"
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.username || ""}
                      invalid={
                        validationType.touched.username &&
                        validationType.errors.username
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.username &&
                    validationType.errors.username ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.username}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">E-Mail</Label>
                    <Input
                      name="email"
                      placeholder="Enter Valid Email"
                      type="email"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.email || ""}
                      invalid={
                        validationType.touched.email &&
                        validationType.errors.email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.email &&
                    validationType.errors.email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <Button type="submit" color="primary" className="">
                      Submit
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>

            {/*3.  Confirmation */}
            <h1 className="mt-4 mb-4">2. Confirmation</h1>
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-nowrap">
                    <thead>
                      <tr>
                        <th>Site</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Duration</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{domain}</td>
                        <td className="text-end">{price}</td>
                        <td className="text-end">1</td>
                        <td className="text-end">{price * 1}</td>
                      </tr>

                      <tr>
                        <td colSpan="3" className="text-end">
                          Sub Total
                        </td>
                        <td className="text-end">{price}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="border-0 text-end">
                          <strong>Total</strong>
                        </td>
                        <td className="border-0 text-end">
                          <h4 className="m-0">₹ {price}</h4>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div style={{ textAlign: "end" }}>
                  <Button
                    color="primary"
                    onClick={() => dispatch(fetchDomainOrderId(domain, price))}
                  >
                    Proceed to Pay <i className="mdi mdi-arrow-right" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EcommerceBuyDomain;
