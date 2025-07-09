import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Label,
  Form,
  FormFeedback,
  Input,
} from "reactstrap";

import { updateCustomer as onUpdateCustomer } from "store/e-commerce/actions";

const EditContact = ({ customer }) => {
  const dispatch = useDispatch();


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: (customer && customer.username) || "",
      phone: (customer && customer.phone) || "",
      email: (customer && customer.email) || "",
      address: (customer && customer.address) || "",
      rating: (customer && customer.rating) || "",
      walletBalance: (customer && customer.walletBalance) || "",
      joiningDate: (customer && customer.joiningDate) || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
      rating: Yup.string().required("Please Enter Your Rating"),
      walletBalance: Yup.string().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: values => {
      const updateCustomer = {
        ...customer,
        username: values.username,
        phone: values.phone,
        email: values.email,
        address: values.address,
        rating: values.rating,
        walletBalance: values.walletBalance,
        joiningDate: values.joiningDate,
      };
      // update customer
      dispatch(onUpdateCustomer(updateCustomer));
      validation.resetForm();
      toggle();
    },
  });

  return (
    <>
      <a
        className="text-muted item-center"
        onClick={toggle}
        style={{ fontSize: "0.8rem" }}
      >
        Edit Customer
      </a>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          Edit Customer
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Row form>
              <Col className="col-12">
                <div className="mb-3">
                  <Label className="form-label">UserName</Label>
                  <Input
                    name="username"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username
                        ? true
                        : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors.username}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Phone No</Label>
                  <Input
                    name="phone"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone || ""}
                    invalid={
                      validation.touched.phone && validation.errors.phone
                        ? true
                        : false
                    }
                  />
                  {validation.touched.phone && validation.errors.phone ? (
                    <FormFeedback type="invalid">
                      {validation.errors.phone}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Email Id</Label>
                  <Input
                    name="email"
                    type="email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Address</Label>
                  <Input
                    name="address"
                    type="textarea"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.address || ""}
                    invalid={
                      validation.touched.address && validation.errors.address
                        ? true
                        : false
                    }
                  />
                  {validation.touched.address && validation.errors.address ? (
                    <FormFeedback type="invalid">
                      {validation.errors.address}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Rating</Label>
                  <Input
                    name="rating"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.rating || ""}
                    invalid={
                      validation.touched.rating && validation.errors.rating
                        ? true
                        : false
                    }
                  />
                  {validation.touched.rating && validation.errors.rating ? (
                    <FormFeedback type="invalid">
                      {validation.errors.rating}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Wallet Balance</Label>
                  <Input
                    name="walletBalance"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.walletBalance || ""}
                    invalid={
                      validation.touched.walletBalance &&
                      validation.errors.walletBalance
                        ? true
                        : false
                    }
                  />
                  {validation.touched.walletBalance &&
                  validation.errors.walletBalance ? (
                    <FormFeedback type="invalid">
                      {validation.errors.walletBalance}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Joining Date</Label>
                  <Input
                    name="joiningDate"
                    type="date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.joiningDate || ""}
                    invalid={
                      validation.touched.joiningDate &&
                      validation.errors.joiningDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.joiningDate &&
                  validation.errors.joiningDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.joiningDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success save-customer"
                  >
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

EditContact.propTypes = {
  customer: PropTypes.object,
};

export default EditContact;
