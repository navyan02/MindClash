const {
  roomSetup,
  gameStart,
  sendGameState,
  joinRoom,
  captureRegion,
} = require("./utils/gameManipulation")
const { createRoomName } = require("./utils/roomNameGen")

module.exports = function (socket, io, firebase) {
  socket.on("create-room", async ({category, map ,name}) => {
    console.log(`[CREATE] Room for ${name} in ${category}/${map}`);
    const newRoom = createRoomName()
    await roomSetup(newRoom, name, category, map, socket, firebase)
    socket.join(newRoom)
    socket.emit("join-room", {
      room: newRoom,
    })
    console.log(`[SERVER] Emitted join-room to creator for room "${newRoom}"`);

    sendGameState(newRoom, firebase, io)
  })
    socket.on("join-room", async ({ room, name }) => {
      console.log(`[JOIN] ${name} joining room "${room}" with socket ID: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`[DISCONNECT] Socket ${socket.id} disconnected`);
    });
    
  
    const db = firebase.firestore();
    const docRef = db.collection("rooms").doc(room);
    const doc = await docRef.get();
  
    if (!doc.exists) {
      console.warn(`Room "${room}" not found in Firestore.`);
      return;
    }
  
    const players = doc.data().players || [];
    const alreadyJoined = players.find(p => p.socket === socket.id);
  
    if (!alreadyJoined) {
      console.log(`Adding ${name} to room "${room}"`);
    } else {
      console.log(`${name} already in room "${room}"`);
    }
  
    await joinRoom(room, name, socket, firebase, io);
  });
  
  socket.on("game-start", ({ room}) => {
    gameStart(room, firebase, io)
  })
  socket.on("question-victory", ({ room, id, timeStart, timeStop, position }) => {
    console.log(`🏁 [QUESTION VICTORY] Socket: ${socket.id}, Room: ${room}, QID: ${id}, Pos: ${position}`);
    captureRegion(room, id, position, socket.id, firebase, io);
  })
  socket.on("penalty", ({ room, position }) => {
    io.to(room).emit("region-locked", position);
  });
  
}