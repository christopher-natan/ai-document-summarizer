import readFile from 'fs';

class ContentModel {
    index = async () => {
        readFile(Configs.dataPath + 'determine.json', 'utf8', async (err, resBuffer) => {
            if (err) throw err
            const response = JSON.parse(resBuffer);
        });
    }
}
