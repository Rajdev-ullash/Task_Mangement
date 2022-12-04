import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NewTaskRequest } from "../../APIRequest/APIRequest";
import { IsEmpty, ErrorToast } from "../../helper/FormHelper";
const Create = () => {
  const [image, setImage] = React.useState(null);
  let titleRef,
    descriptionRef,
    priorityRef,
    durationRef = useRef();
  let navigate = useNavigate();

  const uploadImage = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    data.append("key", "011f10ea5dfc25b71bac2efa547a3926");
    data.append("image", files[0]);
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    setImage(file.data.display_url);
    console.log(file.data.display_url);
  };
  const handleSubmit = () => {
    let title = titleRef.value;
    let description = descriptionRef.value;
    let priority = priorityRef.value;
    let duration = durationRef.value;
    let images = image;
    console.log(images);
    console.log(title);
    console.log(description);
    console.log(priority);
    console.log(duration);
    if (IsEmpty(title)) {
      ErrorToast("Title is required");
    } else if (IsEmpty(description)) {
      ErrorToast("Description is required");
    } else if (IsEmpty(priority)) {
      ErrorToast("Priority is required");
    } else if (IsEmpty(images)) {
      ErrorToast("Image is required");
    } else if (IsEmpty(duration)) {
      ErrorToast("Duration is required");
    } else {
      NewTaskRequest(title, description, priority, duration, images).then(
        (res) => {
          if (res === true) {
            navigate("/All");
          }
        }
      );
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
                <select
                  class="form-select"
                  aria-label="Default select example"
                  ref={(input) => (priorityRef = input)}
                >
                  <option selected>Select Priority</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Avoid">Avoid</option>
                  <option value="Later">Later</option>
                  <option value="Banned">Banned</option>
                </select>
                <br />
                <input
                  type="date"
                  ref={(input) => (durationRef = input)}
                  className="form-control animated fadeInUp"
                  placeholder="Select Task Duration"
                />
                <br />
                <input
                  type="file"
                  onChange={(e) => uploadImage(e)}
                  className="form-control animated fadeInUp"
                  placeholder="Upload Your Image"
                />
                <br />
                {/* if image value null or empty Create button disabled otherwise enable */}

                {image === null || image === "" ? (
                  <button
                    onClick={handleSubmit}
                    className="btn float-end btn-primary animated fadeInUp disabled"
                  >
                    Disabled
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="btn float-end btn-primary animated fadeInUp"
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
