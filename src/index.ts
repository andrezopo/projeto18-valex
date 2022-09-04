import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/router";
import handleErrors from "./middlewares/handleErrors";

dotenv.config();

const app = express();

app.use([cors(), express.json()]);

app.use(router);

app.use(handleErrors);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
  console.log(`Server funfing normally in port ${PORT}`);
});
