require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Register = require("./Auth/Registration");
const Login = require("./Auth/Login");
const CookieParser = require('cookie-parser');
const createRoom = require("./RoomLogic/createRoom");
const joinRoom = require("./RoomLogic/JoinRoom");
const leaveRoom = require("./RoomLogic/leaveRoom");

app.use(CookieParser());
//Auth Middleware
app.use('/api',Register);

app.use('/api', Login);

//Create Room middleware
app.use('/api',createRoom);

app.use('/api', joinRoom);

app.use('/api', leaveRoom);