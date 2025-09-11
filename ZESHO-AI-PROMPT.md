# ZESHO Website AI Clone Prompt

## Website Overview

Create a modern educational resource sharing platform called "ZESHO". The website allows students and educators to share, download, and organize academic materials. The design is clean, professional, and incorporates vibrant gradients with a strong focus on user experience.

## Design Style

The website follows a contemporary minimalist aesthetic with gradient accents, floating card UI, and subtle animations. It features both light and dark modes with appropriate color transformations. The typography is clean and hierarchical, using a combination of Monument Extended for headings and Plus Jakarta Sans for body text.

## Color Scheme

- **Primary Colors**: Purple (#6366F1), Indigo (#4F46E5), Blue (#3B82F6)
- **Gradients**:
  - Primary: Linear gradient from #6366F1 to #4F46E5 (135 degrees)
  - Accent: Linear gradient from #8B5CF6 to #3B82F6 (135 degrees)
  - Logo: Linear gradient from #EC4899 to #8B5CF6 to #3B82F6 (135 degrees)
- **Neutrals**:
  - Light Mode: White background (#FFFFFF), Light Gray secondary (#F9FAFB), Dark Gray text (#4B5563)
  - Dark Mode: Dark Slate background (#0F172A), Darker Gray secondary (#1F2937), White text (#FFFFFF)
- **Semantic Colors**: Success Green (#10B981), Warning Yellow (#F59E0B), Error Red (#EF4444), Info Blue (#3B82F6)

## Typography

- **Headings**: Monument Extended (400, 800 weights)
- **Subheadings**: Comfortaa (400, 500, 600, 700 weights)
- **Body**: Plus Jakarta Sans (400, 500, 600, 700 weights)
- **Size Scale**:
  - Hero: 3rem/48px (desktop), 2.25rem/36px (mobile)
  - Headings: 2rem/32px (desktop), 1.5rem/24px (mobile)
  - Body: 1rem/16px
  - Small: 0.875rem/14px

## Component Library

### Navigation

- Fixed top navigation bar with frosted glass effect (blur backdrop filter)
- Logo on left, navigation links center, user profile/actions right
- Mobile: Hamburger menu that slides in from right
- Navigation items have subtle hover effects with gradient underline
- Active page indicated by gradient underline or subtle background

### Buttons

- **Primary**: Gradient background, white text, 8px radius, subtle shadow
- **Secondary**: Transparent with colored border, 8px radius
- **Tertiary**: Text only with hover background
- All buttons have subtle scale animations on hover (1.02x)

### Cards

- Material cards: White background (dark mode: dark slate), 12px radius, subtle shadow
- Hover: Scale up effect (1.02x) with enhanced shadow
- Category cards: Semi-transparent with 5% color overlay, 16px radius
- Cards contain: Image/icon, title, description, metadata, action buttons

### Form Elements

- Clean inputs with 8px radius, 44px height
- Focus state: Colored border with subtle glow
- Search bar: Pill-shaped with icon
- Dropdowns: Custom styling with smooth animations
- Checkboxes and radio buttons: Custom-styled with brand colors

### Special Elements

- **Background blobs**: Abstract organic shapes in brand colors (very low opacity)
- **Decorative accents**: Gradient lines and dots used sparingly
- **Loading states**: Gradient-colored spinners and progress bars
- **Empty states**: Friendly illustrations with helpful text

## Pages to Create

### Landing Page

- Hero section with large text, animated underline, and floating UI elements
- Feature highlights section with 3-column grid
- Categories section with card grid
- Call to action section
- Brief statistics or testimonials

### Materials Browse Page

- Filter sidebar/dropdown
- Search functionality
- Grid of material cards
- Sorting options
- Pagination or infinite scroll

### Material Detail Page

- PDF viewer with toolbar
- Material metadata
- Related materials
- Download and bookmark options

### Authentication Pages

- Login form with social options
- Sign up form with validation
- Forgot password flow
- Clean, split layout (form on left, image/gradient on right)

### Dashboard

- User profile section
- Tabs for: Uploads, Downloads, Bookmarks
- Upload form with drag-and-drop
- Settings and preferences

## Interaction Details

- Smooth page transitions (fade + slight upward motion)
- Button hover/click animations
- Card hover effects (scale + enhanced shadow)
- Subtle loading animations
- Form validation feedback (gentle shake for errors)
- Toast notifications for actions (bookmark added, download complete)
- Dark/light mode toggle with smooth transition

## Responsive Behavior

- Mobile-first approach
- Single column on mobile
- 2-column on tablet
- 3-4 column grid on desktop
- Appropriate padding changes (16px mobile, 24px+ desktop)
- Touch-friendly tap targets on mobile (minimum 44px)
- Collapsed navigation on mobile (hamburger menu)

## Technical Notes

- Build with React.js
- Use Tailwind CSS for styling
- Include animations with CSS transitions/animations or Framer Motion
- Implement dark mode with CSS variables or Tailwind
- PDF rendering using React PDF viewer
- Responsive design using Flexbox/Grid

## Key Features to Include

- Dark/light mode toggle
- PDF viewing capability
- Category filtering
- Search functionality
- User authentication
- Material bookmarking
- Material downloading
- User dashboard
- Responsive design
- Smooth animations

## Accessibility Requirements

- Proper color contrast (WCAG AA minimum)
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Alt text for images
- Semantic HTML structure
- ARIA attributes where needed

The website should feel modern, trustworthy, and academically oriented while maintaining a contemporary design aesthetic. Focus on microinteractions and smooth transitions to create a polished user experience.
