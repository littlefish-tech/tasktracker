const express = require("express");
const app = express();

// app.use(express.json({ extended: false }))

app.get("/", (req, res) =>
    res.json({ msg: "Hello world" }))

app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));