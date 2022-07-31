var express = require('express');
var app = express();

var whatsapp = require("./whatsapp-init");

whatsapp.runVenom((client, err) => {

    app.get('/sendText', async function (req, res) {
        try {
            await client.sendText(req.query.id, req.query.message);

            res.json({
                status: 'success',
                message: 'Message sent successfully'
            })
        } catch (error) {
            res.json({
                status: 'error',
                message: error.message
            })
        }
    });

    app.post('sendFile', async function (req, res) {
        try {
            await client.sendFileFromBase64(
                '000000000000@c.us',
                base64PDF,
                'file_name.pdf',
                'See my file in pdf'
            )
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
        } catch (error) {
            res.json({
                status: 'error',
                message: error.message
            })
        }
    });

    app.get('/', async function (req, res) {
        res.send('Hi..');
    });

    app.listen(3000, function () {
        console.log('Example app listening on https://localhost:3000');
    });

});