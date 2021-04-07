---
title: Adding an image
description: Add a public-domain image
img: benjamin-balazs-xtiGzOiJe1Q-unsplash.png
alt: Generic picture of camera
---

Image files are stored in the <code>static</code> folder.
To add a new image, resize it to a height of 200 pixels and
save it as a PNG file. PNG files are transparent, which 
is ideal for web pages.

### Step 1. Find an Image 
All images on this site should be public domain images.
EBT-site uses the [MIT License](https://opensource.org/licenses/MIT),
so even your own images will be covered by the MIT License.
When you include an image, be sure to thank your source!

* [Unsplash.com](https://unsplash.com) 
* [Pexels.com](https://Pexels.com) 
* [Wikimedia](https://commons.wikimedia.org/wiki/Commons:Free_media_resources/Photography)

If you use your own image, consider uploading them at full
resolution for others to use on any of the above
sites. Then download and edit your image again just as you 
would any other public domain image. It's a little more work,
but that work will help others.

### Step 2. Edit the Image
Use your favorite editor to edit your image.
Many online editors  such as [Pixlr](https://pixlr.com) 
allow you to edit images and save them as PNG files.
Use your editor to crop the image or adjust saturation, exposure, etc. 
When you're done editing, save the image.

When saving the image, be sure to save it at the resolution you need.
Most public domain images are much higher resolution than needed for a website.
To save space, save your image as a 200 pixel high PNG file. 
PNG files are important for the web because PNF files are transparent.

### Step 3. Add Image file
Add an image file using Github: 

1. Navigate to the <code>static</code> folder
1. Click <kbd>Add File</kbd> to add your new image.

<p><img src="./github-add-image.png" width="600px"/></p>

### Step 4. Use the Image
Although you can just use markdown to include an image,
it will probably be more convenient to use your new image
as the image for a given page by means of the `img` property
in the 
[YAML](https://en.wikipedia.org/wiki/YAML)
header.
At the top of every wiki page is a 
[YAML](https://en.wikipedia.org/wiki/YAML)
header that has an `img` property with an image name.
For example, the YAML header for this wiki page looks like:

```
---
title: Adding an image
description: Add a public-domain image
img: benjamin-balazs-xtiGzOiJe1Q-unsplash.png
alt: Generic picture of camera
---
```

It may also help to look at the source for this wiki page itself
for ideas on how to include images:


[content/author/add-image.md](https://raw.githubusercontent.com/sc-voice/ebt-site/main/content/author/add-image.md)

