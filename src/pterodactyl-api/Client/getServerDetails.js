import axios from 'axios';
import {panel} from '../../config.json';

const ClientKey = panel.CLIENTKEY
const ClientURL = panel.ClientURL

module.exports = async (uuid) =>{
    try{
        const response = await axios.get(`${ClientURL}/servers/${uuid}`, {
            headers: {
                'Authorization': `Bearer ${ClientKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}