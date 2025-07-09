import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardBody, Container, Row, Button } from "reactstrap";

const DomainPaymentStatus = () => {
  const { id } = useParams();
  const history = useNavigate();
  const location = useLocation();
  const { siteData } = location.state;

  useEffect(() => {
    if (id.toString() !== "success") {
      setTimeout(() => {
        history({
          pathname: `/ecommerce-buy-domain-name/${siteData?.domain}`,
          state: { siteData },
        });
      }, 5000);
    }
  }, []);

  let output = <></>;

  if (id.toString() === "fail") {
    output = (
      <Card
        color="danger"
        outline
        className="border t-align"
        style={{ margin: "auto" }}
      >
        <CardBody>
          <div style={{ height: "120px" }}>
            <i
              className="bx bx-block mb-4 check-animation "
              style={{
                color: "#f46a6a",
                fontSize: "86px",
              }}
            />
          </div>

          <h1 className="mt-4" style={{ color: "#f46a6a" }}>
            RETRY <br />
            Payment Failed !
          </h1>

          <div className=" mb-4 mt-4">
            <Link
              to={`/ecommerce-your-domains`}
              className='className="btn-sm btn-rounded me-2'
            >
              <Button color="primary">Retry Payment</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  } else if (id.toString() === "success") {
    output = (
      <Card
        color="success"
        outline
        className="border t-align"
        style={{ margin: "auto" }}
      >
        <CardBody>
          <div style={{ height: "120px" }}>
            <i
              className="mdi  mdi-check-decagram mb-4 check-animation "
              style={{
                color: "#34c38f",
                fontSize: "86px",
              }}
            />
          </div>

          <h1 className="mt-4" style={{ color: "#34c38f" }}>
            Payment is successfully received
          </h1>

          <div className=" mb-4 mt-4">
            <Link
              to={`/ecommerce-your-domains`}
              className='className="btn-sm btn-rounded me-2'
            >
              <Button color="primary">Your Domains</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  } else {
    output = <></>;
  }

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row xs="2">{output}</Row>
        </Container>
      </div>
    </>
  );
};

export default DomainPaymentStatus;
