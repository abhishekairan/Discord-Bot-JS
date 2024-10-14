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


// function to get token and socket from the panel
async function getSocketCredientials(serverid){
  
  // Making fetch request to the panel to get websocket url and token 
  const req = await fetch(`${panel.ClientURL}/servers/${serverid}/websocket`, {
    method: "GET",
    headers: { Authorization: `Bearer ${panel.CLIENTKEY}`, Accept: "application/json" }
  });
  const res = await req.json(); // Converting the response got from the fetch response into json format to further access the data
  const { token, socket } = res.data; // Extracting token and socket url from the response
  return {token,socket}
}




class Websocket extends WebSocket{
    
  constructor(creds){
    super(creds.socket) // setting up socket url

    // Authentication event
    this.on('open',()=>{
      console.log(`connection established to Websocket`)
      this.send(JSON.stringify({ "event": "auth", "args": [creds.token] })) // Authenticating websocket from token we got back from fetch request
    })

    
    // Registering consolemessage emiter 
    this.on('message', (msg) => {
      const message = JSON.parse(msg) // Converting the event from buffer to json formate
      // console.log(message);
      if (message.event === "auth success") {
        console.log('auth success');
      }
      if (message.event === "console output") { // Checking if the event is a console output?
        const mssg = removeTimestamps(message.args[0])
        this.emit('consoleMessage', { data: mssg })
      } 
    })
  }

  
  // Function to add listner for eco command
  setEcoListners(){

    console.log("Setting events for ws");
    this.on('consoleMessage',(e) => {
      const consoleMSG = e.data
      const cleanstr = cleanString(consoleMSG)
  
      // Checking if user exsist or not
      if(consoleMSG.includes("Player not found")){
        this.emit('player not found')
        this.close()
      }
  
      // Checking if the user balance is checked 
      else if(cleanstr.includes(`Balance of`)){
        const balstr = cleanstr.split(' ')
        const userbal = balstr[balstr.length-1]
        const balance = parseFloat(userbal.replace(/[$,]/g, ''))
        this.emit('balanceof',{balance: balance, message: cleanstr})
      }
  
      // if the amount is taken from the user 
      else if(cleanstr.includes(`taken from`)){
        console.log("Found taken from");
        const amount = parseFloat(cleanstr.split(' ')[0].replace(/[$,]/g, ''))
        this.emit('eco taken',{amount: amount, message: cleanstr})
      }
  
      // if player recived the money
      else if(cleanstr.includes(`added to`)){
        const amount = parseFloat(cleanstr.split(' ')[0].replace(/[$,]/g, ''))
        this.emit('eco recived',{amount: amount, message: cleanstr}) 
      }
  
      // if player money set/reset
      else if(cleanstr.includes(`You set`)){
        const splitemsg = cleanstr.split(' ')
        const amount = parseFloat(splitemsg[splitemsg.length-1].replace(/[$,.]/g, ''))
        this.emit('eco set',{amount: amount, message: cleanstr}) 
      }
    })
    return this
  }
}


module.exports = {
    removeTimestamps: removeTimestamps,cleanString:cleanString,Websocket: Websocket, getSocketCredientials: getSocketCredientials}