import axios from 'axios';
import configs from '../../config.json' assert { type: 'json' };
const { panel } = configs


const ClientKey = panel.CLIENTKEY
const ClientURL = panel.ClientURL

export async function start(serverIndentifier) {
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

export async function stop(serverIndentifier) {
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

export async function restart(serverIndentifier) {
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

export async function kill(serverIndentifier) {
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

export default {
    start: start,
    stop: stop,
    restart: restart,
    kill: kill
}