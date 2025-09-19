<<<<<<< HEAD
# pustacks

Live on pustacks.netlify.app

A resource sharing to share course material and previous year papers
=======
# Resource-Sharing

Welcome to the College Resource Sharing Website! This platform is designed to facilitate the sharing of educational resources among college students. Whether you need lecture notes, study guides, practice exams, or any other material, this website is here to help you.

## Overview

Every year we require notes and previous year questions to study for our exams and for this we contact many people and sometimes we don't get the resources at the right time.
<br>
So to cope up with that we are building this resource sharing webiste to help the students so that they get the right resources at the right time.
<br>
More deatils of the project our provided at this [Notion Link](https://grey-soybean-258.notion.site/Resource-Sharing-da954660ddf44771895d56321195aae4).

## Tech Stack

- It's powered by [React](https://react.dev/),
- It uses [Tailwind](https://tailwindcss.com) CSS framework,
- It is build and deployed with [Vite](https://vitejs.dev/)

##### Prerequistes

- Configuration of [Git](https://docs.github.com/en/get-started/quickstart/set-up-git) in your system.
- IDE (recommendation: VSCode)
- Nothing else you are good to go!!

## Run Locally

#### Follow the steps mentioned below to setup the project locally on your computer

1. Fork the repository by clicking on `Fork` option on top right of the main repository.
2. Open Command Prompt/Terminal on your local computer.
3. Clone the forked repository by adding your own GitHub username in place of `<username>`.

```bash
    git clone https://github.com/<username>/resource-sharing/
```

4. Navigate to the resource-sharing directory.

```bash
    cd resource-sharing
```

5. Install all resource-sharing dependencies.

```bash
    npm install
```

6. Run the website locally.

```bash
    npm run dev
```

7. Access the live development server at [localhost:5173](http://localhost:5173).

### Communication

To discuss about the project the you may reach out the maintainers on the discord or any other social channel.<br>
Don't hesistate to ask any doubt 😄

### How to Contribute

Try picking up some `good-first-issue` from the issue section and make [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) for them.
<<<<<<< HEAD
>>>>>>> 196ddc1 ( Major UI/UX improvements and enhancements)
=======

## Admin (Decap CMS) on Netlify

This project includes a simple, database-free CMS using Decap CMS (formerly Netlify CMS) to manage book entries.

What you get:
- A secure admin at /admin (Git-based, no DB)
- Edit books as JSON files in data/books
- Automatic builds deploy your changes

Setup steps on Netlify:
1) Deploy this repo to Netlify (connect GitHub, select the repo)
2) In Site Settings → Identity → Enable Identity
3) Identity → Registration → Invite Only, then click “Invite user” and invite your admin email
4) Identity → Services → Enable Git Gateway
5) Build & deploy (Netlify will run npm run build and publish dist)
6) Visit https://<your-site>/admin → “Login with Netlify Identity” → accept the invite → log in

Editing books:
- Click “Books” collection, add entries with Title, Author, Google Drive Link
- Save & Publish → Netlify will commit JSON under data/books and trigger a deploy
- Frontend fetches /api/books or /.netlify/functions/books and merges CMS entries with external sources

Local dev for CMS:
- Decap’s local_backend is enabled; you can open http://localhost:5173/admin but authoring requires Git/backend. For UI-only checks it’s fine.
>>>>>>> 7cf1f70 (feat: Decap CMS admin, Netlify function, no-DB books)
