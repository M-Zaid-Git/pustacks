# ZESHO Website Design System Documentation

## Overview

ZESHO is a modern, clean educational resource sharing platform designed for academic institutions. The visual identity combines a professional academic look with contemporary web design principles, featuring a gradient-rich color scheme, minimalist UI components, and a responsive layout that works across all device sizes.

## Color Palette

### Primary Colors

- **Primary Purple**: `#6366F1` (rgb: 99, 102, 241) - Used for primary buttons, focus states, and important UI elements
- **Secondary Indigo**: `#4F46E5` (rgb: 79, 70, 229) - Used for secondary actions and hover states
- **Accent Blue**: `#3B82F6` (rgb: 59, 130, 246) - Used for highlights and tertiary elements

### Gradient Combinations

- **Primary Gradient**: Linear gradient from `#6366F1` to `#4F46E5`, 135 degrees - Used for CTA buttons and feature sections
- **Accent Gradient**: Linear gradient from `#8B5CF6` (violet) to `#3B82F6` (blue), 135 degrees - Used for decorative elements
- **Mixed Gradient**: Linear gradient from `#EC4899` (pink) to `#8B5CF6` (violet) to `#3B82F6` (blue), 135 degrees - Used for logo and special UI elements

### Neutral Colors

- **White**: `#FFFFFF` - Background in light mode, text in dark mode
- **Light Gray**: `#F9FAFB` (rgb: 249, 250, 251) - Secondary background in light mode
- **Medium Gray**: `#E5E7EB` (rgb: 229, 231, 235) - Borders in light mode
- **Dark Gray**: `#4B5563` (rgb: 75, 85, 99) - Body text in light mode
- **Darker Gray**: `#1F2937` (rgb: 31, 41, 55) - Headings in light mode
- **Almost Black**: `#111827` (rgb: 17, 24, 39) - Text in light mode, secondary background in dark mode
- **Dark Slate**: `#0F172A` (rgb: 15, 23, 42) - Background in dark mode

### Semantic Colors

- **Success Green**: `#10B981` (rgb: 16, 185, 129) - Success states and indicators
- **Warning Yellow**: `#F59E0B` (rgb: 245, 158, 11) - Warning states and notifications
- **Error Red**: `#EF4444` (rgb: 239, 68, 68) - Error states and critical alerts
- **Info Blue**: `#3B82F6` (rgb: 59, 130, 246) - Informational messages

## Typography

### Font Families

- **Primary Headings**: "Monument Extended", sans-serif
  - Used for main headings (h1, h2) and logo
  - Weights: Regular (400), Ultrabold (800)
- **Secondary Headings**: "Comfortaa", sans-serif
  - Used for subheadings (h3, h4) and section titles
  - Weights: Regular (400), Medium (500), Semi-Bold (600), Bold (700)
- **Body Text**: "Plus Jakarta Sans", sans-serif
  - Used for all body text, paragraphs, and smaller UI elements
  - Weights: Regular (400), Medium (500), Semi-Bold (600), Bold (700)

### Font Sizes

- **Hero Heading**: 3rem (48px) on desktop, 2.25rem (36px) on mobile
- **Section Headings**: 2rem (32px) on desktop, 1.5rem (24px) on mobile
- **Subheadings**: 1.5rem (24px) on desktop, 1.25rem (20px) on mobile
- **Body Text**: 1rem (16px)
- **Small Text**: 0.875rem (14px)
- **Extra Small**: 0.75rem (12px)

### Line Heights

- **Headings**: 1.2
- **Subheadings**: 1.3
- **Body Text**: 1.6
- **Button Text**: 1.2

### Text Styles

- **Headings**: Ultrabold weight, uppercase for main hero heading
- **Subheadings**: Medium to Bold weight
- **Body Text**: Regular weight
- **Buttons**: Medium or Semi-Bold weight, sometimes uppercase
- **Links**: Semi-Bold weight, underlined on hover

## UI Components

### Buttons

#### Primary Button

- Background: Primary gradient
- Text: White
- Border: None
- Padding: 0.75rem 1.5rem (12px 24px)
- Border Radius: 0.5rem (8px)
- Shadow: `0 4px 6px rgba(99, 102, 241, 0.25)`
- Hover: 10% darker gradient, scale up by 1.02
- Active: 15% darker gradient, scale down by 0.98
- Transition: All 200ms ease

#### Secondary Button

- Background: Transparent
- Text: Primary Purple
- Border: 1px solid Primary Purple
- Padding: 0.75rem 1.5rem (12px 24px)
- Border Radius: 0.5rem (8px)
- Hover: 10% Primary Purple background
- Active: 15% Primary Purple background
- Transition: All 200ms ease

#### Tertiary/Ghost Button

- Background: Transparent
- Text: Dark Gray or White (based on mode)
- Border: None
- Padding: 0.5rem 1rem (8px 16px)
- Hover: 5% Primary Purple background
- Active: 10% Primary Purple background
- Transition: All 200ms ease

### Cards

#### Material Card

- Background: White (light mode) or Dark Slate (dark mode)
- Border: 1px solid Medium Gray (light mode) or 1px solid rgba(255, 255, 255, 0.1) (dark mode)
- Border Radius: 0.75rem (12px)
- Padding: 1.25rem (20px)
- Shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)`
- Hover Effect: Scale up by 1.02, increase shadow depth
- Transition: All 300ms ease-in-out

#### Category Card

- Background: Mostly transparent with 5% primary color overlay
- Border: 1px solid Medium Gray (light mode) or 1px solid rgba(255, 255, 255, 0.1) (dark mode)
- Border Radius: 1rem (16px)
- Padding: 1.5rem (24px)
- Background Image: Subtle pattern overlay
- Shadow: `0 4px 6px rgba(0, 0, 0, 0.05)`
- Hover Effect: Scale up by 1.03, add primary color glow
- Transition: All 300ms ease-in-out

### Navigation

#### Main Navigation

- Background: White/Transparent (light mode) or Dark Slate with 80% opacity (dark mode)
- Height: 4rem (64px)
- Border Bottom: 1px solid Medium Gray (light mode) or 1px solid rgba(255, 255, 255, 0.1) (dark mode)
- Backdrop Filter: `blur(10px)` for a frosted glass effect
- Shadow: `0 4px 6px rgba(0, 0, 0, 0.05)`
- Position: Fixed at top

#### Mobile Menu

- Background: White (light mode) or Dark Slate (dark mode)
- Animation: Slide in from right
- Transition: Transform 300ms ease-in-out
- Overlay Background: Black with 50% opacity
- Menu Item Spacing: 1.25rem (20px) between items
- Close Button: Position top right, 1rem (16px) margin

### Form Elements

#### Input Fields

- Border: 1px solid Medium Gray (light mode) or 1px solid rgba(255, 255, 255, 0.2) (dark mode)
- Border Radius: 0.5rem (8px)
- Height: 2.75rem (44px)
- Padding: 0 1rem (0 16px)
- Focus State: Border color changes to Primary Purple, subtle glow effect
- Background: White (light mode) or rgba(255, 255, 255, 0.05) (dark mode)
- Placeholder Text: Medium Gray, 0.875rem (14px)

#### Search Bar

- Background: Light Gray (light mode) or rgba(255, 255, 255, 0.05) (dark mode)
- Border: None
- Border Radius: 9999px (pill shape)
- Height: 2.75rem (44px)
- Padding: 0 1.25rem (0 20px)
- Icon: Search icon in Medium Gray
- Shadow: `0 1px 2px rgba(0, 0, 0, 0.05)`

### Loader and Animations

#### Main Loader

- Animation: Circular loading animation with gradient colors
- Size: 3rem (48px)
- Colors: Uses the primary gradient
- Duration: 1.5 seconds per rotation
- Easing: Ease-in-out

#### Progress Bar

- Height: 4px
- Background: Medium Gray
- Fill: Primary Gradient
- Border Radius: 2px
- Animation: Width from 0% to 100% with cubic-bezier easing

#### Microinteractions

- Buttons: Subtle scale and color change on hover/active states
- Cards: Gentle lift effect on hover
- Form Fields: Subtle glow on focus
- Menu Items: Left border appears on hover

## Layout

### Grid System

- 12-column grid
- Maximum width: 1280px
- Gutter width: 1.5rem (24px)
- Container padding: 1rem (16px) on mobile, 2rem (32px) on desktop

### Breakpoints

- Mobile: 0-639px
- Tablet: 640px-1023px
- Desktop: 1024px+
- Large Desktop: 1280px+

### Section Spacing

- Default vertical padding: 4rem (64px) on desktop, 2.5rem (40px) on mobile
- Between components: 1.5rem (24px) on desktop, 1rem (16px) on mobile
- Section margins: 0 auto (centered)

## Iconography

### Style

- Line style icons with 2px stroke
- Rounded corners
- Size: 24px by default
- Color: Same as text color

### Key Icons

- Search: Magnifying glass icon
- User: User profile icon
- Bookmark: Bookmark icon (filled when active)
- Download: Download arrow icon
- Upload: Upload arrow icon
- Categories: Grid or folder icon
- Back to Top: Arrow up icon
- Menu (Mobile): Hamburger icon (three lines)
- Close: X icon
- Dark Mode Toggle: Moon/Sun icon

## Special Design Elements

### Background Blobs

- Abstract, organic shapes in primary colors with low opacity
- Positioned behind content for visual interest
- Subtle animation: slow rotation or pulsing
- Z-index below main content

### Card Patterns

- Subtle dot grid or line patterns
- Very low opacity (5-10%)
- Used to add texture to card backgrounds

### Decorative Elements

- Accent lines: 2px gradient lines to separate sections
- Circle decorations: Small gradient circles used as bullets or decorations
- Underlines: Gradient underlines under important headings

### Dark Mode Specifics

- Background changes to Dark Slate
- Text changes to White or Light Gray
- Card backgrounds change to slightly lighter than the main background
- Reduced shadow intensity
- Slightly increased contrast for better readability

## Responsive Behavior

### Mobile Adaptations

- Single column layout
- Larger touch targets (min 44px)
- Simplified navigation with hamburger menu
- Reduced padding and margins
- Stacked cards instead of grid layout

### Tablet Adaptations

- Two-column card grid
- Condensed navigation
- Slightly reduced font sizes

### Desktop Adaptations

- Three or four-column card grid
- Full horizontal navigation
- Larger hero sections
- More generous spacing

## Page-Specific Design Elements

### Landing Page

- Hero Section:

  - Full-width gradient background
  - Large heading with gradient text effect
  - Animated underline below the heading
  - Floating UI elements with subtle animations
  - Height: 85vh on desktop, auto on mobile

- Features Section:

  - Three-column layout on desktop
  - Icon + heading + description pattern
  - Cards with hover effects
  - Background: Light Gray

- Categories Section:
  - Grid of category cards with images
  - Hover effect: scale up + glow
  - Background: White with subtle blob decorations

### Materials Page

- Header:

  - Category title with gradient underline
  - Category description
  - Filter and sort options on the right

- Materials Grid:
  - Cards with consistent height
  - Title, description, metadata display
  - Bookmark and download icons
  - Pagination or infinite scroll at bottom

### PDF Viewer

- Toolbar:

  - Dark background
  - White icons and text
  - Download, bookmark, and zoom controls
  - Back button in top left

- PDF Display:
  - White background in light mode
  - Very subtle gray in dark mode
  - Page navigation at bottom
  - Loading progress indicator

### Login/Signup Pages

- Split layout on desktop:
  - 50% form on the left
  - 50% image or gradient background on right
- Full-width layout on mobile
- Form elements align left
- Validation messages appear below fields
- Social login options with icons
- Remember me checkbox and forgot password link

## Animation and Motion

### Page Transitions

- Fade in: 300ms ease-in
- Slight upward motion: 20px
- Elements stagger in from bottom: 100ms delay between items

### Hover States

- Scale: 1.02-1.05x
- Color shifts: Subtle brightening
- Shadow increases
- Duration: 200-300ms
- Easing: ease-in-out

### Loading States

- Skeleton screens with pulse animation
- Progress bars with gradient fill
- Spinner with gradient stroke
- Duration: 1.5s per cycle

## Accessibility Features

### Color Contrast

- Text meets WCAG AA standards minimum
- Important text meets WCAG AAA standards
- Interactive elements have distinct focus states

### Focus Indicators

- Keyboard focus: 2px Primary Purple outline
- 2px offset from element
- Border radius matches the element

### Dark Mode

- True dark mode (not just inverted colors)
- Reduced brightness and blue light
- Enhanced contrast where needed

## Assets and Image Styles

### Icons

- Style: Line icons with 2px stroke width
- Format: SVG for scalability
- Size: Based on 24px grid

### Images

- Hero Images: Abstract, education-themed imagery
- Category Images: Simple symbolic representations
- Material Thumbnails: Document-like preview
- User Avatars: Circular, 1:1 aspect ratio
- Format: WebP preferred, fallback to optimized JPEG/PNG
- Style: Subtle duotone effect using brand colors

## Brand Identity Elements

### Logo

- Text "ZESHO" in Monument Extended
- Gradient text fill with primary colors
- Optional subtle glow effect
- Minimum clear space: Equal to "Z" height around all sides

### Brand Patterns

- Dot grid: Small dots arranged in grid pattern
- Wave pattern: Subtle curved lines
- Used sparingly as background texture

### Custom Cursors

- Default: Standard cursor
- Links: Pointer
- Interactive elements: Pointer

This comprehensive design system covers all visual aspects of the ZESHO educational resource sharing platform. The design combines professional academic sensibilities with modern web aesthetics to create a platform that feels trustworthy, easy to use, and visually appealing.
