# Tech Context

## Technologies Used

- **HTML5:** Semantic markup for all pages and content structure
- **CSS3:** Modular stylesheets with responsive design, print optimization, animations, and consistent theming
- **Vanilla JavaScript (ES6+):** Client-side rendering, data fetching, interactive components, DOM manipulation, Canvas API for image generation, geolocation API, clipboard API, advanced search algorithms, real-time filtering, diaspora data rendering, comprehensive search indexing
- **JSON:** Data storage for countries, movements, journalists, boycotts, call scripts, and other dynamic content
- **Fuse.js:** Fuzzy search library for site-wide search functionality
- **Chart.js:** Data visualization for abductions statistics and charts
- **Font Awesome:** Icon library for UI elements and navigation
- **CSS Grid & Flexbox:** Advanced layout systems for responsive card grids and component alignment
- **CSS Animations:** Keyframe animations for interactive feedback and hover effects

## Development Setup

- **VSCode:** Primary IDE with extensions for HTML, CSS, JavaScript, and JSON
- **Git:** Version control with GitHub repository for collaboration
- **Browser DevTools:** Chrome/Firefox developer tools for debugging and testing
- **Local Server:** Simple HTTP server for local development testing

## Technical Constraints

- **Static Site Hosting:** All content must be pre-generated, no server-side processing
- **Cloudflare Pages Limitations:** No backend databases, limited to static assets
- **Performance Optimization:** Large images compressed, efficient loading strategies
- **Cross-Browser Compatibility:** Support for modern browsers with progressive enhancement
- **Mobile-First Design:** Responsive design that works on all device sizes

## Dependencies

- **Client-Side Libraries:**
  - Fuse.js (CDN): Fuzzy search functionality
  - Chart.js (CDN): Data visualization
  - Font Awesome (CDN): Icons and UI elements
- **Build Tools:**
  - Node.js (optional): For running build scripts to generate search index
  - Git: Version control and deployment

## Tool Usage Patterns

- **VSCode:** Primary development environment with live preview and debugging
- **Browser Testing:** Cross-browser testing with developer tools for responsive design
- **Git Workflow:** Feature branches, pull requests, and automated deployment via Cloudflare
- **Performance Monitoring:** Lighthouse audits for performance, accessibility, and SEO
- **Content Management:** JSON files for data updates, manual HTML for static content

## Deployment

- **Cloudflare Pages:** Automated deployment from GitHub repository
- **Build Process:** Static file hosting with no build step required
- **CDN:** Global content delivery for fast loading worldwide
- **HTTPS:** Automatic SSL certificate management
- **Analytics:** Cloudflare Web Analytics for usage tracking

## Content Management Strategy

- **JSON Data Files:** All dynamic content stored in structured JSON for easy updates
- **Modular HTML:** Reusable components loaded via JavaScript fetch
- **Search Index:** Pre-built search index updated with content changes
- **Version Control:** All changes tracked in Git with meaningful commit messages
- **Backup Strategy:** GitHub repository serves as primary backup and collaboration platform
