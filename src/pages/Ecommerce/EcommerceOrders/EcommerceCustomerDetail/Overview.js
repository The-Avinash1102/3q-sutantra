// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import PropTypes from "prop-types";
// import {
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Form,
//   Button,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
// } from "reactstrap";

// import Dropzone from "react-dropzone";
// import { Link } from "react-router-dom";

// import { activityLog } from "../Data";
// import TaskRemainder from "./TaskRemainder";

// const Overview = ({ id, customActiveTab }) => {
//   const dispatch = useDispatch();

//   const [confirmation, setConfirmation] = useState(false);
//   //modal
//   const [modal, setModal] = useState(false);

//   const toggleM = () => setModal(!modal);

//   // Dropzone
//   const [selectedFiles, setselectedFiles] = useState([]);

//   function handleAcceptedFiles(files) {
//     setModal(true);
//     if (confirmation) {
//       files.map(file =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//           formattedSize: formatBytes(file.size),
//         })
//       );
//       // console.log("working");
//       setselectedFiles(files);
//       setConfirmation(false);
//     }
//   }

//   useEffect(() => {
//     const jsonf = JSON.stringify(selectedFiles);
//     // console.log(jsonf);
//   }, [selectedFiles]);

//   /**
//    * Formats the size
//    */
//   function formatBytes(bytes, decimals = 2) {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const dm = decimals < 0 ? 0 : decimals;
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
//   }

//   return (
//     <>
//       <Row>
//         <Col sm="7">
//           <TaskRemainder id={id} customActiveTab={customActiveTab} />

//           <>
//             <Card>
//               <CardBody>
//                 <span className="font-weight-semibold font-size-16 h_color">
//                   Activity Log
//                 </span>
//                 <div>
//                   <ul>
//                     {activityLog.map((ele, idx) => (
//                       <li key={idx}>
//                         <div
//                           style={{
//                             width: "100%",
//                             display: "flex",
//                             marginTop: "1rem",
//                             fontSize: "14px",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <p style={{ width: "60%" }}>{ele.text}</p>
//                           <p>{ele.time}</p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </CardBody>
//             </Card>
//           </>
//         </Col>
//         <Col>
//           <Card>
//             <CardBody>
//               <div className="d-flex align-item justify-space-between">
//                 <span className="font-weight-semibold font-size-16 h_color">
//                   Attachments
//                 </span>
//                 {/* <form>
//                   <label
//                     htmlFor="attach"
//                     className="font-weight-semibold btn-md btn-link"
//                     style={{ textDecoration: "none" }}
//                   >
//                     Attach File
//                   </label>
//                   <input
//                     type="file"
//                     id="attach"
//                     name="attach"
//                     multiple
//                     accept="application/pdf"
//                     style={{ display: "none" }}
//                     // onChange={e => {}}
//                   />
//                 </form> */}
//               </div>
//               <Form>
//                 <Dropzone
//                   accept="application/pdf"
//                   onDrop={acceptedFiles => {
//                     handleAcceptedFiles(acceptedFiles);
//                   }}
//                 >
//                   {({ getRootProps, getInputProps }) => (
//                     <div className="dropzone">
//                       <div
//                         className="dz-message needsclick mt-2"
//                         {...getRootProps()}
//                       >
//                         <input {...getInputProps()} />
//                         <div className="mb-3">
//                           <i className="display-4 text-muted bx bxs-cloud-upload" />
//                         </div>
//                         <h4>Drop files here or click to upload.</h4>
//                       </div>
//                     </div>
//                   )}
//                 </Dropzone>
//                 <div className="dropzone-previews mt-3" id="file-previews">
//                   {selectedFiles.map((f, i) => {
//                     return (
//                       <Card
//                         className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
//                         key={i + "-file"}
//                       >
//                         <div className="p-2">
//                           <Row className="align-items-center">
//                             <Col className="col-auto">
//                               <img
//                                 data-dz-thumbnail=""
//                                 height="80"
//                                 className="avatar-sm rounded bg-light"
//                                 alt={f.name}
//                                 src={f.preview}
//                               />
//                             </Col>
//                             <Col>
//                               <Link
//                                 to="#"
//                                 className="text-muted font-weight-bold"
//                               >
//                                 {f.name}
//                               </Link>
//                               <p className="mb-0">
//                                 <strong>{f.formattedSize}</strong>
//                               </p>
//                             </Col>
//                           </Row>
//                         </div>
//                       </Card>
//                     );
//                   })}
//                 </div>
//               </Form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//       <Row>
//         <Modal isOpen={modal} toggle={toggleM}>
//           <ModalHeader toggle={toggleM}>Confirmation</ModalHeader>
//           <ModalBody>Do you want to save your changes?</ModalBody>
//           <ModalFooter>
//             <Button
//               color="primary"
//               onClick={e => {
//                 toggleM();
//                 setConfirmation(true);
//               }}
//             >
//               Yes
//             </Button>
//             <Button
//               color="secondary"
//               onClick={e => {
//                 toggleM();
//                 setConfirmation(false);
//               }}
//             >
//               No
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </Row>
//     </>
//   );
// };

// Overview.propTypes = {
//   id: PropTypes.string,
//   customActiveTab: PropTypes.string,
// };

// export default Overview;
