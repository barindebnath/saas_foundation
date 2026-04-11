# Design System Strategy: The Architectural Minimalist

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"Architectural Precision."** In the crowded B2B SaaS landscape, we move away from the "bubbly" consumer-tech aesthetic toward a look that feels engineered, intentional, and high-fidelity. 

This system breaks the traditional "template" feel by utilizing **Tonal Layering** and **Intentional Asymmetry**. Instead of relying on heavy shadows or thick containers, we use the "negative space as a luxury" principle. Layouts should feel like a well-composed editorial spread in an architectural magazine—airy, structured, and profoundly legible.

## 2. Colors & Surface Philosophy
The palette is a sophisticated study in near-neutrals, designed to provide a "calm" environment for complex data.

### The "No-Line" Rule
Traditional B2B apps are cages of 1px lines. In this system, **1px solid borders for sectioning are prohibited.** Boundaries are defined through background color shifts. For example:
- A `surface-container-low` section (for secondary navigation) sits directly against the `surface` background.
- Content groupings are separated by white space (80px–120px) rather than horizontal rules.

### Surface Hierarchy & Nesting
Depth is created through "The Stack," mimicking physical layers of premium paper:
1.  **Base Layer:** `surface` (#f9f9ff) - The canvas.
2.  **Section Layer:** `surface-container-low` (#f2f3fb) - Subtle differentiation for sidebars or secondary zones.
3.  **Action Layer:** `surface-container-lowest` (#ffffff) - High-contrast "cards" that pop against the background without needing a shadow.

### Signature Textures
Main CTAs and high-level Hero headers should utilize a subtle **Linear Gradient** (e.g., `primary` #585f6c to `primary-dim` #4c535f) at a 135-degree angle. This adds a "machined" metallic sheen that flat colors cannot replicate, signaling premium durability.

## 3. Typography: The Editorial Voice
We utilize a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-intellectual" feel. Use `display-lg` and `headline-md` for high-level data summaries and hero statements.
*   **Body & Labels (Inter/DM Sans):** Optimized for high-density dashboard reading.
*   **The Hierarchy Rule:** We use "Tonal Contrast" over "Weight Contrast." Instead of making every header Bold, use a larger `headline-sm` in `on_surface` (#2c333e) paired with a `label-md` in `on_surface_variant` (#595f6c) in ALL CAPS for a refined, museum-label aesthetic.

## 4. Elevation & Depth
In alignment with the "Architectural" North Star, we reject the simulated gravity of heavy drop shadows.

*   **The Layering Principle:** To lift an element, shift the token. A card should be `surface-container-lowest` (#ffffff) sitting on a `surface-container` (#eaeef8) background. This creates a "soft lift."
*   **Ambient Shadows:** If a modal or floating menu *must* float, use a "Cloud Shadow": `blur: 40px`, `y: 20px`, `opacity: 4%` using a tint of `primary` (#585f6c). It should look like a hum of energy rather than a dark stain.
*   **The "Ghost Border":** For input fields or pricing tiers, use the `outline-variant` (#abb2c1) at **15% opacity**. This provides just enough structure for accessibility without cluttering the visual field.

## 5. Components

### Dashboard Mockups
*   **The Canvas:** Use `surface` (#f9f9ff) as the global background.
*   **The Sidebar:** Use `surface-container-low` (#f2f3fb) with no border. Use an active indicator that is a 2px vertical line of `primary` (#585f6c) on the far left.
*   **Data Widgets:** Forbid dividers. Use `title-sm` typography to head the widget, and use `surface-container-highest` for subtle hover states on list items.

### Pricing Tables
*   **Structure:** Avoid the "three boxes" approach. Use a horizontal grid where the "Recommended" tier is distinguished by a `surface-container-lowest` (#ffffff) background and a `primary` (#585f6c) Ghost Border.
*   **Feature Comparison:** Use `tertiary` (#5c6060) for "Checkmark" icons to keep the focus on the text, not the icon.

### Buttons
*   **Primary:** `primary` (#585f6c) background with `on_primary` (#f6f7ff) text. Corner radius: `md` (0.375rem).
*   **Secondary (The Glass Button):** Semi-transparent `surface-variant` with a 20px backdrop-blur. This allows the button to "absorb" the color of whatever is behind it.
*   **Tertiary:** Text-only with an underline that appears only on hover.

### Logo Clouds
*   **Style:** Monochromatic. All logos must be converted to `on_surface_variant` (#595f6c) and set to 40% opacity. On hover, they transition to 100% opacity. This prevents colorful logos from breaking the "Architectural" harmony.

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetric Spacing:** Give more room to the top of a section (e.g., 120px) than the bottom (80px) to create a sense of upward momentum.
*   **Nesting Surfaces:** Place a `surface-container-highest` button inside a `surface-container-low` card.
*   **Typographic Breathing:** Increase letter-spacing on `label-sm` elements by 0.05em for a premium, tracked-out look.

### Don't:
*   **Don't use #000000 for body text:** It is too jarring. Use `on_background` (#2c333e) for better eye-fatigue management in long-form SaaS workflows.
*   **Don't use Divider Lines:** If you feel the need to separate two pieces of content, increase the `gap` or change the background tone of one section.
*   **Don't use high-saturation colors:** Even for "Success" or "Error" states, use the `error` (#9e3f4e) and `tertiary` tokens which are slightly desaturated to maintain the professional B2B tone.
