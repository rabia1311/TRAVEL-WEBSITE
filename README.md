# Interactive Travel Website

An interactive travel website built with React.js, HTML, CSS, and JavaScript. This website allows users to explore travel destinations, read travel tips, view testimonials, and book their dream vacations.

## Features

- Responsive design that works on all devices
- Interactive destination filtering
- Travel tips and advice section
- Customer testimonials slider
- Multi-step booking form
- Newsletter subscription
- Modern and clean UI

## Components

1. **Navbar**: Responsive navigation with mobile menu
2. **Hero**: Main banner with search functionality
3. **Destinations**: Grid of travel destinations with category filtering
4. **TravelTips**: Interactive tabs with travel advice
5. **Testimonials**: Customer reviews slider
6. **BookingForm**: Multi-step form for trip booking
7. **Footer**: Site information and contact details

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome (for icons)
- Google Fonts

## Project Structure

```
travel-website/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   ├── Destinations.js
│   │   ├── Destinations.css
│   │   ├── TravelTips.js
│   │   ├── TravelTips.css
│   │   ├── Testimonials.js
│   │   ├── Testimonials.css
│   │   ├── BookingForm.js
│   │   ├── BookingForm.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Customization

- Change colors in `src/index.css` by modifying the CSS variables in the `:root` selector
- Update destination data in `src/components/Destinations.js`
- Modify testimonials in `src/components/Testimonials.js`
- Add or remove travel tips in `src/components/TravelTips.js`

## License

This project is licensed under the MIT License.