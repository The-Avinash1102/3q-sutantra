import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const BrandId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const BrandName = (cell) => {
    return cell.value ? cell.value : '';
};

const CountryOfOrigin = (cell) => {
    return cell.value ? cell.value : '';
};

const TotalCars = (cell) => {
    return cell.value ? cell.value : '';
};

const Status = (cell) => {
    return cell.value ? <Badge className="bg-success font-size-10">Active</Badge> : <Badge className="bg-warning font-size-10">InActive</Badge>;
};

export {
    BrandId,
    BrandName,
    CountryOfOrigin,
    TotalCars,
    Status
};