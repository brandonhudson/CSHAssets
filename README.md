# CSHAssets
Public asset storage for projects

Assets is a CDN (Content Delivery Network) meant to have a single point of
distribution for [Computer Science House](https://github.com/ComputerScienceHouse).

Assets is located at https://assets.csh.rit.edu in order to view the list of
assets and upload new assets you must be logged in through CSH WebAuth. However
the `/uploads` route is public for anyone to access files from, due to this it
is not advised to upload private files to Assets.

## Setup

### Upload Server

1. Setup a Python Virtualenv

2. `pip install flask`

3. `python assets/ config.json`

## Usage

If you are a web developer looking to use Assets as a centralization platform
for your applications this section will give you examples on how to do so.

### Uploading Content

1. Visit https://assets.csh.rit.edu

2. Click Upload File at the top of your browser window

3. Follow instructions listed under the Using Content Subsection

### Using Content

1. Search for the content that you wish to include in your application.

2. Copy the download URL which you will use to link to your content.

3. (Optional) Copy the SHA-348 hash so you can set up a subresource integrity
   check for your content.
