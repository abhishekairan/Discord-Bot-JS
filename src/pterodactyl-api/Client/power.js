const axios = require('axios')
const { panel } = require('../../config.json')


const ClientKey = panel.CLIENTKEY
const ClientURL = panel.ClientURL

async function start(serverIndentifier) {
    const RequestUrl = `${ClientURL}/servers/${serverIndentifier}/power`
    try{
        const response = axios.post(RequestUrl, {
            signal: "start"
        },{
            headers: {
                Authorization: `Bearer ${ClientKey}`
            }
        })
        return response.data
    } catch (error) {
        console.error(`Error starting server with identifer: ${serverIndentifier}: `,error)
    }
}

async function stop(serverIndentifier) {
    const RequestUrl = `${ClientURL}/servers/${serverIndentifier}/power`
    try{
        const response = axios.post(RequestUrl, {
            signal: "stop"
        },{
            headers: {
                Authorization: `Bearer ${ClientKey}`
            }
        })
        return response.data
    } catch (error) {
        console.error(`Error Stoping server with identifer: ${serverIndentifier}: `,error)
    }
}

async function restart(serverIndentifier) {
    const RequestUrl = `${ClientURL}/servers/${serverIndentifier}/power`
    try{
        const response = axios.post(RequestUrl, {
            signal: "restart"
        },{
            headers: {
                Authorization: `Bearer ${ClientKey}`
            }
        })
        return response.data
    } catch (error) {
        console.error(`Error Stoping server with identifer: ${serverIndentifier}: `,error)
    }
}

async function kill(serverIndentifier) {
    const RequestUrl = `${ClientURL}/servers/${serverIndentifier}/power`
    try{
        const response = axios.post(RequestUrl, {
            signal: "kill"
        },{
            headers: {
                Authorization: `Bearer ${ClientKey}`
            }
        })
        return response.data
    } catch (error) {
        console.error(`Error Stoping server with identifer: ${serverIndentifier}: `,error)
    }
}

module.exports = {
    start: start,
    stop: stop,
    restart: restart,
    kill: kill
}