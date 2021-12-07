<?php
require './vendor/autoload.php';

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;


$client = new Client(new Version2X('http://localhost:3000', [
    'headers' => [
        'X-My-Header: websocket rocks',
        'Authorization: Bearer ',
        'User: peter',
    ]
]));

$client->initialize();

$client->emit('send_message', [
    'number' => '628571w53300@c.us', 
    'message' => 'Hello World'
]);

$checking = true;

while ($checking) {
    $r = $client->read();
    $r = json_decode(mb_substr($r, 2), true);
    if (!empty($r)) {
        var_dump($r[0]);
        $checking = false;
    }
}

$client->close();