import React, { Fragment, useState } from "react";

export default function EditTodo({ todo_id, description }) {
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  const updateDescription = async () => {
    try {
      const body = { descriptionEdit };
      const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/"
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo_id}`}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setDescriptionEdit(description)}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => updateDescription()}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setDescriptionEdit(description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
