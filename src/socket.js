// src/socket.js
import { io } from "socket.io-client";

const socket = io(process.env.GATSBY_API_URL); // connects to http://localhost:3000

export default socket;
