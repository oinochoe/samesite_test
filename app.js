const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true); // all available
    },
    credentials: true,
};

app.use(cors(corsOptions));

// 정적 컨텐츠 html파일을 내려준다.
app.get('/', (req, res) => {
    fs.readFile('index.html', (error, data) => {
        if (error) {
            res.send('page Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// 쿠키생성
app.get('/make', (req, res) => {
    console.log('route : make cookie');

    res.append('Set-Cookie', `cookie1=default_value; SameSite=none;`);
    res.append('Set-Cookie', `cookie2=Lax; SameSite=Lax;`);
    res.append('Set-Cookie', `cookie3=Strict; SameSite=Strict;`);

    res.send({
        result: 'true',
        message: 'success',
    });
});

// 여러가지 메소드를 테스트하기 위해서 all 라우트, 쿠키 동작 확인
app.all('/confirm', (req, res) => {
    console.log('route : /confirm, ', req.method);
    console.log('cookie : ', req.headers.cookie);

    res.send({
        result: 'true',
        message: 'success',
    });
});

app.listen(10004);

console.log('Running API');
