/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TaskListByPriority,
  TaskListByStatus,
  UpdateImageRequest,
} from "../../APIRequest/APIRequest";
import { DeleteTodo } from "../../helper/DeleteAlert";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { UpdateTodo } from "../../helper/UpdateAlert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Countdown from "react-countdown";

const Completed = () => {
  const [image, setImage] = React.useState(null);
  const [show, setShow] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [date, setDate] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    TaskListByStatus("Completed");
  }, []);

  const DeleteItem = (id) => {
    DeleteTodo(id).then((result) => {
      if (result === true) {
        TaskListByStatus("Completed");
      }
    });
  };

  const StatusChangeItem = (id, status) => {
    UpdateTodo(id, status).then((result) => {
      if (result === true) {
        TaskListByStatus("Completed");
      }
    });
  };

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

  const modelShow = (id) => {
    setShow(true);
    setUpdateId(id);
  };

  const save = async (e) => {
    e.preventDefault();
    console.log(image);
    console.log(updateId);
    // console.log(id);
    let images = image;
    if (IsEmpty(images)) {
      ErrorToast("Image is required");
    } else {
      UpdateImageRequest(updateId, images).then((res) => {
        if (res === true) {
          // navigate("/All");
          navigate(0);
          setShow(false);
        }
      });
    }
  };

  const CompletedList = useSelector((state) => state.task.Completed);
  useEffect(() => {
    let d = new Date();
    // console.log(d);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let dates = day + "-" + month + "-" + year;
    setDate(dates);
  }, []);
  const filter = (value) => {
    console.log(value);
    TaskListByPriority(value).then((res) => {
      console.log("true");
      navigate("/Priority");
    });
  };
  return (
    <Fragment>
      <div className="container-fluid content-body">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 col-lg-8 px-3">
            <h5>Task Completed</h5>
          </div>
          {/* <div className="col-12 float-end col-md-6 col-lg-4 px-2">
            <div className="row">
              <div className="col-8">
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder=""
                />
              </div>
              <div className="col-4">
                <button className="btn btn-primary w-100">Search</button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row p-0 m-0">
          {CompletedList.map((item, i) => (
            <div
              key={i.toString()}
              className="col-12 col-lg-4 col-sm-6 col-md-4 p-2"
            >
              <div className="card h-100">
                <img src={`${item.images}`} class="card-img-top" alt="" />

                <div className="card-body">
                  <div className="d-flex justify-content-between align-content-center">
                    <h6 className="animated fadeInUp">{item.title}</h6>

                    {item.priority === "Urgent" ? (
                      <p
                        onClick={() => {
                          filter("Urgent");
                        }}
                        style={{ cursor: "pointer" }}
                        className="badge bg-danger"
                      >
                        {item.priority}
                      </p>
                    ) : item.priority === "Avoid" ? (
                      <p
                        onClick={() => {
                          filter("Avoid");
                        }}
                        style={{ cursor: "pointer" }}
                        className="badge bg-success"
                      >
                        {item.priority}
                      </p>
                    ) : item.priority === "Later" ? (
                      <p
                        onClick={() => {
                          filter("Later");
                        }}
                        style={{ cursor: "pointer" }}
                        className="badge bg-info"
                      >
                        {item.priority}
                      </p>
                    ) : item.priority === "Banned" ? (
                      <p
                        onClick={() => {
                          filter("Banned");
                        }}
                        style={{ cursor: "pointer" }}
                        className="badge bg-dark"
                      >
                        {item.priority}
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          filter("not_found");
                        }}
                        style={{ cursor: "pointer" }}
                        className="badge bg-primary"
                      >
                        Data Not Found
                      </p>
                    )}
                  </div>
                  <p className="animated fadeInUp">{item.description}</p>
                  <p className="animated fadeInUp m-0 p-0">
                    <AiOutlineCalendar /> {item.createdDate}
                    <a
                      onClick={() => StatusChangeItem(item._id, item.status)}
                      className="icon-nav text-primary mx-1"
                    >
                      <AiOutlineEdit />
                    </a>
                    <a
                      onClick={() => DeleteItem(item._id)}
                      className="icon-nav text-primary mx-1"
                    >
                      <AiOutlineDelete />
                    </a>
                    <a className="badge float-end bg-success mt-3">
                      {item.status}
                    </a>
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={() => modelShow(item._id)}
                    >
                      Update Image
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Image</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input
                          type="file"
                          onChange={(e) => uploadImage(e)}
                          className="form-control animated fadeInUp mt-5"
                          placeholder="Upload Your Image"
                        />
                        <br />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        {image === null || image === "" ? (
                          <Button
                            disabled
                            variant="primary"
                            onClick={(e) => {
                              save(e);
                            }}
                          >
                            Disabled
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              save(e);
                            }}
                          >
                            Save Changes
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>
                  </p>
                  <p className="animated fadeInUp m-0 p-2 badge bg-danger">
                    Task Due Date : {item.duration}
                  </p>
                  <br />
                  {
                    /* compare with date & item.duration */
                    new Date(item.duration) > new Date(date) ? (
                      <p className="animated fadeInUp m-0 p-3 badge bg-success mt-3">
                        {/* Task Due Date : {item.duration} */}
                        Times Remaining :{" "}
                        <Countdown
                          date={
                            Date.now() +
                            Math.floor(new Date(item.duration).getTime() / 1000)
                          }
                        />
                      </p>
                    ) : (
                      <p className="animated fadeInUp m-0 p-2 badge bg-danger mt-3">
                        You are already late
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Completed;
