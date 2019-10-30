import {
  Api_ToggleBlockParam,
  UnlockParam,
  Api_VerifyAccessCardAllowedResponse,
  ReportMovementBody,
  UnlockBody,
  AccessDeniedBody,
  Api_Response
} from "./interfaces";
import express from "express";
import axios from "axios";
import https from "https";

const app = express();
const port = 3005;
const unlockTime = 10;
const thisLock = "a2520d3a-ea3e-45ac-bbbf-6bded8f7712a";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const baseUrl = "https://localhost:44368/api";

let isBlocked = false;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Localhost lock");
});

app.get("/isBlocked", (req, res) => {
  res.send({ isBlocked });
});

app.post("/toggleBlock", (req, res) => {
  console.log(req.body);
  let body: Api_ToggleBlockParam = req.body;
  isBlocked = body.TargetState;
  res.send(`block is now ${isBlocked ? "on" : "off"}`);
});

app.post("/unlock", (req, res) => {
  res.send(`lock will be unlocked for the next ${unlockTime} seconds`);
});

app.post("/local/movement", (req, res) => {
  let body: ReportMovementBody = {
    lockSecretKey: thisLock,
    eventDate: Date.now().toString()
  };
  axios.post(`${baseUrl}/Audit/ReportMovement`, body);
});

app.get("/local/unlock", (req, res) => {
  let query: UnlockParam = req.query;
  axios
    .get<Api_Response<Api_VerifyAccessCardAllowedResponse>>(
      `${baseUrl}/Locks/VerifyAccessCardAllowed?lockSecretKey=${thisLock}&accessCardId=${query.accessCard}`,
      { httpsAgent }
    )
    .then(response => {
      if (response.data.result.hasAccess) {
        let body: UnlockBody = {
          lockSecretKey: thisLock,
          accessCardId: query.accessCard,
          eventDate: new Date().toISOString()
        };
        axios.post(`${baseUrl}/Audit/ReportUnlock`, body, { httpsAgent });
      } else {
        let body: AccessDeniedBody = {
          lockSecretKey: thisLock,
          accessCardId: query.accessCard,
          eventDate: new Date().toISOString()
        };
        axios.post(`${baseUrl}/Audit/ReportAccessDenied`, body, { httpsAgent });
      }

      res.send(response.data);
    });
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
