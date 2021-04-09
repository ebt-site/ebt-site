---
title: Rename EBT website
description: Change website name
img: brett-jordan-POMpXtcVYHo-unsplash.png
alt: Generic picture of words
category: github
order: 1
---

Your EBT website is initially named `ebt-site`,
which is the name used in the URL of your EBT website.
In particular, for a Github user named "Sariputta", the URL of
the EBT website would be 

`https://sariputta.github.io/ebt-site`

You can change the URL to your EBT website in several ways.

### Change your Github Account Name
Although you can change your Github account name,
there can be [unanticipated consequences](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/changing-your-github-username).
Changing your account name affects the "sariputta" portion of the example URL.
For example, Github user "Ananda" would have the URL:

`https://ananda.github.io/ebt-site`

### Create a Github Organization 
Rather than change your Github account name, it's
safer to create a new Github Organization.
For example, a "sariputta-sangha" organization can have its
own EBT website that would have the URL

`https://sariputta-sanga.github.io/ebt-site`.

### Rename Repository
If you rename the repository, it will change the `ebt-site`
portion of the URL. 
For example, if you change the repository to `sangha`,
the URL would become 

`https://sariputta.github.io/sangha`

Renaming a repository will break the existing website,
which will need to be rebuilt.
To rebuild the EBT website for a renamed repository, 
simply make a small change to the repository (e.g., change the Welcome page).
Each change to the repository triggers a website build.

### Custom Domain
You can have total control over the domain name by using a custom domain.
For example, suppose we wish to have a URL:

`https://sariputta.faith`,

In this example, you would purchase a custom domain `sariputta.faith` and
consult the Github documentation on [custom domains](https://docs.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site).


