# Design System — Agent Instructions

This skill describes the visual design language for all UI output. Every component, layout, and page should follow the design specs in the module files below. These describe *what the design looks like* — you choose how to implement the styles.

## Style
A spacious, depth-driven dark interface inspired by Linear: warm near-black backgrounds, a green brand accent, and the Space Mono monospace typeface. Generous whitespace and bold typography carry the hierarchy, while subtle gradients, soft shadows, faint 1px borders, and a top-edge button glint add quiet depth. Minimalist and high-impact — never flat, never busy. Dark mode only.


## Before Writing Any Code

1. **Read every module that applies.** For a landing page, read at minimum: `layout.md`, `typography.md`, `colors.md`, `buttons.md`, `cards.md`, `shadows.md`, `radius.md`, `borders.md`. Do NOT write JSX until you have loaded all relevant modules.

## Critical Rules

- **Tokens are AGNOSTIC, NOT Tailwind classes:** The tokens defined in the `.md` files (like `neutral-primary-soft`, `heading`, `border-default`) are agnostic design system tokens, NOT literal Tailwind classes. Do not blindly use classes like `bg-neutral-primary-soft` unless you have explicitly mapped them in the CSS/Tailwind configuration. You must implement the mapping yourself.

- **Cross-reference modules.** A card containing buttons must satisfy both `cards.md` AND `buttons.md`.
- **Dark mode only.** The system ships a single dark theme. Use the token values as defined (light and dark columns resolve to the same dark values). Never manually swap colors or build a light variant.
- **Equal top & bottom section spacing (mandatory).** Every section MUST carry the **same spacing on its top and bottom** — the top padding/margin of a section equals its bottom padding/margin, so each section is vertically symmetric. The gap between any two adjacent sections is identical across the whole page, producing one uniform vertical rhythm. No section gets more breathing room on one side than the other, and no section uses a different inter-section gap than the rest. See `layout.md`.
- **Every interactive element needs hover, focus, and disabled states** — defined in the relevant module.
- **Use semantic HTML:** proper heading hierarchy (`h1`→`h6`), `<button>` for actions, `<a>` for navigation, ARIA attributes where needed.

## Module Index

### Foundation (read first for any UI work)
- [colors.md](colors.md) — all background, text, and border color tokens
- [typography.md](typography.md) — heading scale, paragraphs, labels, links
- [layout.md](layout.md) — spacing rhythm, containers, animation, visual depth
- [radius.md](radius.md) — border-radius scale
- [shadows.md](shadows.md) — elevation tokens
- [borders.md](borders.md) — border widths and styles

### Components
- [buttons.md](buttons.md) — button variants, sizes, states, rounded shape, top-edge glint
- [button-group.md](button-group.md) — grouped button structure
- [cards.md](cards.md) — card structure, gradient depth, subtle border
- [inputs.md](inputs.md) — form controls, labels, states
- [alerts.md](alerts.md) — alert variants
- [badges.md](badges.md) — badge variants, sizes, dismissible chips
- [lists.md](lists.md) — list components
- [avatars.md](avatars.md) — avatar variants, sizes, indicators
- [icon-shapes.md](icon-shapes.md) — icon containers

### Complex Components
- [accordion.md](accordion.md) — accordion variants
- [dropdown.md](dropdown.md) — dropdown menus
- [modals.md](modals.md) — modal dialogs
- [tabs.md](tabs.md) — tab navigation
- [tables.md](tables.md) — table structure
- [pagination.md](pagination.md) — pagination components
- [sidebars.md](sidebars.md) — sidebar navigation
- [radios-checkboxes-toggle.md](radios-checkboxes-toggle.md) — selection controls
- [tooltips-popovers.md](tooltips-popovers.md) — tooltips and popovers
- [content.md](content.md) — grid system, responsiveness

---

## Source file: `accordion.md`

# Accordion

> Dependencies: `colors.md`, `radius.md`

## Core Specs

- **Wrapper:** full width, 1px border (border-default color), 12px radius — clips first/last item corners
- **Item separator:** 1px bottom border (border-default) on every item except last

## Trigger (Button)

- **Layout:** flex, space-between, full width
- **Padding:** 20px horizontal, 16px vertical
- **Font:** 14px, medium weight
- **Text color:** heading
- **Background:** neutral-secondary-soft
- **Hover:** neutral-tertiary-soft background
- **Focus:** outline none, 2px ring in brand color
- **Transition:** colors, 150ms
- **Open state:** neutral-tertiary-soft background

## Panel (Content)

- **Padding:** 20px horizontal, 16px vertical
- **Background:** neutral-primary-soft
- **Top border:** 1px, border-default color
- **Font:** 14px, body color, 1.625 line-height

## Chevron Icon

- Size: 16x16px
- Color: body text color
- Closed: 0deg rotation
- Open: 180deg rotation
- Transition: transform, 150ms

## Variants

### Default (Collapse)
One panel open at a time. Items stacked inside a single shared bordered/rounded wrapper.

### Separated Cards
Each item is independent — has its own 1px border, 12px radius, and no shadow. 8px bottom margin between items. No shared outer border.

### Always Open
Multiple panels can expand simultaneously. Same styling as Default.

### Flush
No outer border. Trigger and panel have transparent backgrounds. Only bottom border dividers between items. Use inside containers that already provide a background.

## States

| State | Trigger appearance |
|---|---|
| Closed | heading text, neutral-secondary-soft background |
| Open | heading text, neutral-tertiary-soft background |
| Hover | neutral-tertiary-soft background |
| Focus | 2px brand ring, no outline |
| Disabled | fg-disabled text, not-allowed cursor, no hover/focus |

---

## Source file: `alerts.md`

# Alerts

> Dependencies: `colors.md`, `radius.md`

## Core Specs

- **Padding:** 16px
- **Radius:** 8px (rounded)
- **Border:** 1px
- **Heading:** 16px, medium weight
- **Body:** 14px, normal weight, 1.6 line-height

## Variants

### Brand
- **Background:** brand-softer
- **Border:** border-brand-subtle
- **Text:** fg-brand-strong

