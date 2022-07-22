/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { TaskListByStatus } from "../../APIRequest/APIRequest";
import { DeleteTodo } from "../../helper/DeleteAlert";
import { UpdateTodo } from "../../helper/UpdateAlert";
const Progress = () => {
  useEffect(() => {
    TaskListByStatus("Progress");
  }, []);

  const DeleteItem = (id) => {
    DeleteTodo(id).then((result) => {
      if (result === true) {
        TaskListByStatus("Progress");
      }
    });
  };

  const StatusChangeItem = (id, status) => {
    UpdateTodo(id, status).then((result) => {
      if (result === true) {
        TaskListByStatus("Progress");
      }
    });
  };
  const ProgressList = useSelector((state) => state.task.Progress);
  return (
    <Fragment>
      <div className="container-fluid content-body">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 col-lg-8 px-3">
            <h5>Task In Progress</h5>
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
          {ProgressList.map((item, i) => (
            <div
              key={i.toString()}
              className="col-12 col-lg-4 col-sm-6 col-md-4 p-2"
            >
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="animated fadeInUp">{item.title}</h6>
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
                    <a className="badge float-end bg-primary">{item.status}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Progress;
