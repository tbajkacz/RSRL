"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const app = express_1.default();
const port = 3005;
const unlockTime = 10;
const thisLock = "a2520d3a-ea3e-45ac-bbbf-6bded8f7712a";
const httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
const baseUrl = "https://localhost:44368/api";
let isBlocked = false;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Localhost lock");
});
app.get("/isBlocked", (req, res) => {
    res.send({ isBlocked });
});
app.post("/toggleBlock", (req, res) => {
    console.log(req.body);
    let body = req.body;
    isBlocked = body.TargetState;
    res.send(`block is now ${isBlocked ? "on" : "off"}`);
});
app.post("/unlock", (req, res) => {
    res.send(`lock will be unlocked for the next ${unlockTime} seconds`);
});
app.post("/local/movement", (req, res) => {
    let body = {
        lockSecretKey: thisLock,
        eventDate: Date.now().toString()
    };
    axios_1.default.post(`${baseUrl}/Audit/ReportMovement`, body);
});
app.get("/local/unlock", (req, res) => {
    let query = req.query;
    axios_1.default
        .get(`${baseUrl}/Locks/VerifyAccessCardAllowed?lockSecretKey=${thisLock}&accessCardId=${query.accessCard}`, { httpsAgent })
        .then(response => {
        console.log(response.data.result.hasAccess);
        if (response.data.result.hasAccess) {
            let body = {
                lockSecretKey: thisLock,
                accessCardId: query.accessCard,
                eventDate: new Date().toISOString()
            };
            axios_1.default.post(`${baseUrl}/Audit/ReportUnlock`, body, { httpsAgent });
        }
        else {
            let body = {
                lockSecretKey: thisLock,
                accessCardId: query.accessCard,
                eventDate: new Date().toISOString()
            };
            axios_1.default.post(`${baseUrl}/Audit/ReportAccessDenied`, body, { httpsAgent });
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
//# sourceMappingURL=app.js.map