const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { employeeRouter } = require("./routes/employeeRoutes");
const app = express();
app.use(express.json());


app.use("/", userRouter);
app.use("/dashboard", employeeRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`server is running at port ${process.env.PORT}`);
    } catch (err) {
        console.log(err);
    }
})