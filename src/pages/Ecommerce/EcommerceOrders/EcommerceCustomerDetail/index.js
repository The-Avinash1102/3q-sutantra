import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  CardText,
} from "reactstrap";

import classnames from "classnames";
import { getCustomers as onGetCustomers } from "store/e-commerce/actions";
import EditContact from "./EditContact";
// import Notes from "./Notes";
import Overview from "./Overview";
// import Orders from "./Orders";
// import Invoice from "./Invoice";

const EcommerceCustomerDetail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const [customerData, setCustomerData] = useState(null);
  const [customActiveTab, setcustomActiveTab] = useState("1");

  const { customers } = useSelector(state => ({
    customers: state.ecommerce.customers,
  }));

  useEffect(() => {
    customers.map(ele => {
      if (ele._id.toString() === id.toString()) {
        setCustomerData(ele);
      }
    });
  }, [customers]);

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, []);

  //accordion
  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <span className="b-margin">
              <Link
                to="/ecommerce-customers"
                className="font-size-16 text-dark"
              >
                &#129056; View All Customers
              </Link>
            </span>
          </Row>
          <Card>
            <CardBody>
              <Row className="align-item f-direction t-align">
                <Col xs="5" className="d-flex f-direction align-item">
                  <div className="rounded-circle avatar-md customer-avatar text-center">
                    <p className="customer-position ">
                      {customerData?.username[0].toUpperCase()}
                    </p>
                  </div>

                  <div className="align_text">
                    <p className="text-dark font-size-24 mb-0 text-truncate">
                      {customerData?.username}
                    </p>
                    <EditContact customer={customerData} />
                  </div>
                </Col>

                <Col className="btn-responsive">
                  <span>
                    <Button
                      className="btn-rounded w-xl btn-margin"
                      onClick={e => setcustomActiveTab("2")}
                      color="primary"
                      outline
                    >
                      Send Message
                    </Button>
                  </span>
                  <div>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        color="primary"
                        className="w-xl btn-rounded btn-margin"
                        caret
                      >
                        More Actions
                        <i className="mdi mdi-chevron-down" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>1</DropdownItem>
                        <DropdownItem>2</DropdownItem>
                        <DropdownItem>3</DropdownItem>
                        <DropdownItem>4</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <p className="font-size-12 text-muted mb-0"> Email</p>
                  <p className="text-dark font-size-14 text-truncate mb-0">
                    {customerData?.email}
                  </p>
                </Col>
                <Col>
                  <p className="font-size-12 text-muted mb-0">Joining Date</p>
                  <p className="text-dark font-size-14 mb-0">
                    {customerData?.joiningDate}
                  </p>
                </Col>
                <Col>
                  <p className="font-size-12 text-muted mb-0">Contact</p>
                  <p className="text-dark font-size-14 text-truncate mb-0">
                    {`${customerData?.phone}`}
                  </p>
                </Col>
                <Col>
                  <p className="font-size-12 text-muted mb-0">Address</p>
                  <p className="text-dark font-size-14 text-truncate mb-0">
                    {`${customerData?.address}`}
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>

          {/* Accordion */}
          <Row>
            <Nav tabs className="nav-tabs-custom nav-justified">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "1",
                  })}
                  onClick={() => {
                    toggleCustom("1");
                  }}
                >
                  <span className="d-block d-sm-none">
                    <i className="fas fa-home"></i>
                  </span>
                  <span className="d-none d-sm-block">Overview</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "2",
                  })}
                  onClick={() => {
                    toggleCustom("2");
                  }}
                >
                  <span className="d-block d-sm-none">
                    <i className="far fa-user"></i>
                  </span>
                  <span className="d-none d-sm-block">Inbox</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "3",
                  })}
                  onClick={() => {
                    toggleCustom("3");
                  }}
                >
                  <span className="d-block d-sm-none">
                    <i className="far fa-envelope"></i>
                  </span>
                  <span className="d-none d-sm-block">Notes</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "4",
                  })}
                  onClick={() => {
                    toggleCustom("4");
                  }}
                >
                  <span className="d-block d-sm-none">
                    <i className="fas fa-cog"></i>
                  </span>
                  <span className="d-none d-sm-block">Invoice</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "5",
                  })}
                  onClick={() => {
                    toggleCustom("5");
                  }}
                >
                  <span className="d-block d-sm-none">
                    {/* <i className="fas fa-cog"></i> */}
                  </span>
                  <span className="d-none d-sm-block">Orders</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "6",
                  })}
                  onClick={() => {
                    toggleCustom("6");
                  }}
                >
                  <span className="d-block d-sm-none">
                    <i className="fas fa-subscript"></i>
                  </span>
                  <span className="d-none d-sm-block">Subscriptions</span>
                </NavLink>
              </NavItem>
            </Nav>
            <hr />
            <TabContent activeTab={customActiveTab} className="p-3 text-muted">
              {/* <TabPane tabId="1">
                <Overview id={id} customActiveTab={customActiveTab} />
              </TabPane> */}
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <CardText className="mb-0">
                      Food truck fixie locavore, accusamus mcsweeney&apos;s
                      marfa nulla single-origin coffee squid. Exercitation +1
                      labore velit, blog sartorial PBR leggings next level wes
                      anderson artisan four loko farm-to-table craft beer twee.
                      Qui photo booth letterpress, commodo enim craft beer
                      mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
                      Homo nostrud organic, assumenda labore aesthetic magna
                      delectus mollit. Keytar helvetica VHS salvia yr, vero
                      magna velit sapiente labore stumptown. Vegan fanny pack
                      odio cillum wes anderson 8-bit.
                    </CardText>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                {/* <Notes id={id} customActiveTab={customActiveTab} /> */}
              </TabPane>
              <TabPane tabId="4">
                {/* <Invoice id={id} customActiveTab={customActiveTab} /> */}
              </TabPane>
              <TabPane tabId="5">
                {/* <Orders id={id} customActiveTab={customActiveTab} /> */}
              </TabPane>
            </TabContent>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomerDetail;
