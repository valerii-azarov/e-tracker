import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { surname, name, email, password } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Електронна пошта вже використовується.",
      });
    }

    const newUser = new Users({
      surname,
      name,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "Обліковий запис успішно створено.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Електронної пошти не існує у системі.",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        status: "error",
        message: "Невірний пароль.",
      });
    }

    const refreshToken = jwt.sign({
        id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      }
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Успішний вхід.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(403).json({
        status: "error",
        message: "Будь ласка, увійдіть зараз.",
      });
    }

    res.clearCookie("refresh_token");

    return res.status(200).json({
      status: "success",
      message: "Успішний вихід.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(403).json({
        status: "error",
        message: "Будь ласка, увійдіть зараз.",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(403).json({
        status: "error",
        message: "Некоректний або закінчився токен.",
      });
    }

    const newAccessToken = jwt.sign({
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      }
    );

    if (!newAccessToken) {
      return res.status(500).json({
        status: "error",
        message: "Помилка при створенні токена.",
      });
    }

    return res.status(200).json({
      status: "success",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

export { 
  signUp, 
  signIn, 
  logout, 
  getAccessToken, 
};
