---
title: Adding an image
description: Add a public-domain image
img: benjamin-balazs-xtiGzOiJe1Q-unsplash.png
category: github
alt: Generic picture of camera
order: 4
---

Image files are stored in the <code>static</code> folder.
To add a new image, resize it to a height of 200 pixels and
save it as a PNG file. PNG files are transparent, which 
is ideal for web pages.

## Step 1. Find an Image 
All images on this site should be public domain images.
EBT-site uses the [MIT License](https://opensource.org/licenses/MIT),
so even your own images will be covered by the MIT License.
When you include an image, be sure to thank your source!

* [Unsplash.com](https://unsplash.com) 
* [Pexels.com](https://pexels.com) 
* [Pixabay.com](https://pixabay.com) 
* [PxHere.com](https://pxhere.com)
* [Wikimedia](/author/add-wikimedia) (limited use)

If you use your own image, consider uploading them at full
resolution for others to use on any of the above
sites. Then download and edit your image again just as you 
would any other public domain image. It's a little more work,
but that work will help others.

For Wikimedia, special considerations apply.
See [Adding a Wikimedia image](/author/add-wikimedia)

## Step 2. Edit the Image
Use your favorite editor to edit your image.
Many online editors  such as [Pixlr](https://pixlr.com) 
allow you to edit images and save them as PNG files.
Use your editor to crop the image or adjust saturation, exposure, etc. 
Image thumbnails expect a 4:5 aspect ratio, 
but you can choose otherwise.

## Step 3. Save the Image
It's important to save the image as a PNG file.
PNG files are ideal for web use since they are transparent.

When saving the image, be sure to save it at the resolution you need.
Most public domain images are much higher resolution than needed for a website.
To save space, save your image as a 
200 pixel high PNG file with a width of 250 pixels or more. 
Your picture thumbnail will look best with this 4:5 aspect ratio.  
Wider pictures will be cropped. 
Narrower pictures won't line up with the other thumbnails on their right side.

* [Unsplash images:](https://unsplash.com) save as PNG file with provided name
* [Pexels images:](https://pexels.com) save as PNG file with provided name
* [Pixabay images:](https://pixabay.com) save as PNG file, prefixing the provided name with `pixabay-` 
* [PxHere.com:](https://pxhere.com) save as PNG file; choose a meaningful name that contains the "magic number" of the image and prefix that with `pxhere-`
* [Wikimedia images:](/author/add-wikimedia) do not save or edit Wikimedia files

## Step 4. Add Image file
Add an image file using Github: 

1. Navigate to the <code>static</code> folder
1. Click <kbd>Add File</kbd> to add your new image.

<p><img src="./github-add-image.png" width="600px"/></p>

## Step 5. Use the Image

#### Wiki Page Title Image
The most common use of images will be for 
the title image of individual wiki pages.
Each wiki page is prefixed with a 
[YAML](https://en.wikipedia.org/wiki/YAML)
header. Edit the `img:` value to change the article image:
<pre>
---
title: Adding an image
description: Add a public-domain image
img: benjamin-balazs-xtiGzOiJe1Q-unsplash.png
alt: Generic picture of camera
---
</pre>

#### Wiki Page Body Images
You can also add images anywhere within the body of a wiki page.


##### HTML syntax
The HTML `<img>` syntax gives you the most control.
For example:
<pre class="mb-2">
&lt;img src="./suttacentral.png" height="100px"/&gt;
</pre>

<img src="./suttacentral.png" height="100px"/>

##### Markdown syntax
Markdown images also work but you can't control the image size.

<pre>![suttacentral image](./suttacentral.png)</pre>
![suttacentral image](./suttacentral.png)

#### Site Image
The site image is specified in `ebt-site.yaml` file 
of the Github repository.
Change the default image to your new image.

<pre>
ebt_site_image: amanda-flavell-9XSLoMlVhYU-unsplash.png
</pre>

## Step 6. Removing an Image
If you don't want an image and need to remove it:

1. Delete the image from the `static` folder
1. Delete the image content markdown file from the `content/images` folder


