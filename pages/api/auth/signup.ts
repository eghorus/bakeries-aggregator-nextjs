import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      status: "Fail",
      message: "Name, email, and password fields are required.",
    });
    return;
  }

  try {
    const dbClient = await connectToDB();
    const db = dbClient.db();

    const isDuplicateEmail = await db.collection("users").findOne({ email });
    if (isDuplicateEmail) {
      res
        .status(200)
        .json({ status: "Fail", message: "This email address is already in use. Please use a different one" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const createdUser = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "Success",
      message: "Created a new user successfully. Please use your email and password to login.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Something went wrong.",
    });
  }
}
