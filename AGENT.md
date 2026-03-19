# AGENT.md — kroo-cafe-pos

## Purpose
A web-based Point of Sale (POS) system for KROO Cafe, built on Google Apps Script. Provides a category-based product grid, real-time order management, and sales tracking.

## Structure
```
kroo-cafe-pos/
├── README.md
├── AGENT.md
├── .gitignore
└── src/
    ├── env.js                        ← Sheet IDs / config
    ├── Backend.js                    ← data access layer (Sheets read/write)
    ├── Helpers.js                    ← pure utility functions
    ├── Middleware.js                 ← server-side routing
    ├── Server.js                     ← doGet() / doPost() entry points
    ├── Email Login Confirmation.js   ← email confirmation helper
    ├── POS.html                      ← main POS UI shell
    └── POS-Functioning.html          ← POS logic / client-side JS
```

## Key Facts
- **Platform:** Google Apps Script WebApp
- **Data store:** Google Sheets (IDs in `env.js`)
- **Features:** Category navigation, cart management, order processing, basic sales tracking
- **Entry point:** `Server.js` → `doGet()` / `doPost()`
- **No `appsscript.json` in repo** — deploy via Apps Script editor or clasp separately

## Development Notes
- All source files live under `src/` — push with clasp from that directory
- No Node/npm at runtime; ES5-compatible GAS code only
- Sheet IDs and secrets live in `env.js` (not committed with real values)
