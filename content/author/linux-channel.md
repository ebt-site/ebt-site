---
title: Wiki Channels
description: Add/Delete/Update wiki channels
img: tux-linux.png
alt: Generic picture of tux-linux
category: github
order: 10001
---

## Channel Content
The wiki is organized 
as a two-level hierarchy grouped into content channel
folders under the `content` folder.

<pre>
content
content/wiki
content/author
content/news-en
content/sites
content/images
</pre>

The primary channel is the `wiki` folder.
Each markdown file in the primary channel is the index page
for that channel.

All the other folders in the `content` folder are secondary channels.
Each markdown file in a secondary channel is a leaf node in the 
two level wiki hierarchy.

## Channel Programming
The behavior of each channel is programmed using
the `pages` folder using Vue components.

<pre>
pages
pages/wiki
pages/wiki/_slug.vue
pages/wiki/index.vue
pages/author
pages/author/_slug.vue
pages/news
pages/news/_slug.vue
pages/sites
pages/sites/_slug.vue
...
</pre>

## Removing a Channel
To hide a channel, blank out its YAML category.

To restore a channel, set its YAML category to the desired category title

Commit and push your change to trigger a rebuild of your website.

## Add a Channel
To add a new channel called `tipitaka`:

<pre>
scripts/wiki-channel tipitaka
</pre>

Be sure to edit the new channel Markdown file in `content/wiki` 
and set the desired category title. The default category title is "New".

#### IMPORTANT!
_Do NOT change the generated file or folder names._ They are used
to link the files by name. Renaming the file or folder names
will cause the links to fail with HTTP error 404.

## Scheduling Channel Updates
Channel updates are handled by the `.github/workflow/schedule-actions.yml` file.

<pre>
name: schedule-actions
on: 
  schedule:
    - cron: 15 4,12,20 * * *
jobs:
  build-job:
    ...
</pre>

To change the update schedule, edit the following line:

<pre>
cron: 15 4,12,20 * * *
</pre>

See [crontab.guru](https://crontab.guru/) for help 
with the cryptic cron syntax.

