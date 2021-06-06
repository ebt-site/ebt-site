---
title: Create a Buddhist Website
description: Create a static website with Early Buddhist Texts from SuttaCentral.net
img: ameya-sawant-89UPihhAkmo-unsplash.png
category: github
alt: Generic picture of monastery
order: 1
---
Small Buddhist communities often need a website for
coordinating activities and studies while providing
accessing to shared Dhamma.
Create your own Early Buddhist Text website based
on the Pali Canon and its translations hosted on
[SuttaCentral](https://suttacentral.net) 
as well as
[Voice.suttacentral.net](https://voice.suttacentral.net).

### Step 1. Create a Github account
Each EBT website is hosted on Github. To create your own EBT website, you
will need to [create a Github account](https://docs.github.com/en/github/getting-started-with-github/signing-up-for-github). Although Github does sell products,
they are generously supporting open-source free of charge.
All EBT websites are [open source](https://opensource.org/licenses/MIT).

### Step 2. Fork EBT-Site repository
To create your own EBT website, you will 
[fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)
The `ebt-site` Github repository.

**IMPORTANT!** Your own EBT website will initially have the name 'ebt-site`,
but we can change it _later_. Do not change the name!

Let's take a look at your new EBT-Site in Github.

1. Login to Github. 
1. We will now open up the main EBT-Site Github repository in a new browser tab. For reference, these instructions will still be here in this browser tab.  CTRL-Click [this link](https://github.com/ebt-site/ebt-site) to open a new browser tab that shows the main EBT-Site repository from which you will create your own fork. 
1. Click <kbd>Fork</kbd> in the upper right hand corner of the web page. Do NOT change the fork name at this time. Your forked repository will also have the name "ebt-site".

### Step 3. Build your EBT website
Once you have created your ebt-site fork, 
Github still needs a little push in order to start building your new EBT website. For this purpose you can make any edit on any page of your new repository.

Open the `content` folder in your repository. There you find various sub-folders. Choose any file in any of those to make any small edit. For example, add "Hello, world!" to your new `content/wiki/welcome.md` file. Just changing one character is enough. Committing your change will start a workflow run. Click the `Actions` tab in the top-center of your web page to see what's happening. After about 5 minutes, you'll see that the initial commit 
has been built. (It will be called whatever you call your commit.)

![Initial Commit](./initial-commit.png)

### Step 4. Enable Github Pages
Your EBT website will be a [Github Page](https://pages.github.com/).
Let's make it.

1. Click <kbd>Settings</kbd>
1. Click on *Pages* in the left bar
1. Select the *Source* of your Github page to be the `gh-pages` branch.
1. Click <kbd>Save</kbd> if necessary (it may already be saved).

It takes a while to build an EBT site. 
Eventually you will see a green box:

![site-published](./site-published.png)

Click on the link in the green box to view your new EBT website.

### Step 5. Enable Scheduled Actions
EBT websites get the latest documentation and Dhamma content
from their parent EBT website.
To enable content updates, we need to enable the _schedule-actions_ workflow.

1. Click on the Github icon in the upper right of your screen
1. Select the <kbd>Actions</kbd> tab
1. Click <kbd>schedule-actions</kbd>
1. Click <kbd>Enable workflow</kbd>

### Step 6. Changing time for schedule-actions
Code and content updates are handled by the `.github/workflow/schedule-actions.yml` file.

<pre>
name: schedule-actions
on: 
  schedule:
    - cron: 20 4,12,20 * * *
jobs:
  build-job:
    ...
</pre>

To change the update schedule, edit the following line:

<pre>
cron: 20 4,12,20 * * *
</pre>

It is recommendable to set your time slightly *after* the time of the mother site, like

<pre>
cron: 40 4,12,20 * * *
</pre>

See [crontab.guru](https://crontab.guru/) for help 

### Next Steps
Congratulations! You now have your own EBT website.

The following steps are optional:

* [rename your website](/author/rename-website)
* [customize your website](/author/customize-website)
