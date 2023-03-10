const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const fs = require('fs');

async function imageScrapper(websiteUrl, pathName) {
    try {
        if (!websiteUrl)
            throw new Error('No website URL provided');
        if (websiteUrl.startsWith('www')) {
            websiteUrl = 'https://' + websiteUrl;
        }
        const data = await fetchData(websiteUrl);
        const imgUrls = extractImgUrls(data);
        const downloadDirectory = pathName ? pathName : './downloaded_images';
        if (imgUrls.length > 0) {
            console.log(`Found ${imgUrls.length} images on the website`);
            createDirIfNotExists(downloadDirectory);
            let count = 0;
            for (const imgUrl of imgUrls) {
                try {
                    console.log('Downloading image : ' + count);
                    await downloadImage(imgUrl, downloadDirectory);
                    count++;
                } catch (error) {
                    console.log(`Error downloading image : ${error.message}`);
                }
            }
        } else {
            console.log('No images found on the website');
        }
    } catch (error) {
        console.log(`Error fetching website: ${error.message}`);
    }
    console.log("Done");
};

function fetchData(urlString) {
    return new Promise((resolve, reject) => {
        const client = urlString.startsWith('https') ? https : http;
        client.get(urlString, function (response) {
            let data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                resolve(data);
            });
        }).on('error', function (error) {
            reject(error);
        });
    });
}

function extractImgUrls(html) {
    const imgUrls = [];
    const regex = /<img [^>]*src=(?:(?:'([^']*)')|(?:"([^"]*)"))/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
        if (match[1])
            imgUrls.push(match[1]);
        if (match[2])
            imgUrls.push(match[2]);
    }
    return imgUrls;
}

function createDirIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function downloadImage(imgUrl, downloadDirectory) {
    return new Promise((resolve, reject) => {
        const imgUrlParts = url.parse(imgUrl);
        if (!imgUrlParts.pathname)
            return;
        const imgFilename = path.basename(imgUrlParts.pathname);
        const imgPath = path.join(downloadDirectory, 'image ' + imgFilename.replace(/[^a-zA-Z ^.]/g, ""));

        const client = imgUrlParts.protocol === 'https:' ? https : http;

        client.get(imgUrl, function (response) {
            if (response.statusCode !== 200) {
                reject(new Error(`Error downloading image "${imgUrl}": ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(imgPath);
            response.pipe(fileStream);

            fileStream.on('finish', function () {
                resolve();
            });

            fileStream.on('error', function (error) {
                reject(new Error(`Error writing image "${imgFilename}" to file: ${error.message}`));
            });
        }).on('error', function (error) {
            reject(new Error(`Error downloading image "${imgUrl}": ${error.message}`));
        });
    });
}

module.exports = imageScrapper;