const axios = require('axios')
const { panel } = require('../../config.json')

module.exports = async (id) => {
    const ApplicationKey = panel.APPLICATIONKEY
    const ApplicationURL = panel.ApplicationURL
    // console.log(id);
    if (id){
        // console.log("Got the id");
        try{
            const response = await axios.get(`${ApplicationURL}/servers/${id}`,{
                headers: {
                    'Authorization': `Bearer ${ApplicationKey}`
                }
            })
            const server = response.data
            return server
        }catch(error){
            console.error(error)
        }
    }else{
        try{
            const response = await axios.get(`${ApplicationURL}/servers`,{
                headers: {
                    'Authorization': `Bearer ${ApplicationKey}`
                }
            })
            const servers = response.data.data.map(item => ({
                object: item.object,
                attributes: item.attributes
            }));
            
            return servers
        }catch(error){
            console.error(error)
        }
    }
}

// {
//     object: 'server',
//     attributes: {
//       id: 9,
//       external_id: null,
//       uuid: 'a902b8c1-e0cd-45a9-9e79-66ab3bf95c8c',
//       identifier: 'a902b8c1',
//       name: 'custom',
//       description: '',
//       status: null,
//       suspended: false,
//       limits: {
//         memory: 5000,
//         swap: 0,
//         disk: 10000,
//         io: 500,
//         cpu: 100,
//         threads: null,
//         oom_disabled: true
//       },
//       feature_limits: { databases: 0, allocations: 0, backups: 5 },
//       user: 2,
//       node: 1,
//       allocation: 2,
//       nest: 1,
//       egg: 1,
//       container: {
//         startup_command: 'java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar {{SERVER_JARFILE}}',
//         image: 'ghcr.io/pterodactyl/yolks:java_21',
//         installed: 1,
//         environment: [Object]
//       },
//       updated_at: '2024-09-19T13:47:28+00:00',
//       created_at: '2024-09-18T06:52:17+00:00'
//     }
//   }