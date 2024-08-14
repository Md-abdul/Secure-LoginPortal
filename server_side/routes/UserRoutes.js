const express = require("express");
const { Router } = require("express");
const UserModel = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const UserRoutes = Router();

UserRoutes.post("/signup", async (req, res) => {
  try {
    const { name, password, email, phoneno, profession } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phoneno,
      profession,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

UserRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "hack");
    res.json({ token, name: user.name });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

UserRoutes.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

UserRoutes.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneno, profession, email } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, phoneno, profession, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

UserRoutes.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = UserRoutes;
