/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const fs = require('node:fs');
const path = require('path');

async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    };
};

async function loadFiles(dirName) {
    const Files = [];
    const folders = fs.readdirSync(dirName);
    for (const folder of folders) {
        const files = fs
        .readdirSync(`${process.cwd().replace(/\\/g, '/')}/${dirName}/${folder}`)
        .filter((file) => file.endsWith('.js'));

        for (const file of files) {
            require(`${process.cwd().replace(/\\/g, '/')}/${dirName}/${folder}/${file}`);
            Files.push(`${process.cwd().replace(/\\/g, '/')}/${dirName}/${folder}/${file}`);
        };
    };

    await Promise.all(Files.map(deleteCachedFile));
    return Files;
};

module.exports = { loadFiles };

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/