### Success
- **Background:** success-soft
- **Border:** border-success-subtle
- **Text:** fg-success-strong

### Danger
- **Background:** danger-soft
- **Border:** border-danger-subtle
- **Text:** fg-danger-strong

### Warning
- **Background:** warning-soft
- **Border:** border-warning-subtle
- **Text:** fg-warning

---

## Source file: `avatars.md`

# Avatars

> Dependencies: `colors.md`, `radius.md`

## Core Specs

- **Circular shape:** fully rounded (9999px)
- **Rounded square shape:** 12px radius
- **Default size:** 40x40px
- **Image fit:** cover

## Sizes

| Size | Dimensions | Radius |
|---|---|---|
| Extra Small | 18x18px | 4px |
| Small | 24x24px | 4px |
| Base | 32x32px | 12px |
| Large | 44x44px | 12px |
| XL | 56x56px | 12px |
| 2XL | 64x64px | 12px |

## Bordered Avatar

- 4px padding, fully rounded, 2px outline in border-default color
- Alternative: 2px box-shadow ring in border-default color

## Stacked Avatars

- Displayed in a row (flex)
- Each avatar: 40x40px, fully rounded, 2px border in border-buffer color
- Overlap: -16px negative margin on all except first

### Stacked Counter
- Same size as avatars (40x40px), fully rounded
- Background: dark-strong, text: white, 12px font, medium weight
- Same overlap margin as other avatars

## Avatar with Text

- Flex row, 10px gap between avatar and text
- Avatar: 40x40px, fully rounded, cover fit
- Name: heading color, medium weight
- Subtitle: 14px, body color

---

## Source file: `badges.md`

# Badges

> Dependencies: `colors.md`, `radius.md`

## Core Specs

- **Border:** 1px
- **Default radius:** 9999px (pill shape)
- **Pill radius:** 9999px

## Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Default (small) | 12px | 6px | 2px |
| Large | 14px | 8px | 4px |

## Variants

### Brand
- **Background:** brand-softer
- **Border:** border-brand-subtle
- **Text:** fg-brand-strong

### Alternative (Neutral Soft)
- **Background:** neutral-primary-soft
- **Border:** border-default
- **Text:** heading

### Gray (Neutral Medium)
- **Background:** neutral-secondary-medium
- **Border:** border-default
- **Text:** heading

### Danger
- **Background:** danger-soft
- **Border:** border-danger-subtle
- **Text:** fg-danger-strong

### Success
- **Background:** success-soft
- **Border:** border-success-subtle
- **Text:** fg-success-strong

### Warning
- **Background:** warning-soft
- **Border:** border-warning-subtle
- **Text:** fg-warning

### Dark
- **Background:** dark
- **Border:** transparent
- **Text:** white

## Pill Badges

Use 9999px radius (same as default — all badges are pills by default).

## Badges with Icons

- Icon size (default): 12x12px
- Icon size (large): 14x14px
- Icon spacing: 4px margin next to label

## Icon-only Badge

Square shape — equalize dimensions to 24x24px, no horizontal text padding.

## Dismissible Badges

Badge content + a close button. Close button hover backgrounds per variant:

| Variant | Close button hover background |
|---|---|
| Brand | brand-soft |
| Alternative | neutral-tertiary |
| Gray | neutral-quaternary |
| Danger | danger-medium |
| Success | success-medium |
| Warning | warning-medium |

## Dot / Notification Badge

- Positioned absolutely: -4px top, -4px right
- Size: 12x12px, fully rounded
- 2px border in border-buffer color
- Background: danger

---

## Source file: `borders.md`

# Borders

## Width Scale

| Context | Width |
|---|---|
| Default (inputs, buttons, cards) | 1px |
| Emphasis / focus | 2px |

## Rules

- Use solid borders by default
- Dashed borders only for special cases like file dropzones
- Components in the same family must use matching border widths
- Never mix 1px and 2px borders within a single component
- Cards have a 1px solid border (border-default) for subtle separation from the dark background

## Usage

| Context | Width |
|---|---|
| Inputs / selects / textareas | 1px default; 2px on focus or error |
| Buttons | 1px for variants that require outlining |
| Cards / containers | 1px solid border-default (subtle separation from the background) |

---

## Source file: `button-group.md`

# Button Groups

> Dependencies: `buttons.md`, `colors.md`, `radius.md`

## Core Specs

- **Wrapper:** inline-flex, 8px radius (rounded), shadow: none
- **Children overlap:** -1px left margin on all except first button
- **Buttons inside the group must NOT have individual shadows.** Only the wrapper has a shadow (none).

## Anatomy

### Wrapper
- Display: inline-flex
- Radius: 8px (rounded)
- Shadow: none

### First Button
- 8px radius on inline-start side only, 0 on inline-end

### Middle Button(s)
- No radius (0 on all corners)

### Last Button
- 8px radius on inline-end side only, 0 on inline-start

### All buttons except first
- -1px left margin to overlap borders

## Rules

- Buttons inside groups follow all styles from `buttons.md` (background, border, focus rings) except individual shadows
- Icon-only buttons: 16x16px icon, match height of text buttons

---

## Source file: `buttons.md`

# Buttons

> Dependencies: `colors.md`, `radius.md`, `shadows.md`

## Core Specs (every button except ghost and disabled)

- **Radius:** 8px (rounded rectangle, not a pill)
- **Border:** 1px solid
- **Shadow:** shadow-sm (soft depth; lifts the button off the dark surface)
- **Glint effect:** subtle top-edge highlight on all solid variants — a 1px inset light line along the top using the `--color-1-400` → `--color-1-700` glint custom properties, fading downward. Reads as a faint sheen catching the top edge.
- **Gradient:** solid variants use a subtle top→bottom fill gradient (a touch lighter at the top, deeper at the bottom) to give the button volume/depth.
- **Font weight:** 500 (medium)
- **Font:** Space Mono
- **Box sizing:** border-box
- **Transition:** smoothly ease color, background, border, shadow, and transform on hover — 200ms duration with an `ease-out` timing function (e.g. `cubic-bezier(0.22, 1, 0.36, 1)`). The motion should feel soft and settled, never abrupt or linear.
- **Hover lift:** on hover, solid variants rise slightly (`translateY(-1px)`) and step their shadow up one level for a gentle responsive feel; return smoothly on hover-out.

## Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Extra small | 12px | 12px | 6px |
| Small | 14px | 12px | 8px |
| Base (default) | 14px | 16px | 10px |
| Large | 16px | 20px | 12px |
| Extra large | 16px | 24px | 14px |

## Variants

### Brand
- **Background:** a vertical deep-green gradient — `brand` at the top easing into the darker `brand-strong` at the bottom (e.g. `linear-gradient(180deg, brand 0%, brand-strong 100%)`). Keep both stops dark so white text stays high-contrast (≥4.5:1); the gradient is for subtle volume and a lit-from-above feel, not for lightening the surface.
- **Border:** transparent
- **Text:** white
- **Hover:** gradient lifts one step toward `brand` overall (still dark), button rises 1px, shadow steps up — all eased smoothly over 200ms
- **Focus ring:** 4px, brand-medium color
- **Glint:** top-edge highlight (`--color-1-400` → `--color-1-700`, fading down)

### Secondary
- **Background:** neutral-secondary-medium
- **Border:** border-default-medium
- **Text:** body color
- **Hover:** neutral-tertiary-medium background, heading text color
- **Focus ring:** 4px, neutral-tertiary color
- **Glint:** faint top-edge highlight (`--color-1-400` → `--color-1-700`)

### Tertiary
- **Background:** neutral-primary-soft
- **Border:** border-default
- **Text:** body color
- **Hover:** neutral-secondary-medium background, heading text color
- **Focus ring:** 4px, neutral-tertiary-soft color
- **Glint:** faint top-edge highlight (`--color-1-400` → `--color-1-700`)

### Success
- **Background:** success token
- **Border:** transparent
- **Text:** white
- **Hover:** success-strong background
- **Focus ring:** 4px, success-medium color
- **Glint:** top-edge highlight (`--color-1-400` → `--color-1-700`, fading down)

### Danger
- **Background:** danger token
- **Border:** transparent
- **Text:** white
- **Hover:** danger-strong background
- **Focus ring:** 4px, danger-medium color
- **Glint:** top-edge highlight (`--color-1-400` → `--color-1-700`, fading down)

### Warning
- **Background:** warning token
- **Border:** transparent
- **Text:** white
- **Hover:** warning-strong background
- **Focus ring:** 4px, warning-medium color
- **Glint:** top-edge highlight (`--color-1-400` → `--color-1-700`, fading down)

### Dark
- **Background:** dark token
- **Border:** transparent
- **Text:** white
- **Hover:** dark-strong background
- **Focus ring:** 4px, neutral-tertiary color
- **Glint:** top-edge highlight (`--color-1-400` → `--color-1-700`, fading down)

### Ghost (NO shadow, NO glint)
- **Background:** transparent
- **Border:** transparent
- **Text:** heading color
- **Hover:** neutral-secondary-medium background
- **Focus ring:** 4px, neutral-tertiary color
- **No shadow, no glint effect**

### Disabled (NO shadow, NO glint)
- **Background:** disabled token
- **Border:** border-default-medium
- **Text:** fg-disabled color
- **Cursor:** not-allowed
- **No hover, no focus, no shadow, no glint**

## Icons in Buttons

- Icon size: 16x16px
- Spacing: 8px gap between icon and label
- Layout: inline-flex, vertically centered

---

## Source file: `cards.md`

# Cards

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `typography.md`

## Core Specs

- **Background:** subtle top→bottom gradient (neutral-primary-soft → neutral-primary) for depth
- **Border:** 1px solid border-default (subtle separation from the page)
- **Radius:** 12px (base)
- **Shadow:** shadow-md (soft depth that lifts the card off the dark background)

## Card Heading

- Desktop: 20px, medium weight, heading color
- Mobile: 16px, medium weight, heading color
- Never skip heading levels — the page hierarchy must logically arrive at the card heading level.

## States

### Static Card (no interactivity)
- Background: gradient (neutral-primary-soft → neutral-primary)
- Border: 1px solid border-default
- Radius: 12px
- Shadow: shadow-md
- No hover styles. Non-interactive cards must NOT have hover background or elevation changes.

### Interactive Card (clickable)
- Same base styles as static card
- Hover: brighter gradient (neutral-primary-medium → neutral-primary-soft), border-default-strong, shadow steps up to shadow-lg
- Transition: background, border, and shadow
- Cursor: pointer

## Rules

- Background: subtle gradient for depth (low-contrast — felt, not seen)
- Border: 1px solid border-default
- Radius: 12px (base)
- Shadow: shadow-md (shadow-lg on interactive hover)
- Interactive hover: brighter gradient + stronger border + one elevation step up
- Non-interactive: no hover styles

---

## Source file: `colors.md`

# Color Tokens

## Background Tokens

### Neutral
| Token | Light | Dark |
|---|---|---|
| neutral-primary-soft | #121110 | #121110 |
| neutral-primary | #0A0908 | #0A0908 |
| neutral-primary-medium | #1A1816 | #1A1816 |
| neutral-primary-strong | #3A3531 | #3A3531 |
| neutral-secondary-soft | #121110 | #121110 |
| neutral-secondary | #0A0908 | #0A0908 |
| neutral-secondary-medium | #1A1816 | #1A1816 |
| neutral-secondary-strong | #3A3531 | #3A3531 |
| neutral-tertiary-soft | #121110 | #121110 |
| neutral-tertiary | #1A1816 | #1A1816 |
| neutral-tertiary-medium | #3A3531 | #3A3531 |
| neutral-quaternary | #3A3531 | #3A3531 |
| quaternary-medium | #4A453F | #4A453F |
| gray | #4A453F | #4A453F |

### Brand
| Token | Light | Dark |
|---|---|---|
| brand-softer | #05140D | #05140D |
| brand-soft | #07291B | #07291B |
| brand | #166534 | #166534 |
| brand-medium | #0B3D20 | #0B3D20 |
| brand-strong | #14532D | #14532D |

