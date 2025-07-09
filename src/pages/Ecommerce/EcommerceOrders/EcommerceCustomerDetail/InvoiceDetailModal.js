import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as moment from "moment";
import { Row, Col, Card, CardBody, Modal, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { saveAs } from "file-saver";

// import jsPDF from "jspdf";

import logo from "assets/images/logo-dark.png";

const InvoiceDetailModal = ({
  show,
  onToggleClick,
  onCloseClick,
  invoiceDetail,
}) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (invoiceDetail) {
      setOrderItems(invoiceDetail?.orderItems);
    }
  }, [invoiceDetail]);

  //date-format
  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  //shipping charge
  let shipping = 0;

  //Download Pdf
  // const element = document.getElementById("print");
  // const handleDownload = () => {
  //   const pdf = new jsPDF();
  //   const report = new jsPDF("landscape", "pt", "a4");

  //   report.html(document.querySelector("#print")).then(() => {
  //     report.save("report.pdf");
  //   });
  // pdf.html(element, {
  //   callback: pdf => {
  //     pdf.setDrawColor("black");
  //     pdf.setLineWidth(1 / 72);
  //     pdf.line(0.5, 0.5, 0.5, 11.25);
  //     pdf.line(7.5, 0.5, 7.5, 11.25);
  //     pdf.save("a4.pdf");
  //   },
  // });
  // pdf.text(element.innerText, 10, 10);
  // pdf.save("try.pdf");
  // };

  return (
    <>
      <Modal size="xl" isOpen={show} toggle={onToggleClick}>
        <div className="modal-header">
          <button
            onClick={onCloseClick}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" id="print">
          <Container fluid>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="invoice-title">
                      <h4 className="float-end font-size-16">
                        Order # {invoiceDetail?._id}
                      </h4>
                      <div className="mb-4">
                        <img src={logo} alt="logo" height="20" />
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col xs="6">
                        <address>
                          <strong>
                            {/* <div className="mb-4">
                              <img
                              className="rounded-circle avatar-sm"
                              src={images[user.img]}
                              alt=""
                            />
                            </div> */}
                            Billed To:
                          </strong>
                          <br />
                          {map(
                            invoiceDetail?.customerId?.address.split(","),
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </address>
                      </Col>
                      <Col xs="6" className="text-end">
                        <address>
                          <strong>Shipped To:</strong>
                          <br />
                          {map(
                            ` ${invoiceDetail?.shippingAddress1}, ${invoiceDetail?.state},${invoiceDetail?.zip}`?.split(
                              ","
                            ),
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </address>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" className="mt-3">
                        <address>
                          <strong>Payment Method:</strong>
                          <br />
                          {invoiceDetail?.paymentMethod}
                          <br />
                          {invoiceDetail?.customerId?.email}
                        </address>
                      </Col>
                      <Col xs="6" className="mt-3 text-end">
                        <address>
                          <strong>Order Date:</strong>
                          <br />
                          {handleValidDate(
                            invoiceDetail?.orderDate?.slice(0, 10)
                          )}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">Order summary</h3>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Item</th>
                            <th className="text-end">Price</th>
                            <th className="text-end">Quantity</th>
                            <th className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems?.map((item, id) => (
                            <tr key={item._id}>
                              <td>{id + 1}</td>
                              <td>{item?.product?.name}</td>
                              <td className="text-end">
                                {item?.product?.price}
                              </td>
                              <td className="text-end">{item?.quantity}</td>
                              <td className="text-end">
                                {item?.product?.price * item?.quantity}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="4" className="text-end">
                              Sub Total
                            </td>
                            <td className="text-end">
                              {invoiceDetail?.totalPrice}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4" className="border-0 text-end">
                              <strong>Shipping</strong>
                            </td>
                            <td className="border-0 text-end">{shipping}</td>
                          </tr>
                          <tr>
                            <td colSpan="4" className="border-0 text-end">
                              <strong>Total</strong>
                            </td>
                            <td className="border-0 text-end">
                              <h4 className="m-0">
                                {invoiceDetail?.totalPrice + shipping}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-end">
                        <Link
                          to="#"
                          className="btn btn-info me-2"
                          // onClick={handleDownload}
                        >
                          <i className="mdi mdi-download d-block "></i>
                        </Link>
                        <Link
                          to="#"
                          onClick={printInvoice}
                          className="btn btn-success  me-2"
                        >
                          <i className="fa fa-print" />
                        </Link>
                        <Link to="#" className="btn btn-primary w-md me-2">
                          Send
                        </Link>
                        <button
                          type="button"
                          onClick={onToggleClick}
                          className="btn btn-secondary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>
    </>
  );
};

InvoiceDetailModal.propTypes = {
  onCloseClick: PropTypes.func,
  onToggleClick: PropTypes.func,
  show: PropTypes.any,
  invoiceDetail: PropTypes.object,
};

export default InvoiceDetailModal;
