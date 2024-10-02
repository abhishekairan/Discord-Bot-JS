const WebSocket = require('ws')
const { panel } = require('../config.json');

// Function to clear string br remove the console sttributes
function cleanString(input) {
    // Regular expression to match ANSI escape codes
    const ansiRegex = /\x1B\[[0-9;]*[A-Za-z]/g;
    let newinput = input.replace(ansiRegex, '').replace(/\r|\x1B\[K/g, '').trim();
    while (newinput.includes('>....')){
        newinput = newinput.replace('>....', '').trim();
    }
    // Remove ANSI escape codes and trim the result
    return newinput
}


// Function to remove the timestamp from the message
function removeTimestamps(message) {
    // Regular expression to match the timestamp and the "[INFO]: " part
    const timestampRegex = /\[\d{2}:\d{2}:\d{2} INFO\]:\s*/g;
    
    // Replace the timestamps with an empty string
    return message.replace(timestampRegex, '').trim();
}

const websocketInstances = {};

const websocket = async (serverid) => {
  // Check if a WebSocket instance already exists for the given server ID
  if (websocketInstances[serverid]) {
    return websocketInstances[serverid];
  }

  // Making fetch request to the panel to get websocket url and token 
  const req = await fetch(`${panel.ClientURL}/servers/${serverid}/websocket`, {
    method: "GET",
    headers: { Authorization: `Bearer ${panel.CLIENTKEY}`, Accept: "application/json" }
  });
  const res = await req.json(); // Converting the response got from the fetch response into json format to further access the data
  const { token, socket } = res.data; // Extracting token and socket url from the response

  // Making connection to the websocket
  const ws = new WebSocket(`${socket}`) // websocket variable 

  // Create a promise that resolves when the authentication is successful
  const authPromise = new Promise((resolve, reject) => {
    // WebSocket events
    // when connection is established  
    ws.on('open', () => { 
      console.log(`connection established to ${serverid}`)
      ws.send(JSON.stringify({ "event": "auth", "args": [token] })) // Authenticating websocket from token we got back from fetch request
    })
    // on closing websocket
    ws.on('close', () => {
      console.log('connection closed')
      // Remove the WebSocket instance from the cache when it's closed
      delete websocketInstances[serverid];
    })
    // when a new event is fired
    ws.on('message', (msg) => {
      message = JSON.parse(msg) // Converting the event from buffer to json formate
      // console.log(message);
      if (message.event === "auth success") {
        console.log('auth success');
        resolve(ws); // Resolve the promise with the WebSocket connection
      }
      if (message.event === "console output") { // Checking if the event is a console output?
        const mssg = removeTimestamps(message.args[0])
        ws.emit('consoleMessage', { data: mssg })
      } 
    })
    ws.on('error', (e) => {
      reject(e); // Reject the promise with the error
    })
  });

  // Store the WebSocket instance in the cache
  websocketInstances[serverid] = authPromise;

  // Return the promise that resolves with the WebSocket connection
  return authPromise;
}


// Function to get websocket connection from serverid
async function getWebSocket(serverid){
    const ws =await websocket(serverid)
    return ws
}

module.exports = {
    getWebSocket: getWebSocket, removeTimestamps: removeTimestamps,cleanString:cleanString}