import React from "react";
import PropTypes from "prop-types";
import { Col, Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const suggestionCard = ({ siteName, siteData }) => {
  return (
    <>
      <Col sm="3">
        <Card outline color="primary" className="border">
          <CardBody className="t-align d-flex suggestion-card ">
            <CardTitle className="mt-0">
              <>
                <i className="bx bx-check-shield me-2 font-size-22" />
                {siteName}
              </>
            </CardTitle>
            <CardText className="mb-0">
              <Badge color="light" pill={true} className="font-size-12 ">
                <b>₹ {siteData?.price}</b>
              </Badge>
            </CardText>
            <Link
              to={{
                pathname: `/ecommerce-buy-domain-name/${siteName}`,
                state: { siteData: siteData },
              }}
            >
              <p className="btn btn-primary">Buy Now</p>
            </Link>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

suggestionCard.propTypes = {
  siteName: PropTypes.string,
  siteData: PropTypes.object,
};

export default suggestionCard;
