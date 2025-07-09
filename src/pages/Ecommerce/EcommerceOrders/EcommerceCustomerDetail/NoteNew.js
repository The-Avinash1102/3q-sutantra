import React, { useEffect } from "react";
import { Card, CardBody, Input, Button } from "reactstrap";
import PropTypes from "prop-types";

const NoteNew = ({ setShowText, setNoteText }) => {
  //for textarea
  useEffect(() => {
    const textarea = document.querySelector("#textarea");
    textarea.addEventListener("input", autoResize, false);
    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
  }, []);

  let filterTimeout;

  const doInputText = query => {
    clearTimeout(filterTimeout);
    if (!query) return setNoteText("");

    filterTimeout = setTimeout(() => {
      setNoteText(query);
    }, 500);
  };

  return (
    <>
      <Card>
        <CardBody>
          <div>
            <Input
              name="text"
              type="textarea"
              autoFocus={true}
              id="textarea"
              className="new-note"
              onChange={e => {
                doInputText(e.target.value.trim());
              }}
            />
          </div>
          <div className="mt-4">
            <Button
              color="link"
              onClick={e => setShowText(false)}
              className="btn btn-link note-btn "
            >
              Save
            </Button>
            <Button
              color="link"
              onClick={() => {
                setNoteText("");
                setShowText(false);
              }}
              className="btn btn-link note-btn "
            >
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

NoteNew.propTypes = {
  id: PropTypes.string,
  setShowText: PropTypes.func,
  setNoteText: PropTypes.func,
};

export default NoteNew;
