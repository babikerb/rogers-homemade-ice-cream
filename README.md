<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/babikerb/rogers-homemade-ice-cream">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">rogers-homemade-ice-cream</h3>

  <p align="center">
    A portal for managing Roger's Homemade Ice Cream website.
    <br />
    <a href="https://github.com/babikerb/rogers-homemade-ice-cream"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/babikerb/rogers-homemade-ice-cream">View Live Site</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<!-- <details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>A portal for managing Roger's Homemade Ice Cream website.
        
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details> -->

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://rogershomemade.com/)

This project is being built to help [Roger's Homemade Ice Cream](https://rogershomemade.com/) manage their shop website and in-store menu.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
* [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
* [![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?logo=mui&logoColor=white)](https://mui.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Make sure that you have installed everything in the Prerequisites section and that the software is running. Once you have the prerequisites, follow the Installation section.

### Prerequisites

1. Install [Postgres](https://www.postgresql.org/download/) database.

### Installation

Clone the repository

```bash
git clone https://github.com/babikerb/rogers-homemade-ice-cream.git
# or
git clone git@github.com:babikerb/rogers-homemade-ice-cream.git
```

Setup frontend

```bash
# Move to frontend directory
cd frontend/
# Install dependencies
pnpm install
# Run nextjs app
pnpm run dev
# Visit http://localhost:3000 in browser
```

Open another terminal to run the backend. Leave the frontend running.

```bash
# Go to backend directory
cd rogers-homemade-ice-cream/backend/database/
# Run postgres setup script
sudo -u postgres psql -f setup.sql
# Go to api directory
cd ../api
# Setup python virtual environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Run fastapi
fastapi dev src/main.py
# You can view interface at http://127.0.0.1:8000/docs/
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

* [ ] Backend API routes for managing database
* [ ] Load content from database
* [ ] Admin portal
  * [ ] Authentication
  * [ ] Managing flavors
* [ ] In-store screen menus

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

To keep everyone's code safe, we use a branch-and-pull-request workflow. Please follow these steps every time you contribute.

---

### 1. Create your own branch

Never commit directly to `main`. Create a branch named after yourself or the feature you're working on:

```bash
git checkout -b your-name/feature-description
# Example: git checkout -b alex/login-page
```

### 2. Make your changes

Work only on your branch. Commit often with clear messages:

```bash
git add .
git commit -m "Add login form with validation"
```

### 3. Push your branch to GitHub

```bash
git pull origin main
git push origin your-name/feature-description
```

### 4. Open a Pull Request and Merge

1. Go to the repository on GitHub.
2. Click **Compare & pull request** next to your branch.
3. Merge your pull request if there are no conflicts.

### Top contributors

<a href="https://github.com/babikerb/rogers-homemade-ice-cream/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=babikerb/rogers-homemade-ice-cream" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/babikerb/rogers-homemade-ice-cream.svg?style=for-the-badge
[contributors-url]: https://github.com/babikerb/rogers-homemade-ice-cream/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/babikerb/rogers-homemade-ice-cream.svg?style=for-the-badge
[issues-url]: https://github.com/babikerb/rogers-homemade-ice-cream/issues
[product-screenshot]: images/screenshot.png
