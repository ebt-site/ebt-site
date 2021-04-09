---
title: Adding a Wikimedia image
description: Addding a Wikimedia image is complicated
img: https://upload.wikimedia.org/wikipedia/commons/f/ff/Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg
imgSrc: https://commons.wikimedia.org/wiki/File:Buddha_in_Sarnath_Museum_(Dhammajak_Mutra).jpg
alt: Generic picture of camera
order: 4.1
---

[Wikimedia](https://commons.wikimedia.org) 
images have their own special requirements
for use and attribution.
In particular, because of technical limitations,
wikimedia images currently should not be downloaded to an EBT website.

### Case 1. Main image for wiki page
The simplest way to use an unedited wikimedia image
is as the main image of an article.
In the YAML header of an article, set the following fields:

* *img:* _Wikimedia File URL_
* *imgSrc:*  _Wikimedia Page URL_

For example, this article's YAML header has:

<pre>
img: https://upload.wikimedia.org/wikipedia/commons/f/ff/Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg
imgSrc: https://commons.wikimedia.org/wiki/File:Buddha_in_Sarnath_Museum_(Dhammajak_Mutra).jpg
</pre>

### Case 2. Content image within a wiki page
Embed an image:

<a title="พระมหาเทวประภาส วชิรญาณเมธี (ผู้ถ่าย-ปล่อยสัญญาอนุญาตภาพให้นำไปใช้ได้เพื่อการศึกษาโดยอยู่ภา่ยใต้ cc-by-sa-3.0)  ผู้สร้างสรรค์ผลงาน/ส่งข้อมูลเก็บในคลังข้อมูลเสรีวิกิมีเดียคอมมอนส์ - เทวประภาส มากคล้าย, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Buddha_in_Sarnath_Museum_(Dhammajak_Mutra).jpg"><img width="256" alt="Buddha in Sarnath Museum (Dhammajak Mutra)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg/256px-Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg"></a>

### Why can't I download and edit a Wikimedia image?
Wikimedia filenames cannot be distinguished from your own images.
All images on an EBT-site are MIT licensed, 
which is a different public license than Wikimedia licenses.
Essentially, there's a license conflict and no good way to 
automate the required Wikimedia attribution other than what is documented above.