### Status
| Token | Light | Dark |
|---|---|---|
| success-soft | #002C22 | #002C22 |
| success | #009966 | #009966 |
| success-medium | #004F3B | #004F3B |
| success-strong | #007A55 | #007A55 |
| danger-soft | #4D0218 | #4D0218 |
| danger | #C70036 | #C70036 |
| danger-medium | #8B0836 | #8B0836 |
| danger-strong | #A50036 | #A50036 |
| warning-soft | #7C2D12 | #7C2D12 |
| warning | #F97316 | #F97316 |
| warning-medium | #7C2D12 | #7C2D12 |
| warning-strong | #C2410C | #C2410C |

### Button Glint (CSS custom properties — top-edge glint highlight enabled)
| Variable | Light | Dark |
|---|---|---|
| `--color-1-400` | rgba(255,255,255,0.25) | rgba(255,255,255,0.25) |
| `--color-1-700` | rgba(255,255,255,0.04) | rgba(255,255,255,0.04) |

### Utility
| Token | Light | Dark |
|---|---|---|
| dark | #2D2825 | #2D2825 |
| dark-strong | #443E3B | #443E3B |
| disabled | #2D2825 | #2D2825 |

### Accent
| Token | Value (same both modes) |
|---|---|
| purple | #A855F7 |
| sky | #0EA5E9 |
| teal | #0D9488 |
| pink | #DB2777 |
| cyan | #06B6D4 |
| fuchsia | #C026D3 |
| indigo | #4F46E5 |
| orange | #FB923C |

## Text Color Tokens

### Base
| Token | Light | Dark |
|---|---|---|
| white | #FFFFFF | #FFFFFF |
| black | #1A1714 | #1A1714 |
| heading | #F7F8F8 | #F7F8F8 |
| body | #B0A8A0 | #B0A8A0 |
| body-subtle | #847D76 | #847D76 |

### Brand
| Token | Light | Dark |
|---|---|---|
| fg-brand-subtle | #07291B | #07291B |
| fg-brand | #4ADE9A | #4ADE9A |
| fg-brand-strong | #86EFC0 | #86EFC0 |

### Status
| Token | Light | Dark |
|---|---|---|
| fg-success | #065F46 | #065F46 |
| fg-success-strong | #10B981 | #10B981 |
| fg-danger | #F43F5E | #F43F5E |
| fg-danger-strong | #F87171 | #F87171 |
| fg-warning-subtle | #F97316 | #F97316 |
| fg-warning | #FBBF24 | #FBBF24 |
| fg-disabled | #7A7572 | #7A7572 |

### Informational / Accent
| Token | Light | Dark |
|---|---|---|
| fg-yellow | #FACC15 | #FACC15 |
| fg-info | #93C5FD | #93C5FD |
| fg-purple | #A855F7 | #A855F7 |
| fg-purple-strong | #DDD6FE | #DDD6FE |
| fg-cyan | #06B6D4 | #06B6D4 |
| fg-indigo | #4F46E5 | #4F46E5 |
| fg-pink | #DB2777 | #DB2777 |
| fg-lime | #84CC16 | #84CC16 |

## Border Color Tokens

| Token | Light | Dark |
|---|---|---|
| border-dark | #5C5552 | #5C5552 |
| border-buffer | #0A0908 | #0A0908 |
| border-buffer-medium | #2D2825 | #2D2825 |
| border-buffer-strong | #443E3B | #443E3B |
| border-muted | #141210 | #141210 |
| border-light-subtle | #141210 | #141210 |
| border-light | #2D2825 | #2D2825 |
| border-light-medium | #443E3B | #443E3B |
| border-default-subtle | #141210 | #141210 |
| border-default | #2D2825 | #2D2825 |
| border-default-medium | #443E3B | #443E3B |
| border-default-strong | #5C5552 | #5C5552 |
| border-success-subtle | #064E3B | #064E3B |
| border-success | #065F46 | #065F46 |
| border-danger-subtle | #881337 | #881337 |
| border-danger | #BE123C | #BE123C |
| border-warning-subtle | #7C2D12 | #7C2D12 |
| border-warning | #F97316 | #F97316 |
| border-brand-subtle | #07291B | #07291B |
| border-brand-light | #2FB47D | #2FB47D |
| border-brand | #3ECF8E | #3ECF8E |
| border-dark-subtle | #443E3B | #443E3B |
| border-purple | #A855F7 | #A855F7 |
| border-orange | #FB923C | #FB923C |

## Semantic Usage Rules

- Page/section backgrounds: neutral-primary (default), neutral-primary-soft (alternating/elevated)
- Primary buttons: brand background
- Headings: heading text color
- Body text: body text color
- CTA links: fg-brand text color
- Default borders: border-default
- Status borders match intent: success → border-success, danger → border-danger, warning → border-warning
- Disabled: disabled background + fg-disabled text

## Prohibited

- No raw hex/rgb values in component code — always use design tokens
- No brand text color for long-form paragraphs
- No accent text tokens (fg-purple, etc.) for body copy or navigation
- No brand/accent backgrounds for large layout surfaces (pages, sections) unless it's a hero/campaign area
- No manual light/dark value swapping — the interface is dark-only; let the CSS custom properties handle it

---

## Source file: `content.md`

# Content & Grid System

> Dependencies: `layout.md`, `typography.md`

## Containers

| Type | Max width | Horizontal padding |
|---|---|---|
| Standard | 1280px | 32px |
| Internal (reading) | 768px | — (45–75 char line length) |

## Vertical Padding

| Breakpoint | Vertical padding |
|---|---|
| Mobile | 48px |
| Tablet (≥768px) | 80px |
| Desktop (≥1024px) | 120px for all sections |

## Grid System

Mobile-first with flexible desktop configurations.

| Context | Gap |
|---|---|
| Standard content/cards | 48px |
| Compact widgets/metadata | 24px |

### Responsive Columns

| Breakpoint | Columns |
|---|---|
| Mobile (default) | 1 |
| Small/Tablet (≥640px) | 2 |
| Desktop (≥1024px) | 2–3 |

