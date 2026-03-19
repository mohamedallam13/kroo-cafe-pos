# KROO Simple Cashier — Cafe POS

A web-based Point of Sale (POS) system for KROO Cafe built on Google Apps Script. Provides a category-based product grid, real-time cart management, and Google Sheets–backed order tracking.

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-WebApp-blue)
![Status](https://img.shields.io/badge/Status-Production-green)

---

## Features

- Category-based product grid for fast item selection
- Real-time cart with quantity management and order totals
- Order submission written directly to Google Sheets
- Email confirmation on order completion
- Mobile-friendly, responsive layout

---

## Tech Stack

| Layer    | Technology                      |
|----------|---------------------------------|
| Platform | Google Apps Script              |
| UI       | HTML5, CSS3, Vanilla JavaScript |
| Database | Google Sheets                   |
| Deploy   | clasp CLI                       |

---

## Project Structure

```
kroo-cafe-pos/
├── README.md
├── AGENT.md
├── .gitignore
└── src/
    ├── env.js                       # Sheet IDs and config
    ├── Backend.js                   # Data access layer (Sheets read/write)
    ├── Helpers.js                   # Pure utility functions
    ├── Middleware.js                # Server-side routing
    ├── Server.js                    # doGet() / doPost() entry points
    ├── Email Login Confirmation.js  # Email helper
    ├── POS.html                     # Main POS UI shell
    └── POS-Functioning.html         # POS client-side logic
```

---

## Getting Started

### Prerequisites

- A Google account with Google Apps Script access
- [clasp](https://github.com/google/clasp) installed globally

```bash
npm install -g @google/clasp
clasp login
```

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedallam13/kroo-cafe-pos.git
   cd kroo-cafe-pos
   ```

2. Link to your Apps Script project:
   ```bash
   clasp create --type webapp --title "KROO Cafe POS" --rootDir src
   ```

3. Push source files:
   ```bash
   clasp push
   ```

4. Set the Sheet ID in `env.js`.

---

## Deployment

1. In the Apps Script editor, go to **Deploy > New deployment**
2. Select type: **Web app**
3. Set **Execute as**: Me · **Who has access**: Anyone
4. Click **Deploy** and share the Web App URL with staff

---

## Author

**Mohamed Allam** — [GitHub](https://github.com/mohamedallam13) · [Email](mailto:mohamedallam.tu@gmail.com)
