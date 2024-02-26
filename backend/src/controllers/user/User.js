import User from "../../model/user/user.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtToken } from "../../util/generateToken.js";



const createUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //import the db model and create the user
  //User.findOne({_id:req.params.id})
  //User.findById(req.params.id)

  const usernameExist = await User.findOne({
    username: data.username,
  });
  if (usernameExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with username already exist",
    });
    return;
  }

  //hass password
  const saltRound = 10;
  const hash = await bcrypt.hash(data.password, saltRound);

  const createdUser = await User.create({
    username: data.username,
    password: hash, //hash the password using bcrycpt
    gender: data.gender,
    avatar:
      data.gender === "Male"
        ? "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1666096504.1702379919&semt=sph"
        : data.gender === "Female"
        ? "https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
        : "defaultAvatar.jpg",
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdUser,
  });
};

const loginUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //check if user is registered
  const userExist = await User.findOne({
    username: data.username,
  });

  if (!userExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "No record found",
    });
    return;
  }
  const isConfirmed = await ComparePassword(data.password, userExist.password);

  //check that password is correct
  if (!isConfirmed) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Credential not correct",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: userExist,
    token: jwtToken(userExist._id, userExist.username),
  });
};

async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

const getUsers = async (req, res) => {
  const getUser = await User.find({});

  res.status(httpStatus.OK).json({
    status: "success",
    data: getUser,
  });
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const username = req.query.username;
  const avatar = req.query.avatar;

  console.log(type, username, "type");

  let user;
  switch (type) {
    case "ID":
      user = await User.findById(id);
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User with id not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: user,
      });
      break;

    case "USERNAME":
      user = await User.findOne({ username: username });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User with username not found",
        });
        break;
      }

    case "AVATAR":
      user = await User.findOne({ avatar: avatar });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User with avatar not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: user,
      });
      break;

    default:
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
  }
};



const updateUser = async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  const usernameExist = await User.findOne({ username: username});
  if (usernameExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User with username already exist. Please, provide a unique username",
    });
    return;
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username: username, password: password },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(id);

  res.status(httpStatus.OK).json({
    status: "success",
    data: `User with ID ${id} is deleted`,
  });
};

export {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
