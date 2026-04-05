# Design System: High-End Editorial

## 1. Overview & Creative North Star

**Creative North Star: "The Bold Curator"**

This design system is a rejection of the "soft and safe" corporate aesthetic. It draws inspiration from high-end editorial print and avant-garde digital portfolios to create an experience that feels authoritative, intentional, and unapologetically bold. 

We break the standard digital template by utilizing **Aggressive Minimalism**. This isn't just about "less"; it's about making sure the elements that remain are high-impact. We utilize massive typography scales, a high-contrast palette of electric pink and deep purple, and a layout strategy that favors sharp edges (`0px` border-radius) over soft corners. The system moves away from traditional "box-shadow" depth, instead opting for flat, tonal layering and structural "heavy-weight" dividers to define its spatial logic.

---

## 2. Colors

The palette is built on a foundation of high-contrast drama. The interaction between the deep violet and the vibrant pink-red creates a pulsing energy that guides the user’s eye.

### Primary Palette
- **Primary (`#ba002b`) / Primary Container (`#e90039`):** Our "Signature Pink." Use this for high-impact accents, call-to-action elements, and primary brand graphics.
- **Secondary (`#7f40b0`):** Our "Electric Purple." Used to provide a sophisticated depth that grounds the vibrancy of the pink.
- **Background (`#f9f9f9`):** A clean, off-white stage that allows the bold colors and typography to breathe.

### The "No-Line" Rule (Exceptions for Editorial Impact)
While 1px borders are strictly prohibited for general sectioning, this system introduces **"Structural Dividers."** To separate major narrative shifts, use a thick (4px-8px) solid line using the `primary` or `on_surface` token. Otherwise, boundaries must be defined through:
- **Tonal Shifts:** Transitioning from `surface` to `surface_container_low`.
- **Vertical Air:** Utilizing extreme white space from the spacing scale to signal a new context.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical sheets.
- **Level 1 (Base):** `surface` (#f9f9f9)
- **Level 2 (In-page Sections):** `surface_container` (#eeeeee)
- **Level 3 (Interactive Cards):** `surface_container_lowest` (#ffffff) to provide a crisp pop against the slightly darker sections.

### Signature Textures
To add "soul," use subtle gradients on primary CTAs or Hero backgrounds, transitioning from `primary` (#ba002b) to `primary_container` (#e90039) at a 45-degree angle. This prevents the bold colors from feeling "flat" or "cheap."

---

## 3. Typography

Typography is the primary architecture of this system. We use a high-contrast pairing of **Epilogue** for impact and **Work Sans** for clarity, supplemented by **Space Grotesk** for technical labeling.

- **Display (Epilogue):** Used for "Headline Statements." These should be massive, tight-kerning, and often in `on_surface` or `primary`. They are the voice of the brand.
- **Body (Work Sans):** Chosen for its modern, neutral character. It balances the "loudness" of the display fonts.
- **Labels (Space Grotesk):** A monospaced-leaning sans-serif used for metadata, tags, and small utility text, adding a "designed/technical" feel to the editorial layout.

**Hierarchy Strategy:** 
- Use `display-lg` (3.5rem) for hero sections to immediately establish a high-end, gallery feel.
- Body text should remain generous (`body-lg` at 1rem) to ensure readability against the high-contrast background.

---

## 4. Elevation & Depth

This system avoids the "fuzzy" look of standard shadows. We communicate hierarchy through **Tonal Layering** and **Aggressive Sharpness.**

- **The Layering Principle:** With a `0px` roundedness scale, depth is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container` section creates a natural "lift" through color value alone.
- **Glassmorphism & Depth:** For floating navigation or overlays, use a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. This allows the vibrant `primary` or `secondary` background elements to bleed through, creating a sophisticated "frosted glass" effect.
- **Ambient Shadows:** Only use shadows for "Floating Action Elements." They must be highly diffused (e.g., `box-shadow: 0 20px 40px rgba(0,0,0,0.06)`). The shadow must never be pure black; it should be a tint of the `on_surface` color.
- **The "Ghost Border":** If a button or input requires a container, use the `outline_variant` at 20% opacity. Avoid 100% opaque borders except for the "Structural Dividers" mentioned in the Color section.

---

## 5. Components

### Buttons
- **Primary:** Sharp corners (`0px`), `primary` background, `on_primary` text. High-contrast, no shadow.
- **Secondary:** `0px` radius, `surface` background with a 2px `primary` Structural Border.
- **Interaction:** On hover, the background should shift to `primary_container` with a slight "lift" (2px translation).

### Cards & Lists
- **Rule:** No divider lines between list items. Use 24px-32px of vertical padding to separate content.
- **Layout:** Cards use `surface_container_lowest` against a `surface_container` background. Graphics/Images within cards should be flush to the edges (no internal padding for imagery).

### Input Fields
- **Styling:** Underline-only style using the `outline` token at 2px weight. When focused, the underline transforms into the `primary` color at 4px weight.
- **Labels:** Use `label-md` (Space Grotesk) positioned above the input in all-caps.

### Unique Iconography
Icons should be "Stylized Graphics"—often encased in a circular `primary_container` background to break the rigid squareness of the layout, providing a focal point of "organic" shape amidst the Brutalist grid.

---

## 6. Do's and Don'ts

### Do
- **Do** use extreme scale. If a heading feels big, try making it 20% larger.
- **Do** honor the `0px` border radius. Every element must feel architectural and sharp.
- **Do** use the "Structural Dividers" (thick lines) to anchor the page horizontally.
- **Do** prioritize white space. The "High-End" feel comes from the luxury of unused space.

### Don't
- **Don't** use standard 1px borders to separate cards or sections.
- **Don't** use rounded corners (`border-radius: 4px/8px`). It dilutes the brand's bold personality.
- **Don't** use generic "drop shadows" on every container. Trust the tonal shifts to create depth.
- **Don't** use more than three colors on a single screen. Keep the palette disciplined to maintain the editorial "premium" feel.