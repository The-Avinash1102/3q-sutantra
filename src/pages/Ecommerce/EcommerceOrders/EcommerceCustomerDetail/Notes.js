import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button } from "reactstrap";
import PropTypes from "prop-types";
import NoteContent from "./NoteContent";

import { getNotes, addNotes, deleteAllNotes } from "store/actions";
import { useSelector, useDispatch } from "react-redux";
import NoteNew from "./NoteNew";
// import DeleteAllModal from "components/Common/DeleteAllModal"; 

//Note close when click outside of it
let useClickOutside = handler => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = event => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Notes = ({ id, customActiveTab }) => {
  const dispatch = useDispatch();
  const [showText, setShowText] = useState(false);
  const [noteData, setNoteData] = useState([]);
  /*Notes */
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  /* for NewNote */
  const [noteText, setNoteText] = useState("");
  //focus
  const [clickValue, setClickValue] = useState();
  const [myMap, setMyMap] = useState(new Map());

  const { notes } = useSelector(state => ({
    notes: state.ecommerce.notes,
  }));

  useEffect(() => {
    if (customActiveTab === "3") {
      dispatch(getNotes(id));
    }
  }, [customActiveTab]);

  useEffect(() => {
    if (notes) {
      setNoteData(notes);
    }
  }, [notes]);

  /*deleting all notes */
  const handleDeleteAllNotes = () => {
    dispatch(deleteAllNotes(id));
    setDeleteAllModal(false);
  };

  let domNode = useClickOutside(() => {
    setShowText(false);
  });

  //adding new Note
  useEffect(() => {
    if (noteText) {
      dispatch(addNotes(id, noteText));
      setNoteText("");
    }
  }, [showText]);

  const addMap = (key, value) => {
    setMyMap(new Map(myMap.set(key, value)));
  };

  const updateMap = key => {
    [...myMap.keys()].map(e =>
      e === key
        ? setMyMap(new Map(myMap.set(e, true)))
        : setMyMap(new Map(myMap.set(e, false)))
    );
  };

  window.addEventListener("click", e => {
    setClickValue(e.target.value);
    if (e.target.value === undefined) {
      [...myMap.keys()].map(e => {
        if (myMap.get(e)) {
          setMyMap(new Map(myMap.set(e, false)));
        }
      });
    }
  });

  return (
    <>
      {/* <DeleteAllModal
        show={deleteAllModal}
        onDeleteClick={handleDeleteAllNotes}
        onCloseClick={() => setDeleteAllModal(false)}
      /> */}
      <Row>
        <div className="d-flex align-item justify-space-between mb-4">
          <span className="font-weight-semibold font-size-18">Notes</span>
          <div className="text-sm-end btn-grp ">
            <Button
              type="button"
              color="danger"
              className="btn-rounded  me-2"
              onClick={() => {
                setDeleteAllModal(true);
              }}
            >
              <i className="mdi mdi-delete me-1" />
              Delete All Notes
            </Button>
            <Button
              color="primary"
              onClick={() => setShowText(true)}
              outline
              className="btn-rounded"
            >
              + Add Notes
            </Button>
          </div>
        </div>
      </Row>
      <Row>
        <Col>
          <div ref={domNode}>
            {showText ? (
              <NoteNew
                id={id}
                setShowText={setShowText}
                setNoteText={setNoteText}
              />
            ) : (
              <></>
            )}
          </div>
          {/* for API  cards */}
          {noteData?.map(data => {
            if (!myMap.has(data?._id)) {
              addMap(data?._id, false);
            }
            return (
              <div key={data?._id}>
                <NoteContent
                  data={data}
                  myMap={myMap}
                  updateMap={updateMap}
                  setMyMap={setMyMap}
                  clickValue={clickValue}
                />
              </div>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

Notes.propTypes = {
  id: PropTypes.string,
  customActiveTab: PropTypes.string,
};

export default Notes;
