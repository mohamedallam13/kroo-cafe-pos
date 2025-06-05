# KROO Simple Cashier

A modern, web-based Point of Sale (POS) system built with Google Apps Script, designed for cafes and small businesses. This system provides a clean, intuitive interface for managing sales, inventory, and transactions.

## Features

- 🛍️ Modern, responsive user interface
- 📱 Mobile-friendly design
- 🏷️ Category-based product organization
- 🛒 Real-time order management
- 📊 Basic sales tracking

## Technical Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Google Apps Script
- Storage: Google Sheets
- Authentication: Google OAuth

## Project Structure

```
├── POS.html              # Main POS interface
├── POS-Functioning.html  # Enhanced POS functionality
├── server/
│   ├── Server.js        # Main server logic
│   ├── Backend.js       # Backend operations
│   ├── Helpers.js       # Utility functions
│   ├── Middleware.js    # Request middleware
│   └── env.js           # Environment configuration
└── appsscript.json      # Apps Script manifest
```

## Setup

1. Clone this repository
2. Install the Google Apps Script CLI (clasp):
   ```bash
   npm install -g @google/clasp
   ```
3. Login to clasp:
   ```bash
   clasp login
   ```
4. Pull the project:
   ```bash
   clasp pull
   ```

## Development

To make changes to the project:

1. Edit the files locally
2. Push changes using:
   ```bash
   clasp push
   ```

## Deployment

The project is deployed as a Google Apps Script web app. To deploy:

1. Open the project in the Google Apps Script editor
2. Click "Deploy" > "New deployment"
3. Choose "Web app" as the deployment type
4. Configure the deployment settings
5. Deploy and authorize the application

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Support

For support and inquiries, please contact the development team. 