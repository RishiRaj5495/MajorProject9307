# StayFinder -- Airbnb-Inspired Full Stack Rental Platform 🏠

An Airbnb-inspired full-stack rental platform — browse properties, host your own, and explore locations on an interactive map.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-GL-000000?logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

> 🔗 [Live Demo](https://github.com/RishiRaj5495/MajorProject9307)

---

## Tech Stack

`Node.js` · `Express.js` · `MongoDB` · `Mongoose` · `Passport.js` · `Mapbox GL JS` · `Cloudinary` · `Multer` · `EJS` · `Bootstrap 5`

---

## Features

- 🗂 **Listings** — full CRUD with multi-image upload via Cloudinary
- 🗺 **Maps** — geo-spatial search and cluster map powered by Mapbox GL JS
- 🔐 **Auth** — register, login, sessions, and role-based authorization guards
- ⭐ **Reviews** — star ratings with normalized MongoDB schemas
- ✅ **Validation** — server-side Joi schemas and flash messages on every form

---

## Quick Start

```bash
git clone https://github.com/yourusername/stayfinder.git
cd stayfinder
npm install
cp .env.example .env        # add your keys (see below)
node app.js          # optional — loads sample listings
npm start                    # http://localhost:3000
```

**Required `.env` keys:**

```env
MONGODB_URI=your_mongo_connection_string
SECRET=any_long_random_string
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
MAPBOX_TOKEN=...
```

---

## Project Structure

```
├── app.js              # Entry point
├── controllers/        # Route logic
├── models/             # Mongoose schemas
├── routes/             # Express routers
├── middleware/         # Auth guards + validation
├── views/              # EJS templates
└── public/             # CSS, JS, static assets
```

---

## What I Built & Learned

- Structured Express routers with clean MVC separation — controllers handle logic, routes stay thin
- Built custom authorization middleware that blocks users from editing or deleting content they don't own
- Integrated Mapbox Geocoding API to convert listing addresses into coordinates stored as GeoJSON
- Piped file uploads through Multer directly to Cloudinary — no files ever written to the server disk
- Designed normalized Mongoose schemas with `populate()` to link listings, reviews, and users cleanly





