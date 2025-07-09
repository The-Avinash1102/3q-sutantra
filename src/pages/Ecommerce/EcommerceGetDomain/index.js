import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  Alert,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  domainAvailability as onDomainAvailability,
  domainSuggestion as onDomainSuggestion,
  domainCleanup,
} from "../../../store/domain/action";

import SuggestionCard from "./SuggestionCard.js";
import Breadcrumbs from "components/Common/Breadcrumb";

const EcommerceGetDomain = () => {
  const dispatch = useDispatch();

  const { domainAvailability, domainSuggestion } = useSelector(state => ({
    domainAvailability: state.domain.domainAvailability,
    domainSuggestion: state.domain.domainSuggestion,
  }));

  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  //Discount-- putting a discount on domain price
  const [discount, setDiscount] = useState("");
  //old Price-- use this if putting a discount
  const [oldPrice, setOldPrice] = useState("");

  //Getting search input
  function searchAction() {
    const searchInput = document.getElementById("domain-search")?.value;
    setInput(searchInput.toString());
  }

  //Discount UI
  let discountUI;

  if (discount) {
    discountUI = (
      <Badge color="primary" pill={true} className="font-size-12">
        Save {discount} %
      </Badge>
    );
  } else {
    discountUI = <></>;
  }

  useEffect(() => {
    if (input && input.length) {
      dispatch(onDomainAvailability(input));
      dispatch(onDomainSuggestion(input));
    }
  }, [input]);

  useEffect(() => {
    if (domainSuggestion) {
      setSuggestion(domainSuggestion);
    }
  }, [domainSuggestion]);

  useEffect(() => {
    return () => {
      dispatch(domainCleanup());
    };
  }, []);

    //meta title
    document.title = "Dashboard | Scrollit";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row style={{ textAlign: "right" }}>
            <Link
              to={`/ecommerce-your-domains`}
              className='className="btn-sm btn-rounded me-2 mb-4'
            >
              Your Domains
            </Link>
            <Breadcrumbs
              title="Ecommerce"
              // count={customers.length}
              breadcrumbItem="Get Domain"
            />
          </Row>
          <Row className="mt-4">
            <InputGroup style={{ justifyContent: "center" }}>
              <div className="col-md-10 ">
                <input
                  style={{
                    width: "100%",
                    opacity: "0.85",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                  name="domain-search"
                  id="domain-search"
                  className="form-control-lg"
                  type="search"
                  placeholder="Enter a Domain Name"
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      searchAction();
                    }
                  }}
                />
              </div>
              <Button size="lg" color="dark" onClick={searchAction}>
                <i className="bx bx-search " />
              </Button>
            </InputGroup>
          </Row>

          <Row style={{ marginTop: "50px" }}>
            <Col>
              {!input ? (
                <></>
              ) : domainAvailability?.data?.code ? (
                <div className="domain-notFound">
                  <div>
                    <Alert color="danger" className="font-size-18 mb-0">
                      <i className="mdi mdi-block-helper me-2 "></i>
                      Wrong Input Format !
                    </Alert>
                  </div>
                </div>
              ) : domainAvailability?.data?.available ? (
                <div className="getDomain-result domain-found ">
                  <div>
                    <Alert color="primary" className="font-size-18">
                      <i className="mdi mdi-check-all me-2"></i>
                      <i /> Domain is available!
                    </Alert>
                  </div>
                  <div className="domain-found-2 align-item">
                    <p
                      className="font-size-20 mb-0 "
                      style={{ fontWeight: 700 }}
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
                      {domainAvailability?.data?.domain}
                    </p>
                    {discountUI}
                    <div
                      className="d-flex align-item"
                      style={{ textAlign: "end" }}
                    >
                      <div className="me-2">
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
                          {domainAvailability?.data?.currency}{" "}
                          {domainAvailability?.data?.price}/
                          {domainAvailability?.data?.period} yr
                        </p>
                      </div>
                      <Link
                        to={{
                          pathname: `/ecommerce-buy-domain-name/${domainAvailability?.data?.domain}`,
                          state: { siteData: domainAvailability?.data },
                        }}
                      >
                        <Button color="primary">Buy Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="getDomain-result domain-notFound">
                  <div>
                    <Alert color="danger" className="font-size-18">
                      <i className="mdi mdi-block-helper me-2 "></i>
                      Domain is Taken !
                    </Alert>
                  </div>
                  <div>
                    <Alert color="light">
                      <b>
                        <p className="font-size-16">{input}</p>
                      </b>
                      <p className="font-size-14">
                        Sorry, this domain is already taken
                      </p>
                    </Alert>
                  </div>
                </div>
              )}
            </Col>
          </Row>

          <Row style={{ marginTop: "50px" }}>
            {input ? <h3>Suggested Domain Names </h3> : <></>}
            {domainSuggestion?.map(siteData => (
              <SuggestionCard
                siteName={siteData.domain}
                key={siteData.domain}
                siteData={siteData}
              />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EcommerceGetDomain;
