import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
        str === "" || str === undefined ? "" : str.toLowerCase()
    );
};

const OrderId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const ProductName = (cell) => {
    return cell.value ? cell.value : '';
};

const InvoiceId = (cell) => {
    return cell.value ? cell.value : '';
};

const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

const Price = (cell) => {
    return handleValidDate(cell.value);
    
};

const Category = (cell) => {
    return cell.value ? cell.value : '';
};

const ProductDisplay = (cell) => {
    return cell.value ? cell.value : '';
};

const PaymentStatus = (cell) => {
    return (
        <Badge
            className={"font-size-12 badge-soft-" +
                (cell.value === "Paid" ? "success" : "danger" && cell.value === "Refund" ? "warning" : "danger")}
        >
            {cell.value}
        </Badge>
    );
};
const PaymentMethod = (cell) => {
    return (
        <span>
            <i
                className={
                    (cell.value === "Paypal" ? "fab fa-cc-paypal me-1" : "" ||
                        cell.value === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
                            cell.value === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
                                cell.value === "Visa" ? "fab fa-cc-visa me-1" : ""
                    )}
            />{" "}
            {cell.value}
        </span>
    );
};
export {
    OrderId,
    ProductName,
    InvoiceId,
    Price,
    Category,
    ProductDisplay,
    PaymentStatus,
    PaymentMethod
};