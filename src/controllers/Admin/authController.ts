import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import adminModel from "../../models/adminModel";

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.find({email});
    if (admin) {
      const passwordCheck = await bcrypt.compare(password, admin[0].password);
      if (passwordCheck) {
        const token = generateToken({ id: admin[0]._id.toString() }, "30m");
        res.status(200).json({
          status: true,
          token: token,
          message: "Admin loggedIn successfully",
        });
      } else {
        res.status(201).json({ status: false, message: "incorrect password" });
      }
    } else {
      res.status(201).json({ status: false, message: "incorrect email" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
