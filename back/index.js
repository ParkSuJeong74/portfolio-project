const dotenv = require('dotenv').config()
const { app } = require("./src/app")
const https = require("https")
const fs = require("fs")
const prod = process.env.NODE_ENV === "production"
const PORT = process.env.SERVER_PORT || 5000

if (prod) {
    const options = {
        ca: fs.readFileSync('/etc/letsencrypt/live/elice-kdt-ai-4th-team21.elicecoding.com/fullchain.pem'),
        key: fs.readFileSync('/etc/letsencrypt/live/elice-kdt-ai-4th-team21.elicecoding.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/elice-kdt-ai-4th-team21.elicecoding.com/cert.pem'),
    };
    https.createServer(options, app).listen(443, () => {
        console.log('443번 포트에서 대기중입니다.');
    })
} else {
    app.listen(PORT, () => {
        console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`)
    })
}

//app.listen(PORT, () => {
//  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`)
//})
