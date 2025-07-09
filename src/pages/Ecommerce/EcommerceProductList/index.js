import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from "lodash";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DeleteModal from '../../../components/Common/DeleteModal';

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteProductInList as onDeleteProduct,
  getProductList,
} from "store/actions";

import {
  ProductName,
  Date,
  Price,
  Category,
  ProductDisplay
}
  from "./EcommerceProductListCol";

//redux
import { useSelector, useDispatch } from "react-redux";
import EcommerceProductListModal from "./EcommerceProductListModal";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
} from "reactstrap";

function EcommerceProductList() {

  //meta title
  document.title = "Product List | Scrollit";

  const history = useNavigate();

  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  // edit Product
  const [isEdit, setIsEdit] = useState(false);

  //delete Product
  const [deleteModal, setDeleteModal] = useState(false);

  // const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (product && product.name) || "",
      createdAt: (product && product?.createdAt) || "2020-10-11",
      price: (product && product.price) || "",
      category: (product && product.categories[0]) || "",
      displayProduct: (product && product.displayProduct) || true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Product Name"),
      createdAt: Yup.string().required("Please Enter Product Creation Date"),
      price: Yup.string().required("Product Price")
    }),
    onSubmit: (values) => {
      const updatedProduct = {
        ...product,
        name: values.name,
        price: values.price.toString()
      }
      dispatch(updateProductInList(updatedProduct));
      validation.resetForm();
      toggle();
    },
  });


  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();
  const { products } = useSelector(state => ({
    products: state.ecommerce.productList,
  }));

  useEffect(() => {
    if (products && !products?.length) {
      dispatch(getProductList())
    }
  }, [dispatch]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (!isEmpty(products) && !!isEdit) {
      setOrderList(products);
      setIsEdit(false);
    }
  }, [products]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = arg => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      productName: order.productName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  const onClickDelete = (product) => {
    setProduct(product);
    setDeleteModal(true);
  };

  const handleDeleteProductFromList = () => {
    if (product && product._id) {
      dispatch(onDeleteProduct(product));
      setDeleteModal(false);
    }
  };
  const handleProductListClicks = () => {
    setProductList("");
    history('/ecommerce-add-product');
    // setIsEdit(false);
    // toggle();
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Product Name',
        accessor: 'name',
        filterable: true,
        Cell: (cellProps) => {
          return <ProductName {...cellProps} />;
        }
      },
      {
        Header: 'Date',
        accessor: 'productDate',
        filterable: true,
        Cell: (cellProps) => {
          return <Date {...cellProps} />;
        }
      },
      {
        Header: 'Price',
        accessor: 'price',
        filterable: true,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        }
      },
      {
        Header: 'Category',
        accessor: 'category',
        filterable: true,
        Cell: (cellProps) => {
          return <Category {...cellProps} />;
        }
      },
      {
        Header: 'Product Display',
        accessor: 'displayProduct',
        filterable: true,
        Cell: (cellProps) => {
          return <ProductDisplay {...cellProps} />;
        }
      },
      {
        Header: 'View Details',
        accessor: 'view',
        disableFilters: true,
        Cell: () => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>
            );
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const productData = cellProps.row.original;
                  handleProductListClicks(productData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const productData = cellProps.row.original;
                  console.log('productData ', productData);
                  onClickDelete(productData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <EcommerceProductListModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProductFromList}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" count={productList?.length} breadcrumbItem="Products List" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={products}
                    isGlobalFilter={true}
                    isProductListAddOptions={true}
                    handleProductListClicks={handleProductListClicks}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            {/* <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Order" : "Add Order"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Product Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Insert Billing Name"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name ? true : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Order Date</Label>
                      <Input
                        name="createdAt"
                        type="date"
                        // value={orderList.orderdate || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.createdAt || ""}
                        invalid={
                          validation.touched.createdAt && validation.errors.createdAt ? true : false
                        }
                      />
                      {validation.touched.createdAt && validation.errors.createdAt ? (
                        <FormFeedback type="invalid">{validation.errors.createdAt}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Total</Label>
                      <Input
                        name="price"
                        type="text"
                        placeholder="Insert Total Amount"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.price || ""}
                        invalid={
                          validation.touched.price && validation.errors.price ? true : false
                        }
                      />
                      {validation.touched.price && validation.errors.price ? (
                        <FormFeedback type="invalid">{validation.errors.price}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Payment Status</Label>
                      <Input
                        name="paymentStatus"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentStatus || ""
                        }
                      >
                        <option>Paid</option>
                        <option>Chargeback</option>
                        <option>Refund</option>
                      </Input>
                      {validation.touched.paymentStatus && validation.errors.paymentStatus ? (
                        <FormFeedback type="invalid">{validation.errors.paymentStatus}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Badge Class</Label>
                      <Input
                        name="badgeclass"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.badgeclass || ""}
                      >
                        <option>success</option>
                        <option>danger</option>
                        <option>warning</option>
                      </Input>
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Payment Method</Label>
                      <Input
                        name="paymentMethod"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentMethod || ""
                        }
                      >
                        <option>Mastercard</option>
                        <option>Visa</option>
                        <option>Paypal</option>
                        <option>COD</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody> */}
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}
EcommerceProductList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,

};


export default EcommerceProductList;