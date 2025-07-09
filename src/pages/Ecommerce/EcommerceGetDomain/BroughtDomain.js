import React, { useRef } from "react";
import { Container, Button, Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import Breadcrumbs from "components/Common/Breadcrumb";

const BroughtDomain = () => {
  const { SearchBar } = Search;
  var node = useRef();

  const data = [];

  const invoiceColumns = [
    {
      text: "S.No.",
    },
    {
      text: "Domain Name",
    },
    {
      text: "Duration",
    },
    {
      text: "Valid Upto",
    },
    {
      text: "Actions",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: 1,
    custom: true,
  };

    //meta title
    document.title = "Dashboard | Scrollit";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row style={{ textAlign: "right" }}>
            <Link
              to={`/ecommerce-get-domain`}
              className='className="btn-sm btn-rounded me-2 mb-4'
            >
              Get Domains
            </Link>
            <Breadcrumbs
              title="Ecommerce"
              // count={customers.length}
              breadcrumbItem="Your Domains"
            />
          </Row>
          <Row className="mt-4">
            <Col>
              <Card>
                <CardBody>
                  {/* <PaginationProvider
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
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps?.searchProps} />
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
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BroughtDomain;
