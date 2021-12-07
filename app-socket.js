var server = require("http").createServer(),
  io = require("socket.io")(server),
  logger = require("winston"),
  port = process.env.PORT || 3000;

var whatsapp = require("./whatsapp-init");

whatsapp.runVenom((client, err) => {
  io.on("connection", function (socket) {

    socket.on("send_message", async function (data) {
      
      var number = data.number;
      var message = data.message;

      console.log('Send Message\nto: '+data.number);

      client
        .sendText(number, message)
        .then(() => {
          io.emit("response", {
            status: true,
            message: "Message send successful.",
          });
          console.log("Message successfully sent.");
        })
        .catch((err) => {
          console.log("Message send failed.");
          io.emit("response", {
            status: false,
            message: err.message,
          });
        });
    });

    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
  });

  server.listen(port);
  
  console.log("Server listening on http://localhost:" + port);
});
