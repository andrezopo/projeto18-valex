import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/router";

dotenv.config();

const app = express();

app.use([cors(), express.json()]);

app.use(router);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
  console.log(`Server funfing normally in port ${PORT}`);
});
