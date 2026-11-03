# Dhairya Portfolio — PRD / Memory

## User ground rules (always win over soft-skill rules)
1. Do only what each message asks; no extra sections/pages/features/content/images.
2. Never invent facts; use marked placeholders and remind the user.
3. Change only the named part.
4. Ask one short question if unclear or breaking.
5. After every change, list exactly what changed.
6. Don't run ahead.
- Design latitude (user, Nov 2026): treat the user's words as general direction and apply professional judgement so every design looks premium and "out of this world". Use the provided references (intro video, pull-cord/timeline video, Wispr Flow feel, gsap.com, threeui.com, motionsites.ai, 21st.dev) fully for motion/layout/feel, never copying text/logos/photos/code.

## Stack
React + Tailwind + GSAP (ScrollTrigger, CustomEase "soft") + Lenis. Frontend only.

## Design system
Light: bg #FFFFEB, cards #E4E4D0, text #1A1A1A, muted #666666. Dark: bg #141412, cards #22221F, text #FFFFEB, muted #A8A89A. Lavender buttons #F0D7FF, green panel #034F46 (Museum only), orange #FFA946 small accents. EB Garamond headings, Figtree body. Page 1280px, text 720px, 4px scale. No gradients/glow.

## Site map
/ : Intro (once per session, skip, reduced-motion skip) → Hero ("Portfolio" title + halftone portrait) → Timeline → Museum of Failures (4 exhibits) → Skills → Achievements → Contact.
/museum-of-failures/1-4 : full stories. /whisper : video placeholder, Voice Build Log, setup item (not in nav).

## Implemented
- Hero, timeline, museum cards, skills, achievements content (content.js); stories (stories.js)
- Intro: listening pill → Dhairya drops → scramble to Portfolio → wipe + FLIP to hero title → halftone assembles

## Pending (plan)
- Rename /whisper → /WISPR; remove eyebrows above section headings (keep hero one) — awaiting approval
- Pull-cord light/dark switch; rolling year digits in timeline
- Placeholders: contact, BSc line, hero links, eyebrow, Wispr content
