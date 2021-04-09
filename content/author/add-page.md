---
title: Adding a Wiki Page
description: How to add a new wiki page
img: pexels-george-becker-374916.png
alt: Generic picture of addition
order: 4
---
The easiest way to add a new wiki page is to copy an existing one.

### Step 1. Choose a channel folder
EBT-site wiki pages are organized into 
[channels](https://ebt-site.github.io/ebt-site/author/linux-channels),
stored under the `content` folder or your Github repository.
Choose an existing channel or 
[create your own channel](https://ebt-site.github.io/ebt-site/author/linux-channels).

### Step 2. Copy an existing file
Copy the contents of any existing channel file.
Paste the copied contents into your new wiki file.

### Step 3. Edit the YAML header
Your copied file is prefaced by a YAML header such as:

```
---
title: Adding a Wiki Page
description: How to add a new wiki page
img: pexels-george-becker-374916.png│
alt: Generic picture of addition
order: 4
---
```

Edit the YAML fields as you wish:

| Field | Purpose |
| ---- | ---- |
| *title* | Title displayed at top of wiki page
| *description* | Subtitle displayed at top of wiki page
| *img* | Image displayed at top of wiki page: image file name in `static` folder or image URL. 
| *alt* | Accessibility title for image displayed at top of wiki page
| *order* | Order of page shown in channel. TIP: For newsletters, use negative dates such as -2021.0430

### Step 4. Add new content
Replace the copied content with the content for the new wiki page.
Save the page and it will deploy to your website in about 10 minutes.

