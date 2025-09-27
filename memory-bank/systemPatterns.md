# System Patterns

## System Architecture

The system architecture is a comprehensive static website built for Cloudflare Pages deployment, consisting of:

- **Core Pages:** Index page with hero section, timeline popup, and main navigation
- **Content Sections:**
  - History pages (1948-2023 timeline events)
  - Movement pages (Women, Youth, Labor)
  - Massacre documentation pages
  - Education resources (Teacher/Student kits with print CSS)
  - Diaspora hub with regional data
  - Legal library with search and filters
  - Countries section with individual profiles
  - Boycott lists (supporting/supportive companies)
  - Journalists directory
  - Abductions data visualization
- **Advocacy Tools:**
  - Letter/Email Builder with mailto functionality and localStorage persistence
  - Phone Call Scripts with filtering and one-click copy functionality
  - Embassy/Consulate Directory with country/city filters and contact information
  - Share Card Generator with Canvas-based image creation and multiple themes
  - Supporter Badge/Embed with three badge variants and copy-to-clipboard codes
  - Protest/Event Finder: REMOVED - Would require ongoing maintenance
- **Navigation & Discovery:**
  - Redesigned navigation with 5 logical categories (History, Learn, Take Action, Community, More)
  - Advanced search system with content filtering and real-time results
  - Comprehensive site map with 50+ pages overview and statistics
  - Mobile-responsive navigation with matching desktop structure
- **Diaspora Data System:**
  - Complete global diaspora coverage with 29 communities across 7 regions
  - Europe: 6 communities (UK, Germany, France, Sweden, Netherlands, Denmark)
  - North America: 7 communities (USA: Chicago, Dearborn, LA, NYC; Canada: Toronto, Montreal, Vancouver)
  - South America: 6 communities (Chile, Brazil, Argentina, Colombia, Peru, Ecuador)
  - Middle East: 6 communities (Jordan, Lebanon, Syria, Egypt, Kuwait, UAE)
  - Africa: 6 communities (South Africa, Kenya, Tanzania, Uganda, Ghana, Nigeria)
  - Asia: 6 communities (Malaysia, Indonesia, Pakistan, Bangladesh, Japan, South Korea)
  - Oceania: 4 communities (Australia: Sydney, Melbourne; New Zealand: Auckland, Wellington)
- **Shared Components:** Common navigation/footer loaded via JavaScript fetch
- **Data Layer:** JSON files for all dynamic content
- **Search System:** Fuse.js-powered search with pre-built index

## Key Technical Decisions

- **Static Site Architecture:** All content pre-generated, no server-side processing required
- **Component-Based Navigation:** Shared nav/footer loaded dynamically across all pages
- **JSON Data Storage:** All content data stored in structured JSON files for easy maintenance
- **Client-Side Rendering:** JavaScript renders content from JSON data for dynamic updates
- **Modular CSS:** Separate stylesheets for different sections with shared base styles
- **Search-First Design:** Comprehensive search index covering all content types

## Design Patterns in Use

- **Shared Component Pattern:** Navigation and footer loaded dynamically across all pages
- **Data-Driven Rendering:** Content rendered from JSON using dedicated renderer functions
- **Filter/Search Pattern:** Consistent filtering and search across data-heavy sections
- **Timeline Pattern:** Interactive timeline with popup details and deep-linking
- **Card-Based Layout:** Consistent card layouts for countries, movements, journalists, and call scripts
- **Responsive Grid System:** Flexible grids that adapt to different screen sizes
- **Print-Optimized Content:** Dedicated print styles for educational materials
- **Tag System Pattern:** Color-coded tags for categorization (countries, topics, recipients in call scripts)
- **Action Button Pattern:** Consistent styling for interactive buttons with gradient hover effects
- **Feedback Animation Pattern:** Slide-in/out animations for user feedback messages

## Component Relationships

- **Navigation System:** Central nav component loads on all pages, contains dropdown menus for all sections
- **Data Flow:** JSON data → JavaScript renderer → HTML content insertion
- **Search Integration:** Centralized search index powers site-wide search functionality
- **Cross-Linking:** All sections interconnected through navigation and search
- **Shared Assets:** Common CSS/JS files loaded across multiple pages for consistency

## Critical Implementation Paths

- **Navigation Loading:** Fetch commonNavFooter.html and inject into all pages
- **Data Rendering:** Load JSON data and render content dynamically (countries, movements, journalists, etc.)
- **Search Functionality:** Fuse.js search across pre-built index with routing to appropriate pages
- **Timeline Interaction:** Timeline popup with links to detailed history pages
- **Responsive Design:** Mobile-first approach with progressive enhancement
- **Print Optimization:** Print-specific CSS for educational materials
