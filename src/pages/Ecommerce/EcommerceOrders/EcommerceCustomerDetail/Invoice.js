import React, { useState, useEffect, useRef } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import * as moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import {
  getCustomerInvoice,
  deleteAllInvoice,
  deleteInvoice,
} from "store/actions";
import DeleteModal from "components/Common/DeleteModal";
import InvoiceDetailModal from "./InvoiceDetailModal";
// import DeleteAllModal from "components/Common/DeleteAllModal";

const Invoice = ({ id, customActiveTab }) => {
  const dispatch = useDispatch();
  // const { SearchBar } = Search;
  var node = useRef();

  const [data, setData] = useState([]);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState({});
  const [invoiceId, setInvoiceId] = useState();
  //large-screen Modal
  const [modal_xlarge, setmodal_xlarge] = useState(false);

  const { invoice } = useSelector(state => ({
    invoice: state.ecommerce.invoice,
  }));

  useEffect(() => {
    if (id && customActiveTab === "4") {
      dispatch(getCustomerInvoice());
    }
  }, [customActiveTab]);

  useEffect(() => {
    if (invoice && invoice.length) {
      setData(invoice);
    }
  }, [invoice]);

  const invoiceColumns = [
    {
      dataField: "_id",
      text: "Invoice Id",
    },
    {
      dataField: "orderDate",
      text: "Order Date",
      sort: true,
      formatter: (cellContent, row) =>
        handleValidDate(row.orderDate.slice(0, 10)),
    },
    {
      dataField: "totalPrice",
      text: "Total Amount",
      sort: true,
      formatter: (cell, row, rowIndex) => <span>{`₹ ${row?.totalPrice}`}</span>,
    },
    {
      dataField: "view",
      text: "View Invoice",
      formatter: (cell, row) => (
        <>
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
            onClick={() => {
              tog_xlarge();
              setInvoiceDetail(row);
            }}
          >
            View Invoice
          </Button>
        </>
      ),
    },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <i
            onClick={() => {
              setDeleteModal(true);
              setInvoiceId(row._id);
            }}
            className="mdi mdi-delete font-size-16"
            style={{ color: "#f46a6a" }}
          />
        </>
      ),
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: data?.length,
    custom: true,
  };

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  /*deleting all Invoice */
  const handleDeleteAllInvoice = () => {
    dispatch(deleteAllInvoice(id));
    setDeleteAllModal(false);
  };

  const handleDeleteInvoice = () => {
    dispatch(deleteInvoice(id, invoiceId));
    setDeleteModal(false);
  };

  //large-modal
  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  return (
    <>
      {/* <DeleteAllModal
        show={deleteAllModal}
        onDeleteClick={handleDeleteAllInvoice}
        onCloseClick={() => setDeleteAllModal(false)}
      /> */}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteInvoice}
        onCloseClick={() => setDeleteModal(false)}
      />
      <InvoiceDetailModal
        show={modal_xlarge}
        onToggleClick={tog_xlarge}
        onCloseClick={() => setmodal_xlarge(false)}
        invoiceDetail={invoiceDetail}
      />
      <Row>
        <Col>
          <Card>
            {/* <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="_id"
                columns={invoiceColumns}
                data={data}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="_id"
                    data={data}
                    columns={invoiceColumns}
                    bootstrap4
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row
                          className="mb-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Col sm="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="4" style={{ textAlign: "end" }}>
                            <Button
                              type="button"
                              color="danger"
                              className="btn-rounded"
                              onClick={() => {
                                setDeleteAllModal(true);
                              }}
                            >
                              <i className="mdi mdi-delete me-1" />
                              Delete All Invoice
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField="_id"
                                data={data}
                                columns={invoiceColumns}
                                headerClasses="table-light"
                                classes={
                                  "table align-middle table-nowrap table-check "
                                }
                                headerWrapperClasses={"table-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                                ref={node}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                            <PaginationListStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody> */}
          </Card>
        </Col>
      </Row>
    </>
  );
};

Invoice.propTypes = {
  id: PropTypes.string,
  customActiveTab: PropTypes.string,
};

export default Invoice;
