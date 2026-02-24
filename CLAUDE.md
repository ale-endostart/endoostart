# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EndoStart Platform** - A digital ecosystem for Dr. Alessandro's endoscopy immersion course. The platform serves two distinct audiences:
- **Public Area**: Landing page for lead capture (high-ticket medical professionals, ~R$ 45k+ courses)
- **Members Area**: Portal for enrolled students to access course content (PDFs, videos)

**Reference Design**: loperacademy.com.br

## Tech Stack & Setup

**Frontend Framework**: Next.js with React
**Optional CMS**: Sanity.io or Strapi (for content management without developer intervention)
**Hosting**: Vercel or AWS
**Analytics**: Meta Pixel API + Google Tag Manager (mandatory)

**Key Performance Targets**:
- Google PageSpeed score > 90 (Mobile)
- WhatsApp conversion tracking on 100% of CTAs
- Route protection in members area (unauthenticated users blocked)

## Project Architecture

### Two-Part System

#### 1. Landing Page (`src/pages/landing` or root)
- **Hero Section**: Headline "Abandone o plantão de 12h. Fature até R$ 2.000 por procedimento de 30 minutos" + Dr. Alessandro video/image + WhatsApp CTA
- **ROI Calculator**: Interactive widget where doctors input exams/week to see projected monthly earnings vs. on-call salary
- **Course Showcase**: Cards for Immersion courses (Endoscopia, Colonoscopia, Balão Gástrico, Terapêutica)
- **Technical Curriculum**: Display of curriculum modules (DRGE, Tumores Gástricos, Hemorragias Digestivas, Afecções Anorretais)
- **Social Proof**: Testimonials carousel + "About Dr. Alessandro" section (12 years experience, ex-SEMA RT)

**Critical Rule**: WhatsApp links must send pre-filled message: "Olá! Sou médico e gostaria de saber mais sobre a Imersão em [Course Name]"

#### 2. Members Portal (`src/pages/dashboard` or `/student`)
- **Authentication**: Email/password + Google Login
- **Admin Panel**: Dr. Alessandro can manually grant/revoke student access
- **Dashboard by Module**: Structure courses into lessons/themes
- **PDF Repository**: Embedded PDF viewer (7-10 page documents) with browser viewing or download option
- **Video Library**: Embedded Vimeo or YouTube unlisted videos

### Data Structure

Standardized course modules in database:
- **Esôfago Module**: Esophageal tumors, DRGE
- **Estômago Module**: Gastric adenocarcinoma, benign lesions
- **Intestino Module**: Vascular disease, diverticular disease, appendicopathies
- **Urgências Module**: High/low GI bleeding management

## Development Workflow

### Key Commands (To Be Implemented)
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Linting
npm run lint

# Type checking (if TypeScript)
npm run type-check

# Testing (when implemented)
npm run test
```

### Mobile-First Priority
Optimize navigation for doctors using the platform between appointments (primarily mobile/tablet access).

### Important Design Constraints
- Visual fidelity must match loperacademy.com.br (spacing, typography, components)
- Landing page must be conversion-focused with prominent WhatsApp CTAs
- Members area requires strict route protection
- PDF viewer must be lightweight to prevent users leaving the platform

## File Structure

```
/c/TurboOps/Code/
├── src/
│   ├── pages/           # Next.js pages
│   ├── components/      # Reusable React components
│   ├── utils/          # Helper functions, API calls, auth logic
│   └── styles/         # CSS modules or global styles
├── public/             # Static assets (images, videos, PDFs)
├── config/             # Configuration files (API endpoints, CMS settings)
└── .claude/            # Claude-specific notes and memories
```

## Critical Integration Points

1. **WhatsApp Integration**: Use WhatsApp Web API or wa.me links with pre-filled messages
2. **PDF Handling**: Implement lightweight viewer (consider react-pdf or similar)
3. **Video Embedding**: Use Vimeo/YouTube iframe embeds with privacy settings
4. **Authentication**: Implement NextAuth.js or similar with Google OAuth
5. **Analytics**: Ensure Meta Pixel and Google Tag Manager tracking on conversion events

## Next Steps & Awaiting Instructions

Project structure is ready. Awaiting further instructions on:
- Initial setup (package.json dependencies, environment variables)
- Database/CMS selection and configuration
- Design asset handoff (hero images, logos, Dr. Alessandro media)
- Content structure and seeding
