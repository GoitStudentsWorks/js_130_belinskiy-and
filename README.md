# Maria Kovalenko | Wedding Photographer Website ![Logo of our team](/src/img/logo.svg)

A commercial single-page web platform engineered for professional wedding
photographer Maria Kovalenko. The application serves as an interactive
portfolio, showcases service offerings, and handles client consultation requests
via a backend-connected booking workflow.

Built cooperatively by a 10-engineer team as an educational MVP.

The website helps:

- explore the services;
- view the photographer's portfolio;
- learn more about the photographer;
- find answers to frequently asked questions;
- read client reviews;
- contact the photographer to book a date.

## About project

### Design and layout

- **Figma:**
  [View design](https://www.figma.com/design/v2r2BIwJAfRSGJPkGlkGnA/%D0%92%D0%B5%D1%81%D1%96%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84?node-id=8202-52750&t=UctApWSlLgkkKNGP-0)

### Page Composition

| Section             | Description                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header**          | Site navigation bar paired                                                                                                                               |
| **Hero**            | Entry viewport featuring brand positioning and instant action conversion                                                                                 |
| **About**           | Photographic biography, core creative principles, and approach to wedding photojournalism, paired with a full-frame couple portrait                      |
| **Benefits**        | Overview of core client advantages (tailored packages, end-to-end full-day coverage, intimate mini-ceremonies) highlighted by vector micro-illustrations |
| **Feedbacks**       | Dynamic review slider displaying past client impressions                                                                                                 |
| **Portfolio**       | Media gallery featuring server-driven category filtering and load pagination.                                                                            |
| **FAQ**             | Frequently asked questions, featuring an accordion-style layout to expand the answers                                                                    |
| **Contact details** | Reliable data entry form for collecting information from the client.                                                                                     |
| **Footer**          | Bottom navigational index, social links                                                                                                                  |
| **Success Modal**   | Confirmation dialogue triggered upon successful dispatch of the intake form                                                                              |

## Techstack

## Engineering Stack

| Layer / Utility             | Applied Tool                                                             | Engineering Role                                                                   |
| --------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **Bundling & Server**       | Vite                                                                     | Project compilation, asset transformation, and HMR server                          |
| **Template Modularization** | `vite-plugin-html-inject`                                                | HTML component assembly (`<load src="...">`) to avoid monolithic files             |
| **CSS Post-Processing**     | `postcss-sort-media-queries`                                             | Automated mobile-first grouping and sorting of `@media` rules in production styles |
| **Code Uniformity**         | Prettier                                                                 | Automated syntax and markup formatting rules                                       |
| **Slider Engine**           | Swiper.js                                                                | Touch, gesture, and accessibility-compliant reviews carousel                       |
| **Accordion Component**     | Accordion-js                                                             | Smooth collapsible interaction for the FAQ directory                               |
| **User Notifications**      | iziToast                                                                 | Toast notifications for asynchronous API events and form feedback                  |
| **Network Client**          | Axios                                                                    | RESTful data retrieval and form payload submission                                 |
| **Web Typography**          | Google Fonts                                                             | Direct CDN integration for _Cormorant_ (headings) and _Mulish_ (interface text)    |
| **Icon Pipeline**           | [IcoMoon](https://icomoon.io/)                                           | Vector sprite generation (`icons/sprite.svg`) consumed through SVG symbols         |
| **Asset Optimization**      | [Cloudinary AVIF Compressor](https://cloudinary.com/tools/compress-avif) | Next-gen image compression and AVIF conversion for fast load performance           |

## Project structure

```
devcore-js-team-project/
├── src/ # Application source code
│    ├── css/ # Project stylesheets (base, components, and section-specific)
│    ├── img/ # Optimized visual assets (compressed AVIF/WebP images)
│    ├── js/ # Component scripts and app logic (modals, sliders, API calls)
│    ├── partials/ # Modular HTML component partials for each page section
│    ├── public/
│    ├── index.html # Main HTML layout file where website sections are imported using <load src="" />
│    ├── main.js # Main JavaScript entry module
├── .editorconfig
├── .gitignore
├── .prettierrc.json # Code formatting configuration for Prettier
├── .package-lock.json
├── .package.json
├── .README.md
├── .vite.config.js
```

## API

[Documentation](https://wedding-photographer.b.goit.study/api-docs/)

- `GET /categories` - get categories list.
- `GET /wedding-photos` - get WeddingPhotos list.
- `GET /feedbacks` - feedbacks list.
- `POST /orders` - create user`s order.

## Project run

To deploy this project run:

```
git clone https://github.com/belinskiy-and/devcore-js-team-project.git
```

```
cd devcore-js-team-project
```

```
npm i
```

```
npm run dev
```

After launching, open the address displayed in the terminal in your browser.

## Team

The website was developed by Team №5 as part of the JavaScript module project.

| Section           | Developer                                                       |
| ----------------- | --------------------------------------------------------------- |
| **Header**        | [Belinskiy Andrii](https://github.com/belinskiy-and)            |
| **Mobile menu**   | [Belinskiy Andrii](https://github.com/belinskiy-and)            |
| **Hero**          | [Hnylytska Svitlana](https://github.com/svitlana-hnylytska)     |
| **About**         | [Levkivskyi Oleksandr](https://github.com/Alex-Levkivskyi)      |
| **Benefits**      | [Lieunova Kateryna](https://github.com/leunovakate)             |
| **Feedbacks**     | [Khilchenko Tetiana](https://github.com/hilchenkoTatiana)       |
| **Portfolio**     | [Tulska Tetiana](https://github.com/ttulska-debug)              |
| **FAQ**           | [Vanina Taisiia](https://github.com/tayavanina)                 |
| **Contacts**      | [Komar Ostap](https://github.com/komar1811)                     |
| **Footer**        | [Rudakova Kateryna](https://github.com/EkaterinaRudakova930817) |
| **Success Modal** | [Vasichkin Andrii](https://github.com/Komrad71)                 |

![Logo of our team](/src/img/readme-content/team-logo.png)
