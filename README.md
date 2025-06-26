# Image Scrapper

A powerful and lightweight Node.js package that automatically extracts and downloads all images from any website. Built with pure Node.js without external dependencies for maximum compatibility and minimal footprint.

## 🚀 Features

- **Zero Dependencies**: Built entirely with Node.js core modules
- **Protocol Support**: Handles both HTTP and HTTPS websites
- **Smart URL Processing**: Automatically adds protocol if missing (www.example.com → https://www.example.com)
- **Flexible Output**: Custom download directory or defaults to `./downloaded_images`
- **Robust Error Handling**: Gracefully handles network errors and invalid images
- **File Sanitization**: Cleans filenames to ensure compatibility across operating systems
- **Progress Tracking**: Real-time console output showing download progress
- **Duplicate Handling**: Automatically handles filename conflicts

## 📦 Installation

Install the package using npm:

```bash
npm install image-scrapper
```

## 🔧 Usage

### Basic Usage

```javascript
const imageScrapper = require('image-scrapper');

// Download images to default directory (./downloaded_images)
imageScrapper('https://example.com');

// Download images to custom directory
imageScrapper('https://example.com', './my-images');

// Works with www URLs (automatically adds https://)
imageScrapper('www.example.com', './website-images');
```

### Advanced Example

```javascript
const imageScrapper = require('image-scrapper');

async function scrapeImages() {
    try {
        await imageScrapper('https://github.com/vijaygupta18', './github-images');
        console.log('Image scraping completed successfully!');
    } catch (error) {
        console.error('Scraping failed:', error.message);
    }
}

scrapeImages();
```

## 🛠 How It Works

1. **Fetches Website Content**: Downloads the HTML content from the provided URL
2. **Extracts Image URLs**: Uses regex pattern matching to find all `<img>` tags and extract `src` attributes
3. **Creates Download Directory**: Automatically creates the specified directory if it doesn't exist
4. **Downloads Images**: Sequentially downloads each image with proper error handling
5. **Sanitizes Filenames**: Removes special characters to ensure cross-platform compatibility

## 📋 API Reference

### `imageScrapper(websiteUrl, pathName)`

**Parameters:**
- `websiteUrl` (string, required): The URL of the website to scrape images from
- `pathName` (string, optional): The directory path where images will be saved. Defaults to `./downloaded_images`

**Returns:** Promise that resolves when all images are downloaded

**Throws:** Error if no website URL is provided or if the website cannot be accessed

## 🔍 Technical Details

- **Supported Protocols**: HTTP and HTTPS
- **Image Formats**: All formats supported by the `<img>` tag (JPG, PNG, GIF, SVG, WebP, etc.)
- **File Naming**: Images are prefixed with "image " and special characters are removed
- **Error Recovery**: Individual image download failures don't stop the entire process

## 🚨 Error Handling

The package includes comprehensive error handling:

- **Invalid URLs**: Clear error messages for malformed URLs
- **Network Issues**: Graceful handling of connection timeouts and failures
- **Missing Images**: Skips broken or inaccessible image links
- **File System Errors**: Handles permission issues and disk space problems

## 📁 Output Structure

```
your-project/
├── downloaded_images/          # Default directory
│   ├── image logo.png
│   ├── image banner.jpg
│   └── image icon.svg
└── custom-folder/              # Custom directory
    ├── image photo1.jpg
    └── image photo2.png
```

## ⚠️ Important Notes

- **Respect Website Terms**: Always check the website's robots.txt and terms of service before scraping
- **Rate Limiting**: The package downloads images sequentially to avoid overwhelming servers
- **Large Websites**: Be cautious when scraping websites with many images as it may take time
- **File Permissions**: Ensure your application has write permissions to the target directory

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Implement your improvements or bug fixes
4. **Test Thoroughly**: Ensure your changes work with various websites
5. **Submit a Pull Request**: Provide a detailed description of your changes

### Development Setup

```bash
git clone https://github.com/vijaygupta18/image-scrapper.git
cd image-scrapper
npm install
```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

Found a bug? Please open an issue on [GitHub](https://github.com/vijaygupta18/image-scrapper/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Website URL (if publicly accessible)

## 📚 Examples

### Scraping a Blog

```javascript
const imageScrapper = require('image-scrapper');

imageScrapper('https://blog.example.com', './blog-images')
    .then(() => console.log('Blog images downloaded!'))
    .catch(err => console.error('Error:', err.message));
```

### Scraping Multiple Sites

```javascript
const imageScrapper = require('image-scrapper');

const websites = [
    'https://example1.com',
    'https://example2.com',
    'https://example3.com'
];

async function scrapeMultiple() {
    for (const site of websites) {
        const folderName = site.replace(/https?:\/\//, '').replace(/\./g, '_');
        await imageScrapper(site, `./${folderName}_images`);
    }
}

scrapeMultiple();
```

---

**Made with ❤️ by [Vijay](https://github.com/vijaygupta18)**




