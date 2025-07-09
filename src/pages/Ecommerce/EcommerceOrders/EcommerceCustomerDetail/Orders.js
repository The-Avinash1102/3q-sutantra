import React, { useState, useEffect, useRef } from "react";
import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap";
import PropTypes from "prop-types";
import * as moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import { getCustomerOrder } from "store/actions";
import OrderDetail from "./OrderDetail";

const Orders = ({ id, customActiveTab }) => {
  const dispatch = useDispatch();
  // const { SearchBar } = Search;
  var node = useRef();

  const [orderList, setOrderList] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});

  const toggle = () => setModal(!modal);

  const { customerOrder } = useSelector(state => ({
    customerOrder: state.ecommerce.customerOrder,
  }));

  useEffect(() => {
    if (id && customActiveTab === "5") {
      dispatch(getCustomerOrder(id));
    }
  }, [customActiveTab]);

  useEffect(() => {
    if (customerOrder.data) {
      setOrderList(customerOrder.data);
    }
  }, [customerOrder]);

  const toLowerCase1 = str => {
    return str === "" || str === undefined ? "" : str.toLowerCase();
  };

  const orderColumns = [
    {
      dataField: "_id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "orderDate",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) =>
        handleValidDate(row.orderDate.slice(0, 10)),
    },
    {
      dataField: "totalPrice",
      text: "Total",
      sort: true,
      formatter: (cell, row, rowIndex) => <span>{`₹ ${row?.totalPrice}`}</span>,
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={"font-size-12 badge-soft-" + row.badgeclass}
          color={row.badgeClass}
          pill
        >
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      dataField: "paymentMethod",
      isDummyField: true,
      text: "Payment Method",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <i
            className={
              row.paymentMethod !== "COD"
                ? "fab fa-cc-" + toLowerCase1(row.paymentMethod) + " me-1"
                : "fab fas fa-money-bill-alt me-1"
            }
          />{" "}
          {row.paymentMethod}
        </>
      ),
    },
    {
      dataField: "view",
      isDummyField: true,
      text: "View Details",
      // eslint-disable-next-line react/display-name
      formatter: (cell, row) => (
        <>
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
            onClick={e => {
              toggle();
              setData(row);
            }}
          >
            View Details
          </Button>
        </>
      ),
    },
  ];

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const pageOptions = {
    sizePerPage: 10,
    totalSize: orderList?.length,
    custom: true,
  };

  return (
    <>
      <OrderDetail isOpen={modal} toggle={toggle} Data={data} />
      <Row>
        <Col>
          <Card>
            {/* <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="_id"
                columns={orderColumns}
                data={orderList}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="_id"
                    data={orderList}
                    columns={orderColumns}
                    bootstrap4
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row className="mb-2">
                          <Col sm="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField="_id"
                                data={orderList}
                                columns={orderColumns}
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

Orders.propTypes = {
  id: PropTypes.string,
  customActiveTab: PropTypes.string,
};

export default Orders;
