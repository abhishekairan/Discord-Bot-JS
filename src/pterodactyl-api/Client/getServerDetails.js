import axios from 'axios';
import configs from '../../config.json' assert { type: 'json' };
const {panel} = configs

const ClientKey = panel.CLIENTKEY
const ClientURL = panel.ClientURL

export default async (uuid) =>{
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