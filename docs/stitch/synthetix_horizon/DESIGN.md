```markdown
# Design System Documentation: Editorial High-Tech Minimalism

## 1. Overview & Creative North Star
**Creative North Star: The Celestial Archive**
This design system rejects the "boxed-in" nature of standard web templates. It is an editorial exploration of digital space, treating the screen not as a flat surface, but as a deep, multi-dimensional void. By utilizing **intentional asymmetry**, **glassmorphism**, and **tonal depth**, we create an experience that feels like navigating a high-end holographic interface. 

The goal is a "Visionary Minimalist" aesthetic: highly technical yet intellectual and calm. We achieve this by letting content breathe within expansive margins and using neon accents not as "decoration," but as functional light sources that guide the eye through the "darkness" of the information architecture.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the deep obsidian of space, punctuated by the high-frequency energy of neon light.

### The "No-Line" Rule
**Borders are strictly prohibited for structural sectioning.** 1px solid lines create a "grid-trap" that feels dated. Instead, boundaries must be defined by:
1.  **Background Shifts:** Transitioning from `surface` (`#080f18`) to `surface_container_low` (`#0c141e`).
2.  **Luminous Glows:** Using `primary_dim` (`#00deec`) or `secondary_dim` (`#b90afc`) with a 40px–100px blur to "soft-edge" a section.

### Surface Hierarchy & Nesting
Treat the UI as a series of floating glass panes.
*   **Base Layer:** `background` (`#080f18`).
*   **Section Layer:** `surface_container_low` (`#0c141e`) for large content blocks.
*   **Interactive/Card Layer:** `surface_container_high` (`#17202c`) to create a "lifted" feel.
*   **Glass Effect:** Use `surface_variant` (`#1d2634`) at 60% opacity with a `20px` backdrop-blur for floating navigation or modals.

### Signature Textures
Avoid flat primary blocks. For CTAs and Hero elements, apply a linear gradient:
*   **Primary Pulse:** `primary` (`#8ff5ff`) to `primary_container` (`#00eefc`) at a 135° angle.
*   **Secondary Shift:** `secondary` (`#d575ff`) to `secondary_container` (`#9800d0`).

---

## 3. Typography
The system utilizes a dual-font strategy to balance technical precision with editorial elegance.

*   **Display & Headlines (Space Grotesk):** This is our "Voice of the Future." With its idiosyncratic terminals and geometric construction, use `display-lg` (3.5rem) and `headline-md` (1.75rem) to create high-contrast anchors on the page. Use `tight` letter-spacing (-0.02em) for large headings.
*   **Body & Titles (Manrope):** The "Rational Workhorse." `body-lg` (1rem) provides maximum readability for long-form tech essays. Manrope’s modern sans-serif curves feel approachable, balancing the "sharpness" of the display face.
*   **Labels (Space Grotesk):** Use `label-md` (0.75rem) in all-caps with `0.1em` letter-spacing for metadata (e.g., "READ TIME," "CATEGORY").

---

## 4. Elevation & Depth
Depth is a narrative tool. We do not use "drop shadows" in the traditional sense.

*   **The Layering Principle:** To highlight a feature card, place a `surface_container_highest` (`#1d2634`) object onto a `surface_dim` (`#080f18`) background. The 5% shift in value is enough to signify elevation without visual clutter.
*   **Ambient Neon Shadows:** For high-priority floating elements (like a "Subscribe" modal), use a shadow tinted with `primary` (`#8ff5ff`) at 10% opacity, spread `30px`, to simulate a soft neon glow reflecting off the surface.
*   **The Ghost Border Fallback:** If accessibility requires a stroke, use `outline_variant` (`#424853`) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Gradient background (`primary` to `primary_container`), `on_primary` text. No border. Roundedness: `md` (0.375rem).
*   **Secondary (Ghost):** No background. `outline` (`#6f7682`) border at 20% opacity. On hover, background shifts to `surface_bright` with a soft `primary` glow.
*   **Tertiary:** Text-only in `secondary` (`#d575ff`) with a `label-md` weight.

### Cards & Lists
*   **The Rule of Flow:** Forbid divider lines. Separate list items using `spacing-4` (1.4rem) and a subtle background shift to `surface_container_low` on hover.
*   **Editorial Layout:** Cards should use asymmetrical padding. Example: `padding-top: 8`, `padding-bottom: 6`, `padding-left: 5`, `padding-right: 5`.

### Input Fields
*   **Style:** Minimalist underline or "faint-fill" using `surface_container_highest`. 
*   **Active State:** The bottom border transforms into a `primary` neon glow. Helper text uses `body-sm` in `on_surface_variant`.

### Featured Content (Blog-Specific)
*   **Glass Cards:** For featured tech reviews, use a semi-transparent `surface_container` with a `backdrop-blur`.
*   **Tech Grids:** Use `outline_variant` at 5% opacity to create a background "blueprint" grid (32px intervals) to reinforce the "visionary/high-tech" mood.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Use `spacing-20` (7rem) between major sections. Let the content feel curated, not crowded.
*   **Use Subtle Animation:** Apply 300ms cubic-bezier transitions to all hover states to mimic the responsiveness of a premium OS.
*   **Monochromatic Metadata:** Keep tags and dates in `on_surface_variant` to ensure the main headlines remain the focal point.

### Don't:
*   **No Pure White:** Never use `#FFFFFF`. Use `on_background` (`#e8eefc`) for text to prevent "retina burn" in dark mode.
*   **No Sharp Corners:** Avoid `rounded-none`. Even the most "brutalist" elements should have at least a `sm` (0.125rem) radius to feel sophisticated.
*   **No Full Opacity Accents:** Avoid large blocks of solid `secondary` purple. Use it as a highlight or a low-opacity glow to maintain the "calm" mood.

---

## 7. Roundedness & Spacing Scale
*   **Rounding:** Primarily use `md` (0.375rem) for UI components and `xl` (0.75rem) for large containers to soften the "tech" edge.
*   **Spacing:** Follow the geometric scale. Use `spacing-12` (4rem) for standard guttering to maintain an editorial, airy feel.```