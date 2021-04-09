---
title: Linux Development
description: Develop your EBT-site quickly using Linux
img: tux-linux.png
alt: Generic picture of tux-linux
category: github
order: 10000
---

Editing an EBT-site with Github is easy, but slow.

If you want to edit more efficiently,
consider using a Linux EBT-site development environment.
With a Linux EBT-site development environment, your
wiki changes will be shown almost instantly as you develop.
When you're done with changes, 
just commit and push your edits to Github.

## Prerequisites

* [Learn Linux](https://linuxjourney.com/)
* Ubuntu 20 or Debian 10 
* Node v14
* (Optional) Vue/Vuetify knowledge


## Installation
Open a terminal window in your development folder.
<pre>
git clone git@github.com:sariputta/ebt-site
cd ebt-site
npm install
</pre>

## Development
Launch a local EBT website on port 3000:
<pre>
npm run dev
</pre>

All changes made to your EBT source will
be reflected immediately in the browser.

## Maintenance
EBT-Site changes regularly. 
Your forked repository has a Github action that 
automatically pulls from the upstream EBT-site.

At the start of each workday, you should
refresh your local repository to get the latest changes.
Merge conflicts should be rare since merges are
automatically resolved in favor of your changes.

<pre>
git pull
</pre>

If you need upstream changes immediately, 
you can pull them to your own machine:

<pre>
scripts/pull-upstream
</pre>

By updating your locale repository regularly,
you will avoid merge conflicts.

