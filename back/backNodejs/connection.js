const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Mateo:Kd4EqrtDTHkmXkGG@giveaway.edmohfx.mongodb.net/?retryWrites=true&w=majority";
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
