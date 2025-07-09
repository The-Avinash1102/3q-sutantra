import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";

import {
  Card,
  CardBody,
  Modal,
  Input,
  Form,
  Button,
  Label,
  CardText,
} from "reactstrap";

import { addTask, getTasks, deleteTask, updateTask } from "store/actions";
import DeleteModal from "components/Common/DeleteModal";

//switch
const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      No
    </div>
  );
};

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      Yes
    </div>
  );
};

const TaskRemainder = ({ id, customActiveTab }) => {
  const dispatch = useDispatch();

  const { task } = useSelector(state => ({
    task: state.ecommerce.task,
  }));

  // console.log("<= task =>", task);

  useEffect(() => {
    if (customActiveTab === "1") {
      dispatch(getTasks(id));
    }
  }, [customActiveTab]);

  //filter
  const [status, setStatus] = useState("0");
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  //delete
  const [deleteModal, setDeleteModal] = useState(false);
  //textarea
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  //for setting taskId
  const [taskId, setTaskId] = useState("");
  const [action, setAction] = useState("");
  const [taskStatus, setTaskStatus] = useState();
  //getting task value
  const [taskValue, setTaskValue] = useState("");

  //delete
  const handleDeleteInvoice = () => {
    setDeleteModal(false);
    dispatch(deleteTask(id, taskId));
  };

  //modal
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  //TextArea
  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  //done button
  //1.Add & Updating task
  function addingTask() {
    const value = document.getElementById("textarea").value;
    if (action === "Add Task" && value) {
      dispatch(addTask(id, value));
    }
    if (
      action === "Update Task" &&
      value &&
      value.toString() !== taskValue.toString()
    ) {
      dispatch(updateTask(id, taskId, value, taskStatus));
    }
    setmodal_backdrop(false);
  }

  // 2.Updating just status
  function updateStatus(taskId, task, status) {
    const newStatus = status === 1 ? 0 : 1;
    dispatch(updateTask(id, taskId, task, newStatus));
  }

  return (
    <>
      <Card>
        <CardBody>
          <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteInvoice}
            onCloseClick={() => setDeleteModal(false)}
          />
          <Modal
            isOpen={modal_backdrop}
            toggle={() => {
              tog_backdrop();
            }}
            backdrop={"static"}
            id="staticBackdrop"
          >
            <div className="modal-header">
              <Label>{action}</Label>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setmodal_backdrop(false);
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-3">
                <Input
                  type="textarea"
                  id="textarea"
                  defaultValue={action === "Update Task" ? taskValue : ""}
                  onChange={e => {
                    textareachange(e);
                  }}
                  maxLength="225"
                  rows="3"
                  placeholder="This textarea has a limit of 225 chars."
                />
                {textareabadge ? (
                  <span className="badgecount badge bg-success">
                    {" "}
                    {textcount} / 225{" "}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setmodal_backdrop(false);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => addingTask()}
              >
                Done
              </button>
            </div>
          </Modal>

          <div className="d-flex align-item justify-space-between b-margin">
            <div className="d-flex">
              <span className="font-weight-semibold font-size-17 h_color">
                Tasks & Remainders
              </span>
              <Form>
                <Input
                  type="select"
                  defaultValue={status}
                  className="btn-sm task-btn"
                  onChange={e => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="0">To-Do</option>
                  <option value="1">Completed</option>
                </Input>
              </Form>
            </div>
            <Button
              color="link"
              className="font-weight-semibold "
              style={{ textDecoration: "none" }}
              onClick={() => {
                tog_backdrop();
                setAction("Add Task");
              }}
              data-toggle="modal"
            >
              Add Task
            </Button>
          </div>
          <div style={{ maxHeight: "400px", overflow: "scroll" }}>
            {task?.map(ele => {
              if (ele?.status.toString() === status.toString()) {
                return (
                  <Card
                    outline
                    color="primary"
                    className="border"
                    key={ele._id}
                  >
                    <CardBody
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <CardText
                        style={{ width: "70%" }}
                        onClick={() => {
                          tog_backdrop();
                          setAction("Update Task");
                          setTaskValue(ele?.task);
                          setTaskId(ele._id);
                          setTaskStatus(ele?.status);
                        }}
                      >
                        {ele.task}
                      </CardText>
                      <div className="t-align">
                        <Switch
                          uncheckedIcon={<Offsymbol />}
                          checkedIcon={<OnSymbol />}
                          className="me-1 mb-sm-8 mb-2"
                          onColor="#02a499"
                          onChange={() => {
                            updateStatus(ele?._id, ele?.task, ele.status);
                          }}
                          checked={ele?.status === 1 ? true : false}
                        />
                        <i
                          className="bx bx-pencil font-size-20 "
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            tog_backdrop();
                            setAction("Update Task");
                            setTaskValue(ele?.task);
                            setTaskId(ele._id);
                            setTaskStatus(ele?.status);
                          }}
                        ></i>
                        <i
                          onClick={() => {
                            setDeleteModal(true);
                            setTaskId(ele._id);
                          }}
                          className="mdi mdi-delete font-size-20"
                          style={{ color: "#f46a6a", cursor: "pointer" }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

TaskRemainder.propTypes = {
  id: PropTypes.string,
  customActiveTab: PropTypes.string,
};

export default TaskRemainder;