Primary content layout uses 2 or 3 columns for body paragraphs on desktop, following the editorial reference style.

## Breakpoints

| Name | Width |
|---|---|
| Small | 640px |
| Medium | 768px |
| Large | 1024px |
| Extra large | 1280px |
| 2x Extra large | 1536px |

## Rules

- Always design mobile-first
- Use layout shifts (column → row) to accommodate horizontal space
- Lists: 24px indentation, 8px vertical gap between items
- Body copy: 16px, 1.625 line-height
- All interactive links follow brand underline/hover protocol
- Paragraphs should flow in 2 or 3 columns on desktop for a spacious editorial feel
- Big photographs break up content and span full container width

---

## Source file: `dropdown.md`

# Dropdown

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `inputs.md`

## Core Specs

### Chevron Icon
- Size: 16x16px
- Spacing: 6px left margin, -2px right margin
- Color: inherits from trigger button

### Menu Container
- Background: neutral-primary-soft
- Border: 1px, border-default
- Radius: 12px (base)
- Shadow: shadow-sm
- Z-index: elevated above content

### Menu List
- Padding: 8px
- Font: 14px, body color, medium weight

### Menu Item
- Layout: inline-flex, vertically centered, full width
- Padding: 8px horizontal, 8px vertical
- Radius: 8px (default)
- Hover: neutral-tertiary-medium background, heading text
- Transition: colors, 150ms

## Trigger Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Small | 14px | 12px | 8px |
| Base | 14px | 16px | 10px |
| Large | 16px | 20px | 12px |

## Icon-only Trigger

- Padding: 8px
- Min size: 44x44px
- Icon: 20x20px

## Variants

### Default
- Menu width: 176px, items have 8px radius

### With Divider
- Top border (border-default) between child groups, skip first group

### With Header
- Header padding: 16px horizontal, 12px vertical
- Bottom border: border-default
- Name: heading color, 14px, semibold weight
- Email: body-subtle color, 14px, truncated

### With Icons
- Icon before label: 16x16px, 8px right margin, body color
- On hover, icon color changes to heading

### With Checkbox / Radio
- Inputs: 16x16px, 4px radius, focus ring in brand-soft
- Helper text: 12px, body-subtle color, 2px top margin

### With Search
- Search input at top of menu following `inputs.md` specs
- Left icon: 12px left padding, input 36px left padding

### Scrollable
- Max height: 192px, vertical scroll overflow

## States

| State | Appearance |
|---|---|
| Focused trigger | no outline, 2px brand ring |
| Hover item | neutral-tertiary-medium background, heading text |
| Active/open item | neutral-tertiary-soft background, heading text |
| Disabled item | fg-disabled text, not-allowed cursor, no pointer events |

---

## Source file: `icon-shapes.md`

# Icon Shapes

> Dependencies: `colors.md`, `radius.md`

## Core Specs

- Box sizing: border-box
- Icon must be perfectly centered (inline-flex, centered both axes)
- Circle: fully rounded (9999px)
- Rounded square: 12px radius (MD/LG/XL), 8px radius (XS/SM)

## Sizes

| Size | Container | Icon |
|---|---|---|
| XS | 24x24px | 14x14px |
| SM | 32x32px | 16x16px |
| MD | 40x40px | 20x20px |
| LG | 48x48px | 24x24px |
| XL | 56x56px | 28x28px |

## Color Variants

### Brand
- Shape: circle
- Background: brand-softer
- Icon color: fg-brand-strong

### Gray
- Shape: circle
- Background: neutral-secondary-soft
- Icon color: body

### Danger
- Shape: circle
- Background: danger-soft
- Icon color: fg-danger-strong

### Success
- Shape: circle
- Background: success-soft
- Icon color: fg-success-strong

### Warning
- Shape: circle
- Background: warning-soft
- Icon color: fg-warning

---

## Source file: `inputs.md`

# Inputs

> Dependencies: `colors.md`, `radius.md`

## Core Specs

- **Display:** block, full width
- **Radius:** 8px (rounded)
- **Border:** 1px, border-default-medium
- **Background:** neutral-secondary-medium
- **Shadow:** none
- **Font:** 14px, heading color
- **Padding:** 12px horizontal, 10px vertical
- **Placeholder:** body color
- **Transition:** all properties, 200ms

## Label

- Display: block
- Font: 14px, medium weight, heading color
- Margin bottom: 8px
- Label `htmlFor` must match the input `id`

## States

### Default
- Border: border-default-medium
- Background: neutral-secondary-medium

### Hover
- Border: border-default-strong

### Focus
- No outline
- Border: border-brand
- Ring: 1px, brand color

### Success
- Border: border-success
- Focus ring: 1px, success color

### Error / Danger
- Border: border-danger
- Focus ring: 1px, danger color

### Disabled
- Background: disabled
- Text: fg-disabled
- Cursor: not-allowed

## Input with Icons

- Icon size: 16x16px
- Icon color: body
- Container: relative positioned wrapper
- Start icon: absolutely positioned left, 12px left padding — input gets 36px left padding
- End icon: absolutely positioned right, 12px right padding — input gets 36px right padding
- Icons vertically centered within the wrapper

## Rules

- Every input must have a unique `id`
- Every label must have a matching `htmlFor`
- Padding: 12px horizontal, 10px vertical unless overridden for icon variants
- No arbitrary hex or hardcoded colors

---

## Source file: `layout.md`

# Layout & Spacing

## Spacing Rhythm

Base unit: **8px**. All spacing values should be multiples of 8px.

| Context | Value |
|---|---|
| Section vertical padding | 120px |
| Section header → content | 64px or 80px |
| Heading → paragraph | 24px |
| Container horizontal padding | 32px |
| Flex/grid row gap | 24px |
| Card grid gap | 32px |
| Wide component grid gap | 48px |
| Column layout gap | 64px |

## Container

Standard section container: max-width 1280px, centered, 32px horizontal padding.

Every major section wraps content in this container.

## Content Composition Order

Inside each section, follow this order:
1. Heading (`h1`–`h3`)
2. Leading paragraph
3. Normal paragraph(s) in 2 or 3 columns
4. Lists, CTA links, or component grids

