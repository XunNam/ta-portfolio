# UI Decisions

## Skills Section
- Removed the flat outer section background treatment that created the detached rectangular block effect.
- Introduced one primary inner shell as the visual anchor for the section.
- Kept the heading inside that shell so the title and content read as one composition instead of two stacked layers.
- Split the shell into:
  - balanced technical and soft-skill columns
  - a dedicated integrated philosophy band at the bottom

## Surface System
- Standardized the page around a softer glass-like white surface language instead of mixing flat fills and unrelated card treatments.
- Tightened radius, border, and shadow choices so About, Projects, Skills, social icons, and buttons now feel related.

## Interaction Polish
- Increased hover quality for cards, chips, links, and buttons without changing content behavior.
- Kept unresolved CTA behavior intact; buttons without real targets are still not turned into fake navigation.

## Responsive Composition
- Skills shell collapses to one column on tablet/mobile.
- The philosophy block stays visually attached to Skills instead of becoming a disconnected extra card.
- Technical-skill rows now stack more cleanly on narrow screens.
