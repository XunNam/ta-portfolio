# `reference/index.html` Analysis

## Source File
- Path: `reference/index.html`
- Role: authoritative visual/content reference for the current portfolio site
- Limitation: the referenced avatar asset file is missing from the repo

## High-Level Site Shape
The reference is a single-page portfolio with anchored in-page navigation. It uses:
- Tailwind via CDN
- Lucide icons via CDN
- custom inline CSS for animations and font import
- inline JavaScript for navbar state and mobile menu behavior

The future Payload-driven site should preserve the same section order and overall feel, but not necessarily the exact implementation mechanism.

## Section Order
1. Fixed navbar
2. Hero
3. About
4. Skills
5. Projects
6. Contact / CTA
7. Footer area inside the contact section layout

## Global UX Behaviors

### One-Page Navigation
- Desktop nav links scroll to section anchors:
  - `#about`
  - `#skills`
  - `#projects`
  - `#contact`
- The brand title scrolls back to top using `window.scrollTo`.
- Mobile menu repeats the same anchor destinations.

### Navbar Scroll State
When scrolling beyond 50px:
- navbar gains white translucent background
- blur and shadow are applied
- vertical padding is reduced

This is a frontend behavior rule, not CMS-managed content.

### Mobile Menu
- hamburger button toggles a dropdown panel
- menu contents duplicate desktop navigation labels
- selecting a menu item closes the menu

This confirms that mobile links should be rendered from the same CMS data source as desktop links.

## Section-By-Section Breakdown

### 1. Navbar

#### Visible Content
- Brand text: `Portfolio.`
- Nav items:
  - `Giới thiệu`
  - `Kỹ năng`
  - `Dự án`
  - `Liên hệ`

#### CMS-Managed Candidates
- brand text
- optional brand logo
- navbar links

#### Visual-Only / Frontend Rules
- fixed positioning
- hover underline animation
- scroll-state style change
- desktop/mobile rendering behavior

### 2. Hero

#### Visible Content
- Eyebrow: `👋 Xin chào, tớ là`
- Name: `Bùi Thế Anh`
- Role: `Full Stack Developer`
- Description paragraph
- Primary CTA: `Liên hệ ngay`
- Secondary CTA: `Xem CV`
- Social icons:
  - GitHub
  - mail
- Avatar area with layered decorative background
- Floating badge:
  - label: `Kinh nghiệm`
  - value: `1+ Năm`
- downward scroll chevron

#### CMS-Managed Candidates
- eyebrow
- name
- role/title
- description
- avatar media
- primary CTA
- secondary CTA
- hero social links
- floating badge content

#### Visual-Only / Frontend Rules
- gradient text styling
- decorative blobs/background shapes
- avatar frame layout
- bouncing chevron
- floating badge placement and animation

### 3. About

#### Visible Content
- Section title: `Về bản thân`
- Three cards:
  - `Tư duy Logic`
  - `Chuyên nghiệp`
  - `Làm việc nhóm`
- Each card contains:
  - icon
  - title
  - description

#### CMS-Managed Candidates
- section title
- optional section intro
- item list
- item title
- item description
- item visual source:
  - named icon
  - raw SVG
  - uploaded illustrative image

#### Visual-Only / Frontend Rules
- card hover lift
- card border/shadow styling
- grid layout

### 4. Skills

#### Visible Content
- Section title: `Kỹ năng chuyên môn`
- Section intro text
- Technical Skills list:
  - React / Next.js
  - TypeScript
  - Node.js
  - Tailwind CSS
- Soft Skills chip list:
  - Giao tiếp
  - Quản lý thời gian
  - Tiếng Anh
  - Tự học
  - Thuyết trình
  - Agile/Scrum
- Work philosophy box:
  - title: `Phương châm làm việc 🚀`
  - quote text

#### CMS-Managed Candidates
- section title
- section intro
- technical skill items
- soft skill items
- work philosophy title
- work philosophy quote

#### Important Planning Decision
The percentage/progress-bar presentation in the reference is **not** being preserved as data structure for v1.
- skill names remain editable content
- percentage bars are intentionally removed from the future implementation scope

### 5. Projects

#### Visible Content
- Section title: `Dự án tiêu biểu`
- Section intro text
- Optional top-right action: `Xem tất cả`
- Three cards
- Each card contains:
  - placeholder icon visual instead of a real image
  - tags
  - project title
  - short description
  - CTA text: `Xem chi tiết`

#### CMS-Managed Candidates
- section title
- section intro
- optional view-all link
- projects collection data:
  - title
  - slug
  - short description
  - optional full description
  - tags
  - visual source
  - optional button fields
  - featured toggle
  - sort order
  - published status

#### Important Planning Decision
V1 does **not** include a dedicated project detail page even though the cards visually show `Xem chi tiết`.

The CTA fields are retained in the model for future expansion only.

### 6. Contact / CTA

#### Visible Content
- Section title: `Sẵn sàng cho dự án mới?`
- supporting paragraph
- Primary action: `Gửi Email Ngay`
- Secondary action: `Sao chép Email`

#### CMS-Managed Candidates
- section title
- description
- email address
- primary CTA
- secondary CTA label

#### Visual-Only / Frontend Rules
- button layout
- potential clipboard behavior
- icon movement animation

### 7. Footer Area

#### Visible Content
- Copyright-like line:
  - `2026 Bùi Thế Anh.`
- Long disclaimer block
- No footer social links visible in the reference
- No footer quick links visible in the reference

#### CMS-Managed Candidates
- footer notice/disclaimer text
- copyright text
- optional year handling
- optional footer links
- optional footer social links

#### Important Planning Decision
Footer structure should be modeled more broadly than the current visual output so editors can manage:
- footer links
- footer social links
- notice/disclaimer text
- copyright text
- year behavior

## Content Defaults Extracted From The Reference

### Branding
- Brand text default: `Portfolio.`

### Hero
- Name default: `Bùi Thế Anh`
- Role default: `Full Stack Developer`
- Primary CTA default target: `#contact`
- Secondary CTA target: unresolved in the static file

### Social
- GitHub URL is present
- email address is present and repeated in multiple places

### About
- Three item titles and descriptions are present
- all three currently use icons, not uploaded images

### Skills
- Four technical skill names are present
- six soft skills are present
- one work-philosophy quote is present

### Projects
- Three projects are present with tags and short descriptions
- all three use icon placeholders, not uploaded project thumbnails

### Contact / Footer
- email address is present
- long disclaimer text is present
- footer year is hardcoded as `2026`

## Editable Content vs Visual-Only Elements

### Should Become CMS-Managed
- brand text and logo
- navbar labels and targets
- all hero copy
- hero CTA data
- hero social links
- hero avatar
- floating badge content
- About section content
- Skills section content
- Projects section settings
- project collection entries
- Contact section copy and CTA labels
- Footer notice and copyright

### Should Remain Frontend Rules
- blur/gradient/shadow styling
- animated hover states
- mobile menu open/close mechanics
- anchor scrolling behavior
- decorative background blobs
- responsive grid behavior
- fixed social icon size

## HTML Analysis Conclusion
The static reference maps cleanly to a CMS-driven one-page architecture. Almost all visible text and navigation behavior can be modeled without over-engineering, provided the future implementation keeps these boundaries:
- content lives in Payload
- layout/motion stays in the frontend
- links are typed to avoid broken anchors
- project and About visuals support icons as first-class v1 modes