## Section Pattern

Each section has:
- 120px vertical padding — **equal top and bottom** (never asymmetric)
- A uniform dark background color: #0A0908 (neutral-primary) for all sections
- A centered container (max-width 1280px, 32px horizontal padding)
- A section header area with 64px or 80px bottom margin
- Section content below

**Consistent section spacing:** Every section uses the same vertical padding top and bottom, and the gap between any two adjacent sections is identical across the whole page. Do not vary the rhythm from one section to the next — the breathing room between sections must read as one consistent beat.

## Motion & Animation

- Prefer CSS-native: `transition`, `animation`, `@keyframes`. Use Motion library only when CSS cannot achieve the behavior.
- Prioritize high-impact orchestrated moments over scattered micro-interactions. A single well-sequenced page-load animation using staggered `animation-delay` delivers more perceived quality than many isolated effects.
- Reserve scroll-triggered and hover transitions for moments that reinforce hierarchy or reward attention.

## Backgrounds & Visual Depth

- Default to a single, uniform warm near-black background (#0A0908) across all sections for a deep, focused feel.
- Build depth with restraint: subtle vertical gradients (slightly lighter top → deeper bottom), faint radial glows behind hero content, and soft 1px borders that separate elevated surfaces from the background. Keep gradients low-contrast — depth should be felt, not seen.
- Elevated surfaces (cards, modals, popovers) read as lifted via a gentle gradient fill plus a soft shadow, never via heavy outlines or bright fills.
- Every visual element must serve a compositional purpose (hierarchy, separation, or emphasis). No purely ornamental effects competing with content.

## Must

- All sections: consistent 120px vertical padding, equal top and bottom
- Spacing between adjacent sections is identical everywhere on the page — one consistent rhythm
- All containers: max-width 1280px, centered, 32px horizontal padding
- Section headers: 64px or 80px bottom margin
- Generous vertical rhythm with large breathing room between sections and around headings
- Layouts readable and properly spaced on both desktop and mobile
- Big photographs used to punctuate content, spanning full container width or used as hero elements
- Body paragraphs arranged in 2 or 3 columns for readability

---

## Source file: `lists.md`

# Lists

> Dependencies: `colors.md`

## Core Specs

- Item spacing: 16px vertical gap between list items
- Text: body color

## List Icons

- Size: 20x20px
- Prevent squishing: no shrink
- Spacing: 6px right margin between icon and text
- Active/featured icon: fg-brand color
- Neutral icon: body color

## Inactive / Disabled Items

Strikethrough text with body color decoration on the list item.

## Pattern

Vertical flex list with 16px gap. Each item is a flex row with centered alignment — icon (20x20, no-shrink, 6px right margin) followed by a span of body-colored text.

---

## Source file: `modals.md`

# Modals

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `buttons.md`, `inputs.md`

## Core Specs

### Overlay (Backdrop)
- Fixed, covers full screen
- Z-index: 40
- Background: black at 50% opacity
- Backdrop blur: small amount

### Content Container
- Background: neutral-primary
- Radius: 12px (base)
- Shadow: shadow-lg
- Padding: 20px

## Anatomy

### Header
- Bottom border: border-default
- Top corners rounded (12px)
- Title: 20px, semibold weight, heading color
- Close button: Ghost variant from `buttons.md`, 6px padding

### Body
- Vertical padding: 24px
- Vertical spacing between elements: 24px
- Text: 16px, 1.625 line-height, body color

### Footer
- Top border: border-default
- Bottom corners rounded (12px)

## Variants

### Default (Information)
Standard header + body + footer with primary/secondary action buttons.

### Pop-up (Confirmation)
Centered text, prominent icon, reduced padding:
- Body: 24px padding, text centered
- Icon: centered, 16px bottom margin, 48x48px, gray color

### Form Modal
Body contains inputs following `inputs.md`. Vertical spacing between form elements: 16px.

## Rules

- Backdrop covers full screen with fixed positioning
- Content: neutral-primary background, 12px radius, shadow-lg
- Header/Footer separated by border-default borders
- Close button must be present and functional
- Accessibility: `role="dialog"`, implement focus trap in code
- Dark mode automatic via token system

---

## Source file: `pagination.md`

# Pagination

> Dependencies: `colors.md`, `radius.md`

## Container

Font: 14px. Items displayed as flex with -1px overlap for seamless borders.

## Pagination Item

- Layout: flex, centered both axes
- Size: 36x36px (or 40x40px)
- Text: body color, medium weight
- Background: neutral-secondary-medium
- Border: 1px, border-default-medium
- Hover: neutral-tertiary-medium background, heading text
- Focus: no outline
- Overlap: -1px left margin

## Previous / Next Buttons

- Horizontal padding: 12px, height: 36px
- First item: 9999px radius on inline-start side
- Last item: 9999px radius on inline-end side

## Active Page Item

- Text: fg-brand color
- Background: neutral-tertiary-medium
- Hover text: fg-brand (stays same)

## Rules

- Display as flex with -1px child overlap for seamless borders
- Items: neutral-secondary-medium background, border-default-medium border, body text
- Active: fg-brand text, neutral-tertiary-medium background
- First item: rounded start (9999px), Last item: rounded end (9999px)
- All items need hover and focus states

---

## Source file: `radios-checkboxes-toggle.md`

# Radios, Checkboxes & Toggles

> Dependencies: `colors.md`, `radius.md`

## Checkbox

- Size: 16x16px
- Radius: 4px
- Border: 1px, border-default-medium
- Background: neutral-secondary-medium
- Focus ring: 2px, brand-soft

### Disabled
- Border: border-light
- Text: fg-disabled

## Radio

- Size: 16x16px
- Radius: fully rounded
- Border: 1px, border-default-medium
- Background: neutral-secondary-medium
- Focus ring: 2px, brand-soft
- Checked: border-brand, indicator: neutral-primary color

### Disabled
- Border: border-light-medium
- Text: fg-disabled

Group all radio items under the same `name` attribute.

## Toggle

### Track
- Fully rounded
- Background: neutral-quaternary
- Focus-within ring: 2px, brand-soft
- Checked track: brand background
- Disabled track: neutral-tertiary background

### Thumb
- Fully rounded
- Background: white
- Border: border-buffer

### Disabled
- Track: neutral-tertiary background
- Label: fg-disabled text

## Rules

- All selection inputs must have `id` matching label `htmlFor`
- Focus states use the appropriate brand token for each control type
- Disabled states: no hover/focus interaction

---

## Source file: `radius.md`

# Border Radius

| Token | Value | Default usage |
|---|---|---|
| base | 12px | Cards, modals, sections, containers, accordion wrappers |
| default | 8px | Buttons, inputs, tooltips, dropdown items, small controls |
| sm | 4px | Checkboxes, tiny elements |
| full | 9999px | Badges, pills, avatars, toggles, dot indicators |

## Rules

- 8px (default) is the radius for buttons and inputs — rounded rectangles, not pills
- 12px (base) is used for container-level elements like cards, modals, sections, and accordion wrappers
- 9999px (full) is reserved for genuinely circular/pill elements: badges, avatars, toggles, dot indicators
- Cards use 12px (base) radius
- Never use arbitrary radius values outside this scale
- Radius must be consistent within each component family

---

## Source file: `shadows.md`

# Shadows

| Token | CSS value |
|---|---|
| shadow-2xs | `0 1px rgb(0 0 0 / 0.20)` |
| shadow-xs | `0 1px 2px 0 rgb(0 0 0 / 0.24)` |
| shadow-sm | `0 1px 3px 0 rgb(0 0 0 / 0.30), 0 1px 2px -1px rgb(0 0 0 / 0.30)` |
| shadow-md | `0 4px 12px -2px rgb(0 0 0 / 0.36), 0 2px 6px -2px rgb(0 0 0 / 0.32)` |
| shadow-lg | `0 12px 28px -6px rgb(0 0 0 / 0.45), 0 6px 12px -6px rgb(0 0 0 / 0.40)` |
| shadow-xl | `0 24px 48px -12px rgb(0 0 0 / 0.55), 0 12px 20px -8px rgb(0 0 0 / 0.45)` |
| shadow-2xl | `0 32px 64px -16px rgb(0 0 0 / 0.65)` |

## Component Mapping

| Component type | Token |
|---|---|
| Subtle separators, tiny UI details | shadow-2xs or shadow-xs |
| Inputs, small controls | none (flat by default) |
| Buttons, popovers, dropdowns | shadow-sm |
| Standard cards | shadow-md |
| Prominent cards, sticky surfaces | shadow-lg |
| Modals, high-priority overlays | shadow-lg |
| Hero overlays, top-level emphasis (sparingly) | shadow-xl |

## Rules

- Use only these tokens — no custom box-shadow values
- Prefer flat/no-shadow for most components; elevate sparingly for emphasis
- Keep elevation steps intentional; avoid jumping multiple levels
- Components in the same family share the same baseline elevation
- Hover/focus on interactive elevated elements: step up by one level
- Never stack multiple shadow tokens on one element
- Never use shadow-xl/shadow-2xl for dense list items or body containers

---

## Source file: `sidebars.md`

# Sidebars

> Dependencies: `colors.md`, `radius.md`, `typography.md`, `badges.md`, `alerts.md`

## Core Specs

- Background: neutral-primary-soft
- Right border: 1px, border-default (for left-sidebar); left border for right-sidebar
- Width: 256px

## Anatomy

### Outer Container
Hidden on mobile, visible at small breakpoint. Needs a toggle/trigger for mobile.

### Inner Wrapper
- Full height, vertical scroll overflow
- Padding: 12px horizontal, 16px vertical

### Navigation List
- Vertical spacing: 8px between items
- Font weight: medium

### Navigation Item
- Layout: flex, vertically centered
- Padding: 8px horizontal, 8px vertical
- Text: heading color
- Radius: 9999px (pill)
- Hover: neutral-secondary-medium background
- Transition: colors
- Icon: 20x20px, body color, hover → heading color, 75ms transition
- Label: 12px left margin from icon

### Active Item
- Background: neutral-secondary-strong
- Text: fg-brand-strong

### Separator
- 16px top padding, 16px top margin
- Top border: border-default
- 8px vertical spacing below

### Bottom CTA / Card
- Padding: 16px
- Top margin: 24px
- Radius: 12px (base)
- Background: brand-softer
- Can also use any alert variant from `alerts.md`

## Rules

- Responsive: hidden on mobile with a trigger mechanism
- Icons: 20x20px, body color (hover: heading color)
- Multi-level menus: indent with 44px left padding
- Spacing follows 8px grid
- Only neutral, brand, or status tokens — no arbitrary colors

---

## Source file: `tables.md`

# Tables

> Dependencies: `colors.md`, `radius.md`, `shadows.md`

## Wrapper

- Horizontal scroll overflow
- Background: neutral-primary-soft
- Radius: 12px (base)
- Border: 1px, border-default
- Shadow: none

## Table Element

- Full width, left-aligned text (right-aligned for RTL)
- Font: 14px, body color

## Table Head

- Font: 14px, body color, medium weight
- Background: neutral-secondary-soft
- Bottom border: border-default
- Cell padding: 24px horizontal, 12px vertical

## Table Body

- Row background: neutral-primary
- Row bottom border: border-default (omit on last row to avoid doubling with wrapper border)
- Row hover: neutral-secondary-soft background (optional)
- Row header: medium weight, heading color, no-wrap
- Cell padding: 24px horizontal, 16px vertical

## Rules

- Wrapper must have horizontal scroll overflow for responsive scrolling
- Last row: omit bottom border to avoid doubling with wrapper border
- Row headers: always `scope="row"` for semantic structure
- Hover on rows is optional
- No arbitrary hex codes — use token colors only

---

## Source file: `tabs.md`

# Tabs

> Dependencies: `colors.md`, `radius.md`, `shadows.md`

## Core Specs

- Typography: 14px, medium weight, body color
- Transitions: all properties, 200ms

## Variants

### 1. Underline (Default)

**Wrapper:** bottom border, border-default

**Tab Item:**
- Padding: 16px horizontal, 16px vertical
- Bottom border: 2px, transparent
- Top corners: 12px radius
- Transition: colors, 150ms

| State | Appearance |
|---|---|
| Active | fg-brand text, border-brand bottom border |
| Inactive | transparent bottom border; hover → heading text, border-default-strong bottom border |
| Disabled | fg-disabled text, not-allowed cursor |

### 2. Pills

**Tab Item:**
- Padding: 16px horizontal, 10px vertical
- Radius: 9999px (pill)
- Font weight: medium
- Transition: all, 200ms

| State | Appearance |
|---|---|
| Active | brand background, white text, shadow-sm |
| Inactive | body text; hover → neutral-secondary-soft background, heading text |
| Disabled | fg-disabled text, not-allowed cursor |

### 3. Full Width

Children overlap with -1px left margin on all except first.

**Tab Item:**
- Full width, centered text
- Padding: 16px horizontal, 16px vertical
- Background: neutral-primary-soft
- Border: 1px, border-default
- Transition: colors, 150ms
- Hover: neutral-secondary-medium background, heading text

| State | Appearance |
|---|---|
| Active | neutral-secondary-soft background, fg-brand text |
| First item | rounded start (9999px) |
| Last item | rounded end (9999px) |

## Tabs with Icons

- Icon size: 16x16px or 20x20px
- Spacing: 8px right margin
- Layout: inline-flex, centered
- Icons inherit the text color of the tab state

---

## Source file: `tooltips-popovers.md`

# Tooltips & Popovers

> Dependencies: `colors.md`, `radius.md`, `shadows.md`

## Tooltips

### Core Specs
- Padding: 12px horizontal, 8px vertical
- Font: 14px, medium weight
- Radius: 8px (default)
- Shadow: shadow-xs
- Transition: opacity, 300ms

### Dark (Default)
- Background: dark
- Text: white
- Border: transparent

### Light
- Background: neutral-primary-medium
- Text: heading color
- Border: 1px, border-default

## Popovers

### Core Specs
- Background: neutral-primary
- Radius: 12px (base)
- Shadow: shadow-sm
- Border: 1px, border-default
- Transition: opacity, 300ms

### Header / Title
- Padding: 12px horizontal, 8px vertical
- Background: neutral-secondary-soft
- Bottom border: border-default
- Font: 14px, medium weight, heading color

### Body / Content
- Standard: 12px horizontal, 8px vertical padding; 14px, body color
- Rich: 16px padding; 14px, body color

## Arrows

- Size: 8x8px rotated 45deg
- Color must match the background of the tooltip/popover variant

## Rules

- Tooltips: 8px radius
- Popovers: 12px radius
- Dark tooltips: dark background, white text
- Light tooltips/popovers: semantic neutral background + border tokens
- Arrows match parent background color

---

## Source file: `typography.md`

# Typography

> Dependencies: `colors.md`

## Core Rules

- **Font:** Space Mono, monospace — configured at app level, never override
- **Headings:** bold weight (700, the heaviest Space Mono weight), heading text color
- **Body copy:** body text color, never use brand color for paragraphs longer than one sentence
- **Semantic HTML:** Use `h1`–`h6` in order, never skip levels

## Heading Scale

### Desktop

| Element | Size | Line-height | Letter-spacing | Margin-bottom |
|---|---|---|---|---|
| `h1` | 72px | 1 | -1.5px | 32px |
| `h2` | 64px | 1.05 | -1px | — |
| `h3` | 48px | 1.1 | -0.5px | — |
| `h4` | 36px | 1.15 | — | — |
| `h5` | 28px | 1.3 | — | — |
| `h6` | 22px | 1.25 | — | — |

### Responsive

| Element | Tablet (≥768px) | Mobile (default) |
|---|---|---|
| `h1` | 64px | 48px |
| `h2` | 48px | 36px |
| `h3` | 36px | 28px |
| `h4` | 30px | 24px |
| `h5` | 24px | 22px |
| `h6` | 20px | 18px |

Mobile-first: start with mobile sizes, scale up at tablet and desktop breakpoints.

Never reduce line-height below 1.1 for any heading.

## H1 Usage by Context

- **Only the hero uses the 72px `h1`.** The large display `h1` (72px desktop) is reserved for the hero/landing headline — one per page, at the top.
- **All other sections use `h2` and `h3` sizes for their headings.** Section titles below the hero must scale down to `h2` (64px) or `h3` (48px); never repeat the 72px display size further down the page.
- **Dashboard and ecommerce `h1` is maximum 28px.** In app/product contexts (dashboards, ecommerce, and similar dense UI), the page `h1` must not exceed 28px — these interfaces use a compact heading scale, not the editorial display sizes.

## Paragraphs

### Leading Paragraph
- Size: 20px
- Weight: normal
- Color: body
- Line-height: 1.7
- Max width: ~70 characters

### Normal Paragraph
- Size: 16px
- Weight: normal
- Color: body
- Line-height: 1.7
- Max width: ~65 characters

### Small Supporting Copy
- Size: 14px
- Weight: normal
- Color: body
- Line-height: 1.6
- Use only for helper text, legal text, captions, metadata.

## UI Labels

| Context | Size | Weight |
|---|---|---|
| Button labels | 16px | 500 (medium) |
| Input labels | 14px or 16px | 500 (medium) |
| Captions / meta / badges | 12px or 14px | 500 (medium) |

Do not apply paragraph line-height (1.7) to control labels.

## Links

- **Inline links:** Same size as surrounding text, fg-brand color, underline, hover → no underline
- **CTA links:** fg-brand color, medium weight, underline, hover → no underline

## Emphasis

- `<strong>` for high-priority emphasis in body text
- `<em>` for tone emphasis only, not visual hierarchy
- All-caps only for short labels: uppercase, 0.4px letter-spacing, 12px or 14px

## Dark Mode

The interface is dark-mode only. Hierarchy, size, weight, and spacing stay constant across the system; color comes from the dark token values via CSS custom properties.