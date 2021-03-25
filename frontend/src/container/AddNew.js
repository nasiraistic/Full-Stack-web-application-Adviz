import React from "react";
/**
 * Add new contact
 */
class AddNew extends React.Component {
  render() {
    return (
      <div className="addNew" id="add">
        <form
          id="addForm"
          className="modal-content animate"
          onSubmit="return false"
        ></form>
      </div>
    );
  }
}

export default AddNew;
