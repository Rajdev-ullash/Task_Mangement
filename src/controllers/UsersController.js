const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

//register user
exports.registration = (req, res) => {
  let reqBody = req.body;
  UsersModel.create(reqBody, (err, result) => {
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

// users login
exports.login = (req, res) => {
  let reqBody = req.body;
  UsersModel.aggregate(
    [
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          phone: 1,
          photo: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          err: err,
        });
      } else {
        if (data.length > 0) {
          let Payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: data[0]["email"],
          };
          let token = jwt.sign(Payload, "SecretKey12345678");
          res.status(200).json({
            status: "success",
            token: token,
            data: data[0],
          });
        } else {
          res.status(400).json({
            status: "fail",
            err: "Invalid email or password",
          });
        }
      }
    }
  );
};

// users profile details
exports.profileUpdate = (req, res) => {
  let email = req.headers["email"];
  console.log(email);
  let reqBody = req.body;
  console.log(reqBody);

  UsersModel.updateOne(
    { email: email },
    reqBody,
    { new: true },
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
