const venom = require('venom-bot');
const readline = require('readline');
const prompt = require('prompt-sync')({sigint: true});


var master_client = undefined;
var inProgress = false;

async function runVenom() {
    
    try {
        var client = await venom.create({
            session: 'wa-sender',
        });
        master_client = client;

        setInterval(() => {
            if (!inProgress) {
                show_menu();
            }
        }, 1000);
    } catch (error) {
        
    }
}



async function show_menu() {
    console.log(
`
1. Get Contact List
2. Send Message
3. Check Contact
`
    );

    client = master_client;

    var command = prompt('Enter Command: ');
    switch (command) {
        case '1':
            inProgress = true;
            await start_command('1', client);
            break;
        case '2':
            inProgress = true;
            await start_command('2', client);
            break;
        case '3':
            inProgress = true;
            check_contact(client, prompt('ID: '));
            break;
        default:
            console.log('Invalid Command');
            break;
    }
}

async function start_command(command, client) {
    switch (command) {
        case '1':
            var search = prompt('Search Name: ');
            await get_contact_list(client, search);
            break;
        case '2':
            var _ID = prompt('ID: ');
            var message = prompt('message: ');
            await send_message(client, _ID, message);
            break;
        default:
            console.log('Invalid Command');
            break;
    }
}

async function get_contact_list(client, search='') {
    let contacts = await client.getAllContacts();

    if(search != '') {
        contacts = contacts.filter(x => (x.name ?? '').indexOf(search) > -1)
    }

    contacts.forEach((contact, index) => {
        console.log(`${index+1} - ${contact.name}            ${contact.id._serialized}`);
    });

    inProgress = false;

}

async function send_message(client, _ID, message) {
    // let contact = await client.sendText(_ID);

    try {
        await client.sendText(_ID, message);
        console.log('Message Sent');
    } catch(error) {
        console.log(error.message);
    }

    inProgress = false;
}

async function check_contact(client, _ID) {
    try {
        let contacts = await client.getContact(_ID);
        console.log(contacts);
    } catch {
        console.log("TIDAK ADA DATA")
    }
}



runVenom();