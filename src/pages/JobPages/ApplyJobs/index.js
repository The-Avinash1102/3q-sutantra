import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "../../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"

import { JobTitle, CompanyName, Type, ApplyDate, Status } from "./ApplyJobsCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getApplyJob as OnGetApplyJob,
  deleteApplyJob as OnDeleteApplyJob,
} from "store/jobs/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const ApplyJobs = () => {
  //meta title
  document.title = "Job Apply | Scrollit"

  const dispatch = useDispatch()

  const { jobApply } = useSelector(state => ({
    jobApply: state.JobReducer.jobApply,
  }))

  const [apply, setApply] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    dispatch(OnGetApplyJob())
  }, [dispatch])

  useEffect(() => {
    setApply(jobApply)
  }, [jobApply])

  // delete
  const onClickData = apply => {
    setApply(apply)
    setDeleteModal(true)
  }

  const handleDeleteApplyJob = () => {
    if (apply && apply.id) {
      dispatch(OnDeleteApplyJob(apply.id))
      setDeleteModal(false)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
        filterable: true,
      },
      {
        Header: "Job Title",
        accessor: "jobTitle",
        filterable: true,
        Cell: cellProps => {
          return <JobTitle {...cellProps} />
        },
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        filterable: true,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: cellProps => {
          return <Type {...cellProps} />
        },
      },
      {
        Header: "Apply Date",
        accessor: "applyDate",
        filterable: true,
        Cell: cellProps => {
          return <ApplyDate {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "status",
        disableFilters: true,
        Cell: cellProps => {
          return <Status {...cellProps} />
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="list-unstyled hstack gap-1 mb-0">
              <li>
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip" />
                  <UncontrolledTooltip placement="top" target="viewtooltip">
                    View
                  </UncontrolledTooltip>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const userData = cellProps.row.original
                    onClickData(userData)
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteApplyJob()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Jobs" breadcrumbItem="Job Apply" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      Applied Jobs
                    </h5>
                    <div className="flex-shrink-0">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="Today" defaultValue>
                          Today
                        </option>
                        <option value="1 Monthly">1 Month</option>
                        <option value="6 Month">6 Month</option>
                        <option value="1 Years">1 Year</option>
                      </select>
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={jobApply || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ApplyJobs)
