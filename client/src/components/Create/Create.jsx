import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NewTaskRequest } from "../../APIRequest/APIRequest";
import { IsEmpty, ErrorToast } from "../../helper/FormHelper";
const Create = () => {
  let titleRef,
    descriptionRef = useRef();
  let navigate = useNavigate();
  const handleSubmit = () => {
    let title = titleRef.value;
    let description = descriptionRef.value;
    if (IsEmpty(title)) {
      ErrorToast("Title is required");
    } else if (IsEmpty(description)) {
      ErrorToast("Description is required");
    } else {
      NewTaskRequest(title, description).then((res) => {
        if (res === true) {
          navigate("/All");
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-sm-12 col-md-8 p-2">
            <div className="card">
              <div className="card-body">
                <h4>Create New Task</h4>
                <br />
                <input
                  type="text"
                  ref={(input) => (titleRef = input)}
                  className="form-control animated fadeInUp"
                  placeholder="Task Name"
                />
                <br />
                <textarea
                  rows="5"
                  ref={(input) => (descriptionRef = input)}
                  className="form-control animated fadeInUp"
                  placeholder="Task Description"
                />
                <br />
                <button
                  onClick={handleSubmit}
                  className="btn float-end btn-primary animated fadeInUp"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
