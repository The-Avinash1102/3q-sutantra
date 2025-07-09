import React, { useState, useEffect } from "react";
import { Card, CardBody, Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import DeleteModal from "pages/Calendar/DeleteModal";
import { deleteNote, updateNotes } from "store/actions";

const NoteContent = ({ data, myMap, updateMap, setMyMap, clickValue }) => {
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState(data?.note);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newText, setNewText] = useState(noteText);

  //showing Date
  const date = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "short" });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const inputText = document.getElementById(`textarea${data?._id}`);
  const editButton = document.getElementById(`editButton${data?._id}`);
  //putting cursor at the end of text
  editButton?.addEventListener("click", function (e) {
    e.stopPropagation();
    setMyMap(new Map(myMap.set(data?._id, true)));
    // Focus on the text element
    inputText.focus();

    // Move the cursor to the end
    const length = inputText.value.length;
    inputText.setSelectionRange(length, length);
  });

  //for textarea
  useEffect(() => {
    const textarea = document.querySelector(`#textarea${data?._id}`);
    textarea.addEventListener("input", autoResize, false);
    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
  }, []);

  //deleting note
  const handleDeleteNote = () => {
    dispatch(deleteNote(data?.customer, data?._id));
    setDeleteModal(false);
  };

  //updating note by clicking on save
  function updateNote() {
    if (newText.trim() !== noteText.trim() && newText.trim()) {
      dispatch(updateNotes(data?.customer, data?._id, newText.trim()));
    }
    setMyMap(new Map(myMap.set(data?._id, false)));
  }

  let filterTimeout;

  const doInputText = query => {
    clearTimeout(filterTimeout);
    if (!query) return setNewText("");

    filterTimeout = setTimeout(() => {
      setNewText(query);
    }, 100);
  };

  //updating notes if clicked outside the box
  useEffect(() => {
    if (newText.trim() !== data?.note.trim() && newText.trim()) {
      dispatch(updateNotes(data?.customer, data?._id, newText.trim()));
    }
  }, [clickValue]);

  console.log(clickValue);

  return (
    <>
      <Card>
        <CardBody>
          <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteNote}
            onCloseClick={() => setDeleteModal(false)}
          />
          <div className="d-flex align-item ">
            <Input
              name="text"
              type="textarea"
              id={`textarea${data?._id}`}
              value={newText}
              onChange={e => {
                doInputText(e.target.value);
              }}
              onClick={() => updateMap(data?._id)}
              className="new-note"
            />

            {myMap.get(data?._id) ? (
              <></>
            ) : (
              <div className="icon-demo-content note-e-d d-flex">
                <i
                  id={`editButton${data?._id}`}
                  className="bx bx-pencil rounded-circle "
                  style={{ marginRight: "8px" }}
                ></i>
                <i
                  className="bx bx-trash-alt rounded-circle "
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                ></i>
              </div>
            )}
          </div>
          {myMap.get(data?._id) ? (
            <div className="mt-4">
              <Button
                color="link"
                onClick={updateNote}
                className="btn btn-link note-btn "
              >
                Save
              </Button>
              <Button
                color="link"
                onClick={e => {
                  setMyMap(new Map(myMap.set(data?._id, false)));
                  setNewText(data?.note);
                }}
                className="btn btn-link note-btn "
              >
                Cancel
              </Button>
            </div>
          ) : (
            <p>{data?.date || date()}</p>
          )}
        </CardBody>
      </Card>
    </>
  );
};

NoteContent.propTypes = {
  data: PropTypes.object,
  myMap: PropTypes.object,
  updateMap: PropTypes.func,
  setMyMap: PropTypes.func,
  clickValue: PropTypes.string,
};

export default NoteContent;
