# Image Scrapper

Image Scrapper is an NPM package that allows you to extract and download all images from any website.

## Installation

To use Image Scrapper, you first need to install it as a dependency in your project. You can do this by running the following command in your terminal:

```
npm install image-scrapper
```
## Usage

To use Image Scrapper, you need to require it in your code and then call the function, passing in the URL of the website you want to scrape images from, and the path where you want to save the images. Here's an example:

```
const imageScrapper = require('image-scrapper');

imageScrapper('https://github.com/vijaygupta18', "./images")
```
If you don't specify the path where you want to save the images, they will be downloaded in the current path.

## Contributing

If you would like to contribute to Image Scrapper, please fork the repository and make any changes you would like. Once you have made your changes, submit a pull request with a detailed description of what you have done.

## License

Image Scrapper is licensed under the MIT License.




