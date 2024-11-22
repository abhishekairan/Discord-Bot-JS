import https from 'https';

module.exports = async (ip,bedrock) => {

    let URL = "https://api.mcsrvstat.us/3/"
    
    if(bedrock){
        URL = "https://api.mcsrvstat.us/bedrock/3/"
    }
    return new Promise((resolve, reject) => {
      https.get(`${URL}${ip}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }