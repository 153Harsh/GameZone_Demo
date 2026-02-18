# Task: Build Game Zone Cafe Website

## Plan
- [x] Setup Theme and Design Tokens
  - [x] Update `index.css` with neon color variables and custom utilities
  - [x] Update `tailwind.config.js` with semantic tokens and custom colors
- [x] Build Core Components
  - [x] `Navbar`: Navigation with glass effect
  - [x] `HeroSection`: Impactful entry with CTA
  - [x] `GameTypes`: Display PS5, PC, VR, etc.
  - [x] `PricingTable`: Simple and clear rates
  - [x] `BookingForm`: Interactive booking flow
  - [x] `Gallery`: Cafe atmosphere showcase
  - [x] `Reviews`: Customer testimonials
  - [x] `LocationInfo`: Google Maps and contact details
- [x] Main Page Assembly
  - [x] Create `Home.tsx` and integrate all sections
  - [x] Update `routes.tsx` to set Home as the default route
- [x] Advanced Features (Database & Admin)
  - [x] Supabase Initialization & Table Schema
  - [x] Auth Implementation (Login/SignUp with username)
  - [x] Peak Pricing Logic (Weekend multiplier)
  - [x] Slot Auto Lock (Dynamic availability check)
  - [x] Admin Dashboard (Manage pricing, view bookings, block slots)
  - [x] Hour Selection Feature (1-8 hours with dynamic pricing)
- [x] Final Polish
  - [x] Add smooth scrolling and animations
  - [x] Ensure mobile responsiveness
  - [x] Run lint and fix issues

## Notes
- Theme: Dark background with Neon Purple (#a855f7) and Neon Cyan (#06b6d4) accents.
- Admin credentials: First registered user becomes admin automatically.
- Hour selection: Users can select 1-8 hours with automatic price calculation including weekend multipliers.
- Booking flow: Date → Time → Console → Hours → Details → Confirmation
