const venom = require('venom-bot');

async function runVenom(callback) {
    
    try {
        var client = await venom.create({
            session: 'wa-sender',
        });

        callback(client);
    } catch (error) {
        callback(undefined, error);
    }
}


module.exports = {
    runVenom: runVenom,
}