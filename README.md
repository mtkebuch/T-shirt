# TeeSpace — Clothing Shop

A vanilla JavaScript clothing e-commerce shop page. Products are rendered dynamically from a local data library and can be filtered, sorted, and browsed with pagination — no frameworks or build tools required.

---

## Features

### Product Listing
- Products rendered dynamically from a JavaScript data library (`library.js`)
- 16 products across 8 categories: T-Shirts, Hoodies, Pants, Jackets, Shoes, Socks, Hats, Accessories
- Grid and list view toggle
- Pagination (12 products per page)
- Product badges/watermarks: Hot, Sale!, New, -10%

### Filtering & Sorting
- Search by product name
- Filter by category (dynamically generated from product data)
- Filter by color (with color swatches and item counters)
- Filter by size (dynamically generated from product data)
- Custom dual-handle price range slider ($0–$200)
- Filter by stock status: In Stock / On Sale
- All filters reset related filters on selection to avoid conflicts

### Navigation
- Dropdown navigation menu (Home, TeeSpace, Shop, Blog, Pages)
- Wishlist (star) and cart icon popups in the header
- Item counters on star and cart icons

### Pricing Plans Page
- Accessible via Shop > Pricing Plans in the navigation
- Dynamically injected into the page without a full reload
- Toggle sliders for plan duration (3 months / Forever) and license type (Personal / Corporate)

### Footer
- Contact details, useful links, social media links
- Payment method logos
- Social icons: Twitter/X, Facebook, Instagram, YouTube

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS (two stylesheets: `styles.css`, `PricingPlansStyle.css`) |
| Logic | Vanilla JavaScript (ES Modules) |
| Font | Plus Jakarta Sans (self-hosted variable font) |
| No build tools, no frameworks, no dependencies |  |

---

## Project Structure

```
T-Shirt/
├── index.html                  # Main HTML page
├── styles.css                  # Main stylesheet
├── PricingPlansStyle.css        # Styles for the pricing plans view
├── app.js                      # Core product logic (filtering, sorting, pagination)
├── library.js                  # Product data (16 items)
├── dropdown.js                 # Navigation dropdowns, cart and wishlist popups
├── pricingPlansHTML.js         # Pricing plans HTML template
├── fonts/
│   └── Plus_Jakarta_Sans/      # Self-hosted variable font
└── images/
    └── icons/
        ├── clotheImages/       # Product images
        └── *.svg               # UI icons and logos
```

---

## Getting Started

No installation or build step required. Just open the file in a browser:

```bash
# Option 1 - Open directly
open index.html

# Option 2 - Serve locally (recommended to avoid ES module CORS issues)
npx serve .
# or
python -m http.server 8000
```

Then navigate to `http://localhost:8000` (or whichever port is used).

> Opening `index.html` directly via `file://` may block ES module imports in some browsers. Using a local server is recommended.

---

## Adding Products

Products are defined in `library.js`. To add a new item, append an object to the `library` array:

```javascript
{
    category: 'T-Shirts',
    name: 'My New Tee',
    sizes: [
        { size: 'S', price: 17.99 },
        { size: 'M', price: 19.99 }
    ],
    material: 'Cotton',
    stock: 50,
    colors: ['Black', 'White'],
    image: 'images/icons/clotheImages/myNewTee.png',
    watermarks: ['New']   // Optional: 'Hot', 'Sale!', 'New', '-10%'
}
```

Categories, colors, and sizes in the sidebar filters are all generated automatically from the data — no extra configuration needed.

---

## License

2022 TeeSpace. All rights reserved.
