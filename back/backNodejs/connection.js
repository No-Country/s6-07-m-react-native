const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const db = mongoose.connection;

mongoose.set("strictQuery", false);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.once("open", (_) => {
  console.log("Data base is connected to ", uri);
});
db.on("error", (err) => {
  console.log(err);
});
