"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_js_1 = require("./app.js");
const port = process.env.PORT ?? 4000;
app_js_1.app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
