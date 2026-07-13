# Mascula Cargo - Complete Landing Page & Contact Portal Plan

**Last Updated:** July 10, 2026  
**Document Version:** 2.0 - Fully Enhanced & Production-Ready  
**Project Status:** Design Complete | Development Phase

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Design Philosophy & Brand Identity](#design-philosophy)
3. [Technical Stack & Architecture](#technical-stack)
4. [Landing Page Structure](#landing-page-structure)
5. [Contact Page Structure](#contact-page-structure)
6. [Design System & Components](#design-system)
7. [Animation Specifications](#animation-specifications)
8. [Backend & Integration](#backend-integration)
9. [Performance & Accessibility](#performance-accessibility)
10. [Content Strategy](#content-strategy)
11. [Project Phases & Timeline](#project-phases)
12. [Appendix & References](#appendix)

---

## EXECUTIVE SUMMARY {#executive-summary}

**Project:** Mascula Cargo Landing Page & Contact Portal  
**Client:** Mascula Cargo - International Freight & Logistics Company  
**Objective:** Build a premium, conversion-focused digital presence that reflects the sophistication and reliability of a world-class logistics provider.

**Core Requirements:**
- Premium "Maritime Cinematic" design aesthetic (Apple/Linear/Stripe-level polish)
- Dark mode first, light mode support
- Fullscreen hero with crossfade slideshow + linear progress bar
- Premium infinite partner marquee animation
- Dual contact options: Quick message form + calendar booking
- Email-only backend (no database) via Resend API
- Mobile-first, fully responsive
- 60 FPS animations, WCAG AA compliant
- French primary language, English secondary

**Key Deliverables:**
1. Landing page (11 sections)
2. Contact page (2 booking options)
3. Design system documentation
4. Component library
5. Animation specifications
6. Email template designs (4 templates)

---

## DESIGN PHILOSOPHY & BRAND IDENTITY {#design-philosophy}

### Brand Essence

**Mascula Cargo** positions itself as a premium logistics partner combining:
- **Maritime Heritage:** Deep blue palette rooted in sea freight tradition
- **Technical Excellence:** Precision, efficiency, and modern technology
- **Global Trust:** Reliability across 150+ countries
- **Premium Service:** Apple-level customer experience

### Visual Language: "Maritime Cinematic"

Inspired by:
- **Apple:** Precision, minimalism, premium feel
- **Linear:** Purposeful minimalism, sophisticated animations
- **Stripe:** Technical elegance, clear information hierarchy
- **BMW/Audi:** Luxury automotive polish
- **Airbnb/Squarespace:** Cinematic photography treatment

**Core Principles:**
1. **Cinematic Depth:** Ken Burns effects, depth-of-field overlays, high-quality imagery
2. **Sophisticated Minimalism:** Generous negative space, focused attention
3. **Modern Polish:** Glassmorphism, subtle tonal layering
4. **Technical Elegance:** Professional typography, high-contrast accenting

### Color Psychology

**Maritime Deep Blue (#061A40):**
- Heritage and stability of sea freight
- Trust and professionalism
- Global authority

**Energy Vibrant Orange (#FFB366):**
- Action and movement
- Critical visibility
- Warmth and approachability

**Supporting Palette:**
- Glass surfaces with backdrop blur
- Semi-transparent overlays for legibility
- Subtle gradients for depth

### Typography Strategy

**Dual-Font System:**

**Inter (Neo-Grotesque Sans-Serif):**
- Role: Functional foundation for all data-heavy content
- Weights: 400 (Regular), 600 (Semibold), 700 (Bold)
- Use cases: Body text, navigation, forms, data tables

**Playfair Display Italic (High-Contrast Serif):**
- Role: Premium emphasis and editorial craft
- Use cases: Single words or short phrases in heroes, section intros
- Purpose: Break "corporate" monotony, inject premium feel

**Formatting Rules:**
- Headlines: Negative letter-spacing (-0.02em to -0.04em) for confident profile
- Section Titles: Uppercase + tracking (0.05em - 0.1em) for architectural feel
- Body Text: Line height 1.6+ for technical legibility

---

## LANDING PAGE STRUCTURE

### 1. Header & Navbar
**Fixed/Sticky Header**
- Logo: `Mascula-logo.jpg`
- Navigation links (smooth scroll to sections):
  - À propos
  - Nos Services
  - Notre Vision
  - Partenaires
  - Notre Équipe
  - Pourquoi Nous
  - Contact (Routes to separate page `/contact`)
- Dark/Light Mode Toggle Switcher
- Language Switcher: FR/EN/AR
- CTA Button: "Réserver une consultation" (Routes to `/contact`)

**Header Behavior:**
- Transparent on hero section
- Solid background on scroll
- Dark mode support
- Mobile responsive hamburger menu

---

### 2. Hero Section (Fullscreen)

> **📋 DETAILED SPECIFICATION:** Complete hero section documentation including typography, animations, and implementation checklist available in:  
> **[/assets/HeroSection/HERO_SECTION_SPEC.md](/assets/HeroSection/HERO_SECTION_SPEC.md)**

**Premium Background Slideshow with Crossfade Animation**

**Typography (Critical - As Per Design Reference):**
- **Primary Heading:** "Votre partenaire" → **Fret Sans Bold** (64-72px desktop, 40-48px mobile)
- **Accent Text:** "logistique global" → **Script/Italic Serif** in Energy Orange #FFB366 (56-64px desktop)
- **Font Pairing:** Geometric sans-serif + flowing script for premium contrast
- **Alternative Fonts:** Outfit (Fret Sans fallback), Playfair Display Italic (script fallback)

**Hero Images** (8 images):
1. HeroPhotos-Business.jpg - Professional woman with shipping containers ⭐ (Primary hero image)
2. HeroPhotos-Containers.jpg
3. HeroPhotos-GoogleSearch.jpg
4. HeroPhotos-Maersk.jpg
5. HeroPhotos-Melbourne.jpg
6. HeroPhotos-Port1.jpg
7. HeroPhotos-Port2.jpg
8. HeroPhotos-Longshoreman.jpg

**Animation Implementation with Progress Bar:**
- Smooth crossfade transitions (800ms-1200ms)
- Ken Burns effect (slow zoom from scale 1.0 to 1.08)
- Each slide displays for 5-7 seconds
- Infinite autoplay loop
- **Progress bar animation (linear loading bar)**:
  - Positioned at bottom of hero section
  - Bar starts at 0% width when slide appears
  - Bar fills from left to right (0% → 100%)
  - Animation duration matches slide duration (5-7 seconds)
  - When bar reaches 100% → current photo fades out
  - Next photo fades in simultaneously
  - Bar resets to 0% and starts filling again
  - Smooth linear animation using CSS `transform: scaleX()` or `width`
  - Visual style: Thin bar (2-3px), accent color (orange/blue)
  - Background: semi-transparent dark or light
- Manual navigation: Previous/Next buttons (resets bar on click)
- Optional slide indicators (● ○ ○ ○)
- Pause on hover (desktop only) - bar animation pauses
- Touch/swipe support for mobile
- GPU-accelerated animations (60 FPS)
- Preload next image for smooth transitions

**Progress Bar Behavior:**
```
Slide appears → Bar starts at 0%
↓
Bar fills linearly (5-7 seconds)
↓
Bar reaches 100%
↓
Current image fades out (opacity: 1 → 0)
Next image fades in (opacity: 0 → 1)
↓
Bar resets to 0% immediately
↓
Repeat for next slide
```

**Overlay:**
- Dark gradient overlay for text readability:
  ```
  linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.45))
  ```

**Hero Content (Centered, with fade-in animation):**
- Badge/Label: "Transport International de Confiance"
- Main Heading: "Votre partenaire de confiance pour le transport international"
- Subtitle: "Solutions logistiques maritimes et aériennes à l'échelle mondiale"
- CTA Buttons:
  - "Découvrir nos services" (scroll to services section)
  - "Contactez-nous" (route to `/contact`)

**Hero Content Animation:**
- Fade in on slide change
- Staggered animation (Heading → Subtitle → Buttons)
- translateY(20px) to translateY(0)
- Duration: 500-700ms
- Stagger delay: 100ms between elements

**Bottom Controls:**
- Progress bar (loading bar style, fills from left to right)
- Previous/Next navigation buttons
- Slide indicators (optional: ● ○ ○ ○)

**Accessibility:**
- Respect `prefers-reduced-motion`
- Disable animations if user prefers reduced motion
- Keyboard support (Arrow keys)
- ARIA labels on navigation

**Performance:**
- Only animate opacity and transform
- Use `will-change: opacity, transform` on active slides
- No layout-shifting animations
- Lazy load slides beyond first
- 60 FPS target

---

### 3. À Propos (About Section)
**Section Title:** "Qui sommes-nous ?"

**Content Text:**
"**Mascula Cargo** est une entreprise spécialisée dans le transport international de marchandises et les solutions logistiques à l'échelle mondiale. Nous accompagnons les particuliers, les commerçants et les entreprises dans l'organisation de leurs expéditions par voie maritime et aérienne, en garantissant un service fiable, sécurisé et adapté à chaque besoin.

Grâce à notre expertise et à notre engagement, nous facilitons les échanges internationaux en offrant à nos clients un accompagnement personnalisé, un suivi rigoureux et des solutions de transport efficaces, quelle que soit la destination."

**Layout:**
- Two-column layout (desktop)
- Left: Image/illustration (cargo/logistics)
- Right: Text content
- Mobile: Stacked vertical layout

**Visual Elements:**
- Icon/illustration for international logistics
- Background pattern or subtle gradient
- Call-out stats (if available): Years of experience, countries served, satisfied clients

---

### 4. Nos Services
**Section Title:** "Nos Services"

**Implementation: Carousel/Slider**

**Three Main Services (Carousel Cards):**

#### Service 1: Fret Maritime
- Icon: Ship/Container
- Title: "Fret Maritime"
- Description: 
  - Transport de conteneurs
  - Marchandises volumineuses
  - Solutions économiques et fiables
  - Suivi en temps réel

#### Service 2: Fret Aérien
- Icon: Airplane
- Title: "Fret Aérien"
- Description:
  - Expéditions rapides
  - Marchandises urgentes
  - Livraisons express internationales
  - Délais garantis

#### Service 3: Solutions Logistiques
- Icon: Warehouse/Logistics
- Title: "Solutions Logistiques Complètes"
- Description:
  - Accompagnement personnalisé
  - Documentation douanière
  - Suivi transparent de A à Z
  - Conseil logistique expert

**Carousel/Slider Features:**
- **Desktop**: Show 3 cards at once (or 2 depending on design)
- **Tablet**: Show 2 cards
- **Mobile**: Show 1 card
- Smooth horizontal scroll/slide transition
- Navigation:
  - Previous/Next arrow buttons
  - Dot indicators below
  - Touch/swipe support on mobile
- Auto-play: Optional (recommended: disabled, user-controlled)
- Infinite loop
- Smooth animations (300-500ms transition)
- Cards have equal height
- Hover effects on cards (lift/scale effect)

**Card Design:**
- Large icon at top
- Service title
- Description with bullet points or paragraph
- "En savoir plus" button (optional, for future service detail pages)
- Shadow/border on card
- Background color adapts to dark/light mode

**Libraries:**
- Swiper.js (recommended)
- Or Embla Carousel
- Or custom implementation with CSS scroll-snap

---

### 5. Notre Mission & Vision

#### Notre Mission
**Title:** "Notre Mission"

**Content:**
"Notre mission est de simplifier le transport international de marchandises en proposant des solutions logistiques performantes, fiables et accessibles.

Nous nous engageons à assurer le bon déroulement de chaque expédition, depuis la prise en charge de la marchandise jusqu'à son arrivée à destination, tout en offrant un service transparent et un accompagnement de qualité."

#### Notre Vision
**Title:** "Notre Vision"

**Content:**
"Chez **Mascula Cargo**, nous avons pour ambition de devenir une référence dans le secteur du fret international en offrant des services innovants, fiables et adaptés aux besoins d'un marché en constante évolution.

Notre objectif est de bâtir des relations durables avec nos clients grâce à la confiance, à la qualité de nos services et à notre professionnalisme."

**Layout:**
- Split section or alternating layout
- Icons/graphics representing mission and vision
- Parallax or scroll animations (subtle)

---

### 6. Nos Valeurs (Our Values)
**Section Title:** "Nos Valeurs"

**Five Core Values (Icon + Text Layout):**

#### 1. Fiabilité
**Icon:** Checkmark/Shield
**Text:** "Nous respectons nos engagements et assurons un suivi rigoureux de chaque expédition."

#### 2. Sécurité
**Icon:** Lock/Shield
**Text:** "La protection des marchandises est au cœur de nos priorités durant tout le processus de transport."

#### 3. Transparence
**Icon:** Eye/Communication
**Text:** "Nous privilégions une communication claire et un accompagnement permanent afin que nos clients soient informés à chaque étape."

#### 4. Professionnalisme
**Icon:** Star/Award
**Text:** "Notre expérience et notre savoir-faire nous permettent de proposer des solutions logistiques adaptées aux exigences de chaque client."

#### 5. Satisfaction Client
**Icon:** Heart/Happy Customer
**Text:** "La satisfaction de nos clients est notre priorité. Nous mettons tout en œuvre pour offrir un service de qualité et construire des relations de confiance sur le long terme."

**Design:**
- Grid layout (5 cards or 2-3 columns)
- Icons with text
- Hover animations
- Subtle background colors per value

---

### 7. Nos Partenaires (Partners Section)
**Section Title:** "Nos Partenaires de Confiance"

**Partner Logos** (5 logos):
1. CMA CGM: `partenaires-logos-CMA_CGM.webp`
2. Evergreen: `partenaires-logos-Evergreen.png`
3. Maersk: `partenaires-logos-Maersk.png`
4. Magallanes (MGLN): `partenaires-logos-MGLN.png`
5. MSC: `partenaires-logos-MSC.jpg`

**Implementation: Premium Infinite Marquee Animation**
**(See: skills/Premium_Infinite_Partner_Cards_Marquee_Animation_Spec.md)**

**Marquee Container:**
- Full-width container
- `overflow: hidden`
- `position: relative`
- Single horizontal row of logos
- No scrollbar visible
- No empty space exposed

**Edge Fade Mask (Gradient):**
- Apply gradient mask to entire marquee container
- Opacity profile:
  ```
  0% (invisible) → 100% (fully visible) → 100% → 0% (invisible)
  Left Fade (8-12%)  |  Center (75-80%)  |  Right Fade (8-12%)
  ```
- Creates illusion of logos fading in/out at edges
- Smooth linear gradient
- Applied to container, NOT individual logos

**Infinite Loop Animation:**
- Logos scroll continuously from **right to left**
- Duplicate logo sequence for seamless loop:
  ```
  CMA_CGM | Evergreen | Maersk | MGLN | MSC | CMA_CGM | Evergreen | Maersk | MGLN | MSC
  ```
- Animate track until first sequence completes
- Instantly reset to initial position (invisible reset due to duplication)
- No visible jumps, pauses, or stutters

**Animation Specifications:**
- **Speed**: Constant linear velocity (no acceleration/deceleration)
- **Duration**: 25-40 seconds (depends on total track width)
- **Timing function**: `linear` (no easing)
- **Transform**: Use GPU-accelerated `transform: translate3d()` or `translateX()`
- **Never animate**: `left`, `margin`, `position` (only transforms)
- **60 FPS target**

**Logo Appearance:**
- Logos always at **100% opacity**
- Fade effect comes from container mask only
- Logos enter from right (invisible → faint → visible)
- Logos exit to left (visible → faint → invisible)
- No individual logo animations
- Parent track moves as single unit

**Spacing:**
- **Fixed gap**: 24-40px between logos
- Perfectly consistent spacing
- Equal sizing for all logos (normalize height)
- Vertical alignment: center

**Logo Styling:**
- Default: Grayscale filter (0% saturation) or reduced opacity (60-70%)
- On hover: Full color or 100% opacity
- Smooth transition: 200ms ease-out
- Optional: Slight scale(1.05) on hover
- No vertical movement

**Hover Behavior:**
- **Marquee hover**: Pause scrolling (`animation-play-state: paused`)
- Resume from exact position (no jump/restart)
- **Individual logo hover**:
  - Remove grayscale/increase opacity
  - Optional: subtle shadow or border
  - Optional: scale(1.05)
  - 200ms transition

**Vertical Stability:**
- **No**: floating, bouncing, scaling (except hover), vertical movement
- **Only**: horizontal translation

**Responsiveness:**
- **Desktop**: Full-size logos
- **Tablet**: Slightly reduced logo size
- **Mobile**: Smaller logos or add more duplicates
- Never expose empty space
- Maintain animation smoothness

**Performance:**
- Use CSS keyframes (no JavaScript animation loops)
- GPU compositing with `will-change: transform` on track
- No layout recalculations
- Animate only the parent track
- Perfectly continuous animation

**Motion Quality:**
- Premium, smooth, constant, luxurious
- Similar to: Linear, Stripe, Framer, Vercel, Apple
- Avoid "news ticker" appearance
- Relaxing, effortless feel

**Visual Timeline:**
```
░░░░░░░░░ (Invisible)
▒▒▒▒▒▒▒▒▒ (Fade In)
█████████ (Fully Visible)
▒▒▒▒▒▒▒▒▒ (Fade Out)
░░░░░░░░░ (Invisible)
```

**Accessibility:**
- Respect `prefers-reduced-motion` (stop animation)
- Logos should still be visible when motion is reduced
- Alt text on logo images

---

### 8. Notre Équipe (Team Section)
**Section Title:** "Notre Équipe"

**Implementation: Carousel/Slider (Same as Services)**

**Content:**
- Team member cards (to be provided later)
- Structure: Photo, Name, Role, Short bio
- Each card: Professional photo, name, position, 2-3 line bio

**Placeholder Text:**
"Une équipe dévouée et expérimentée au service de vos expéditions internationales."

**Carousel/Slider Features:**
- **Desktop**: Show 3-4 team members at once
- **Tablet**: Show 2 team members
- **Mobile**: Show 1 team member
- Smooth horizontal scroll/slide transition
- Navigation:
  - Previous/Next arrow buttons
  - Dot indicators below
  - Touch/swipe support
- Auto-play: Optional (3-4 seconds per slide)
- Infinite loop
- Smooth animations (300-500ms transition)

**Team Card Design:**
- Professional photo (circular or square with rounded corners)
- Name (bold, larger font)
- Role/Position (smaller, lighter font)
- Short bio (2-3 lines)
- Social media icon (LinkedIn) - optional
- Hover effect: Photo overlay with contact info or social links
- Background adapts to dark/light mode

**Libraries:**
- Swiper.js (recommended)
- Or Embla Carousel
- Or custom implementation with CSS scroll-snap
- Equal spacing and sizing

**Animation:**
- Infinite scroll/carousel
- Or fade-in on scroll into viewport

---

### 8. Notre Équipe (Team Section)
**Section Title:** "Notre Équipe"

**Content:**
- Team member cards (to be provided later)
- Structure: Photo, Name, Role, Short bio
- Layout: Grid (3-4 columns → 1 column mobile)

**Placeholder Text:**
"Une équipe dévouée et expérimentée au service de vos expéditions internationales."

**Design:**
- Professional team photos
- Card layout with hover effects
- Social links (LinkedIn, etc.)
- Contact button per team member (optional)

---

### 9. Pourquoi Choisir Mascula Cargo ? (Why Us)
**Section Title:** "Pourquoi choisir Mascula Cargo ?"

**Five Key Advantages (List with icons/checkmarks):**
- ✓ Une expertise dans le transport international.
- ✓ Des solutions de fret maritime et aérien adaptées à vos besoins.
- ✓ Un accompagnement personnalisé à chaque étape.
- ✓ Un suivi fiable et transparent de vos expéditions.
- ✓ Un engagement constant envers la qualité, la sécurité et le respect des délais.

**Additional Elements:**
- Statistics (if available):
  - X années d'expérience
  - X expéditions réussies
  - X pays desservis
  - X% clients satisfaits
- Testimonials/Reviews (optional)
- Trust badges/certifications

**Design:**
- Two-column layout
- Left: List of advantages
- Right: Stats/visual element
- Background color or pattern to differentiate section

---

### 10. Contact CTA Section (NOT full contact page)
**Section Title:** "Prêt à expédier avec Mascula Cargo ?"

**Content:**
- Heading: "Contactez-nous dès aujourd'hui"
- Subtext: "Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets d'expédition."
- Large CTA Button: "Nous Contacter" (Routes to `/contact`)
- Alternative Button: "Réserver une consultation" (Routes to `/contact`)

**Design:**
- Full-width section
- Contrasting background color
- Centered content
- Large, prominent buttons
- No forms on this page - just call-to-action

---

## CONTACT PAGE (Separate Route: `/contact`)

### Page Structure:
- Same Header (with navigation back to landing page)
- Page Title: "Contactez-nous"
- Page Subtitle: "Nous sommes là pour vous accompagner"
- Two main options/sections (side-by-side or tabbed layout)

---

### Option 1: Prendre Visite (Simple Contact Form)
**Section Title:** "Prenez Visite" or "Envoyez-nous un message"

**Simple Contact Form Fields:**
- Nom complet * (required)
- Email * (required)
- Téléphone * (required)
- Entreprise (optional)
- Type de service (dropdown):
  - Fret Maritime
  - Fret Aérien
  - Solution Logistique Complète
  - Demande de devis
  - Autre
- Sujet * (required)
- Message * (required, textarea)
- Button: "Envoyer le message"

**Form Validation:**
- Real-time validation
- Error messages in French
- Success message after submission
- Loading state during submission

**Backend Integration (Resend API):**
- Webhook to Resend API
- Custom HTML email template
- Send to: contact@masculacargo.com (agency professional email)
- Auto-reply to user with confirmation
- No database storage - all data sent via email only

**Design:**
- Clean, simple form layout
- Left/right split or stacked on mobile
- Modern input fields with floating labels
- Clear error states
- Success confirmation message

---

### Option 2: Réserver un Rendez-vous (Calendar Date/Time Picker)
**Section Title:** "Réservez un Rendez-vous"

**Implementation Based on Screenshot (Cal.com / Calendly Style):**

#### Left Side: Information Panel
- **Main Heading**: Type of consultation/meeting
  - Example: "Audit Stratégique" or "Consultation Logistique"
- **Duration tabs/chips** (user selects duration):
  - 15min
  - 20min
  - 30min
  - 1h (highlighted/selected)
- **Meeting type indicator**:
  - Icon + "Cal Video" or "Zoom" or "Google Meet"
  - Or: "Présentiel" for in-person
- **Location/Timezone selector**:
  - Dropdown: "Africa/Algiers" or appropriate timezone
- **Description text**: 
  - Brief description of what will be discussed in the meeting
  - Example: "Ce n'est pas un appel commercial, c'est une session stratégique..."

#### Right Side: Calendar & Time Picker
**Month Navigation:**
- Display current month: "July 2028" (example)
- Navigation arrows: Previous/Next month

**Calendar Grid:**
- Days of week header: SUN, MON, TUE, WED, THU, FRI, SAT
- Date cells:
  - Available dates: Normal style (clickable)
  - Selected date: Highlighted (e.g., red/orange background, white text)
  - Booked/unavailable dates: Grayed out or disabled
  - Past dates: Disabled
  - Current date indicator (optional)
- User clicks on available date

**Time Slot Selection (appears after date selection):**
- Display available time slots for selected date
- Example format:
  - "13:00"
  - "14:00"
  - "15:00"
  - "16:00"
  - etc.
- Business hours only (e.g., 9:00 - 18:00)
- 30-minute or 1-hour intervals (based on duration selected)
- Booked slots are grayed out or hidden
- User clicks on available time slot

**Confirmation Flow:**
After selecting date & time → Show form:
- Nom complet * (required)
- Email * (required)
- Téléphone * (required)
- Entreprise (optional)
- Type de consultation (pre-filled or dropdown):
  - Consultation logistique
  - Devis personnalisé
  - Visite de nos installations
  - Audit stratégique
  - Autre
- Notes/Sujet (optional textarea)
- Timezone confirmation (display selected timezone)
- Summary of booking:
  - Date: [Selected date]
  - Time: [Selected time]
  - Duration: [Selected duration]
  - Type: [Video call / In-person]
- Button: "Confirmer le rendez-vous"

**Calendar Component Design (Based on Screenshot):**
- Clean, modern design
- White background (light mode) / Dark background (dark mode)
- Selected date: Bold accent color (red/orange as in screenshot)
- Clear typography
- Responsive: Stack vertically on mobile (info panel on top, calendar below)
- Smooth animations when selecting date/time

**Calendar Backend Logic:**
- **No database** - calendar availability is client-side only
- All booking data sent directly via email to agency
- Availability checking:
  - Define business hours in config (9:00-18:00)
  - Define working days (Mon-Fri or custom)
  - Optionally: Block specific dates manually in code/config
- No real-time availability check (user selects any available slot)
- Agency manages bookings manually via email inbox
- Future: Can add Google Calendar sync to check real availability (optional enhancement)

**Email Integration (Resend API - No Database):**
- Send booking notification to: contact@masculacargo.com (agency professional email)
- Send confirmation email to client
- Include calendar invite (.ics file attachment) in both emails
- Email contains:
  - Date and time selected
  - Duration
  - Consultation type
  - Client information (name, email, phone, company, notes)
  - Timezone
  - Meeting type (video/in-person)
  - "Add to Google Calendar" button
  - "Add to Outlook" button
- Agency manages bookings manually from email inbox
- No automated reminder emails (agency handles manually)
- No booking database or admin panel needed

**Calendar Libraries:**
- React Big Calendar (for visual calendar UI)
- Or custom implementation with date-fns or day.js
- FullCalendar (alternative)
- Pure client-side calendar (no backend database)
  - Présentation de services
  - Autre
- Sujet de la consultation * (textarea)

**Interactive Calendar Component:**
- Visual calendar (month view)
- Show available dates (highlight)
- Show booked dates (grayed out / disabled)
- User selects date
- After date selection → show available time slots
- Time slots (business hours):
  - 9:00 - 9:30
  - 10:00 - 10:30
  - 11:00 - 11:30
  - 14:00 - 14:30
  - 15:00 - 15:30
  - 16:00 - 16:30
  - etc.
- Duration options:
  - 30 minutes (default)
  - 1 heure
- Timezone selection (auto-detect or manual)
- Confirmation summary before submit
- Button: "Confirmer le rendez-vous"

**Calendar Backend:**
- Store bookings in database
- Check availability in real-time
- Prevent double-booking
- Admin interface to view/manage bookings (future)

**Email Integration (Resend API):**
- Send confirmation email to client
- Send notification to team@masculacargo.com
- Include calendar invite (.ics file attachment)
- Email contains:
  - Date and time
  - Duration
  - Consultation type
  - Client information
  - Google Calendar / Outlook add button
  - Zoom/Teams link (if applicable)

**Reminder Emails (Automated):**
- 24 hours before: Reminder email
- 1 hour before: Final reminder
- Post-meeting: Thank you + feedback request

---

### Email Templates (Resend Custom HTML Templates)
**Note: All templates must be custom HTML with Mascula Cargo branding**

#### Template 1: Contact Form Submission (Agency Notification)
**To:** contact@masculacargo.com (agency professional email)
**Subject:** "📧 Nouveau message de contact - Mascula Cargo"
**Content:**
- Header: Mascula Cargo logo and branding
- Alert: "Vous avez reçu un nouveau message de contact"
- **Form Data:**
  - Nom: [Name]
  - Email: [Email]
  - Téléphone: [Phone]
  - Entreprise: [Company]
  - Type de service: [Service type]
  - Sujet: [Subject]
  - Message: [Message text]
- Timestamp: [Date and time received]
- Footer: Quick action buttons
  - "Répondre par email" button (mailto: link)
  - "Appeler" button (tel: link)

#### Template 2: Contact Form Auto-Reply (Client Confirmation)
**To:** [User email]
**Subject:** "Merci pour votre message - Mascula Cargo"
**Content:**
- Header: Mascula Cargo logo and branding
- Thank you message: "Merci de nous avoir contactés"
- Confirmation text: "Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais (sous 24-48h)"
- Summary of their submission:
  - Nom: [Name]
  - Type de service: [Service type]
  - Sujet: [Subject]
- Contact information:
  - Téléphone: [Agency phone]
  - Email: contact@masculacargo.com
  - Adresse: [Agency address]
- Social media links (LinkedIn, Facebook, Instagram, WhatsApp)
- Footer: Mascula Cargo branding

#### Template 3: Booking Confirmation (Client)
**To:** [User email]
**Subject:** "Confirmation de rendez-vous - Mascula Cargo"
**Content:**
- Confirmation message: "Votre rendez-vous a été enregistré avec succès"
- Meeting details summary:
  - Date: [Selected date]
  - Heure: [Selected time]
  - Durée: [Duration]
  - Type de consultation: [Consultation type]
  - Timezone: [Timezone]
  - Format: [Video call / Présentiel]
- Calendar invite attached (.ics file)
- "Add to Google Calendar" button
- "Add to Outlook" button
- Contact information if need to reschedule
- What to prepare for the meeting
- Mascula Cargo contact details

#### Template 4: Booking Notification (Agency - Internal)
**To:** contact@masculacargo.com (agency professional email)
**Subject:** "🗓️ Nouveau rendez-vous réservé - [Date] à [Hour]"
**Content:**
- Alert: New booking received
- **Client Information:**
  - Nom complet: [Name]
  - Email: [Email]
  - Téléphone: [Phone]
  - Entreprise: [Company]
  - Type de consultation: [Type]
  - Notes/Sujet: [Message]
- **Meeting Details:**
  - Date: [Date]
  - Heure: [Time]
  - Durée: [Duration]
  - Timezone: [Timezone]
  - Format: [Video/In-person]
- Calendar invite attached (.ics file)
- "Add to Google Calendar" button
- "Add to Outlook" button
- Instructions: "Veuillez confirmer ce rendez-vous avec le client par email ou téléphone"

**Note:** No reminder emails needed - agency manages follow-up manually

---

## DESIGN SYSTEM REQUIREMENTS

### Dark/Light Mode
- Toggle switcher in header
- Persist user preference (localStorage)
- Smooth transition between modes
- All sections adapt:
  - Background colors
  - Text colors
  - Borders and shadows
  - Logo variants (if needed)
  - Partner logos (consider grayscale in dark mode)

**Color Palette:**
- Light Mode:
  - Primary: Blue (maritime theme)
  - Secondary: Orange/Yellow (energy, trust)
  - Background: White, Light gray
  - Text: Dark gray, Black
  
- Dark Mode:
  - Primary: Lighter blue
  - Secondary: Brighter orange/yellow
  - Background: Dark navy, Dark gray
  - Text: White, Light gray

### Typography
- Headings: Modern sans-serif (e.g., Inter, Poppins, Montserrat)
- Body: Clean sans-serif (e.g., Inter, Open Sans)
- Responsive font sizes
- Line height for readability
- Font weights: 400 (regular), 600 (semibold), 700 (bold)

### Animations & Interactions
- Scroll-triggered fade-in animations
- Parallax effects (subtle)
- Hover effects on cards and buttons
- Smooth scrolling navigation
- Loading states
- Micro-interactions
- 60 FPS target
- Respect `prefers-reduced-motion`

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

### Accessibility
- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- Focus indicators
- Alt text for images
- Semantic HTML
- ARIA labels where needed
- Color contrast ratios

---

## TECHNICAL STACK RECOMMENDATIONS

### Frontend
- React / Next.js (recommended for SEO)
- TypeScript
- Tailwind CSS (for rapid development and dark mode)
- Framer Motion (for animations)
- React Hook Form (forms)
- Zod (validation)

### Backend / API
- Next.js API routes (minimal - only for email sending)
- Resend API for emails (all data delivery via email)
- **No database required** - stateless email-only system
- Calendar logic: Client-side with date-fns or day.js
- .ics file generation for calendar invites

### Deployment
- Vercel (recommended for Next.js)
- Environment variables for API keys
- CDN for images
- i will handle all domaine and dns records my self , 
### Performance
- Image optimization (Next.js Image)
- Lazy loading
- Code splitting
- Font optimization
- Lighthouse score 90+ target

---

## CONTENT TO BE ADDED LATER

1. Team member information (photos, names, roles, bios)
2. Actual contact information (address, phone, email)
3. Agency professional email: contact@masculacargo.com (to be confirmed)
4. Partner relationship details
5. Client testimonials
6. Case studies
7. Statistics (years, shipments, countries, satisfaction rate)
8. Business hours for calendar (default: Mon-Fri 9:00-18:00)
9. Timezone configuration (default: Africa/Algiers or appropriate)
10. Video call platform preference (Zoom/Google Meet/Cal Video)
11. FAQ section (optional)
12. Blog/News section (optional)
13. Tracking system integration (optional)
14. Multi-language content (English translations)

---

## PROJECT PHASES

### Phase 1: Design & Planning ✓
- Plan completed
- Content extracted
- Requirements documented
- Design system defined

### Phase 2: Development
- Setup project structure
- Implement header & navigation
- Build hero section with crossfade animation
- Develop all landing page sections
- Implement dark/light mode
- Build contact page with forms
- Calendar integration
- Resend email integration

### Phase 3: Testing
- Cross-browser testing
- Mobile responsiveness
- Form validation
- Email delivery
- Calendar booking flow
- Accessibility audit
- Performance optimization

### Phase 4: Deployment
- Environment setup
- Domain configuration
- SSL certificate
- Analytics integration
- Launch

---

## NOTES

- All text content is in French (primary language)
- English translations needed later
- Focus on premium, professional, trustworthy aesthetic
- Maritime/logistics theme throughout
- Blue color scheme (maritime/trust)
- Cinematic, smooth animations
- Apple/luxury brand level of polish
- Mobile-first approach
- SEO optimization for "transport international", "fret maritime", "fret aérien", "Mascula Cargo"
