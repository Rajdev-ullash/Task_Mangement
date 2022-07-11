const TasksModel = require("../models/TasksModel");

//create task

exports.createTask = (req, res) => {
  let reqBody = req.body;
  reqBody.email = req.headers["email"];
  TasksModel.create(reqBody, (err, result) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        err: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

//delete tasks
exports.deleteTask = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  TasksModel.remove(query, (err, result) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        err: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

//status update

exports.updateTaskStatus = (req, res) => {
  let id = req.params.id;
  let status = req.params.status;
  let query = { _id: id };
  let reqBody = { status: status };
  TasksModel.updateOne(query, reqBody, (err, result) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        err: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

//get all tasks list by status
exports.listTasksByStatus = (req, res) => {
  let status = req.params.status;
  let email = req.headers["email"];

  TasksModel.aggregate(
    [
      { $match: { status: status, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ],
    (err, result) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          err: err,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    }
  );
};

//task count by status

exports.taskStatusCount = (req, res) => {
  let email = req.headers["email"];
  TasksModel.aggregate(
    [
      { $match: { email: email } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ],
    (err, result) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          err: err,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    }
  );
};
