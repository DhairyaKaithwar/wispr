# Creative Pass — Dhairya's Portfolio

A visual redesign of the existing one-page portfolio, aiming for the bold scale and confidence of References 1 and 2.
Every word, fact, story, colour, font, the intro, the pull cord and the section order stay exactly as they are. Only layout, scale, composition, motion and visual detail change.

## Who it's for
- Recruiters and hiring managers skimming in under a minute, who need the role, experience and proof to read instantly.
- Engineers who open the four failure stories and read them in full.
- Visitors on phones, which is likely most first visits from LinkedIn.

## Core features and experience

### Locked (unchanged)
- All content text and the four stories, word for word. If a design needs shorter text, the builder asks rather than rewrites.
- Section order: hero, timeline, Museum of Failures, Skills, Achievements, Contact.
- Colour palette: cream, cards, ink, muted, lavender, green panel, orange accent, and the dark-mode set.
- Fonts: EB Garamond for headings and Figtree for body.
- The intro sequence: listening pill, letters tumbling, letter-by-letter morph into "Portfolio.", the wipe and the portrait gathering.
- The pull-cord theme switch, dark mode and the halftone portrait.
- The phone number never appears anywhere.
- No new libraries beyond GSAP and Lenis, and no images except the portrait.

### 1. Hero (like Reference 2 frame 1)
- **Main headline:** "Hi, I'm Dhairya. I am a" followed by a flipping card. The card turns over every few seconds through three roles: "Full-stack engineer", "Backend engineer", "Builder of agentic AI systems".
- **Supporting text:** the existing positioning line and sub-line sit below it, unchanged.
- **Portrait:** stays as the halftone, on the right on desktop and on top on mobile.
- **"Portfolio.":** the intro's word now lands very large, in the soft card tone, as a background layer behind the portrait. It never sits behind the greeting, and it stays subtle in both themes. On mobile it crops off the edge rather than shrinking.
- **Buttons, now real links:**
  - Resume: the Google Drive link, opening in a new tab
  - LinkedIn: linkedin.com/in/dhairya-kaithwar-570033133, opening in a new tab
  - GitHub: github.com/DhairyaKaithwar, opening in a new tab
  - Email: opens a new email to dhairya9d@gmail.com
- **Dark-mode portrait:** redrawn so it reads naturally instead of like a photo negative.

### 2. Timeline (like Reference 2 frames 4 and 5)
- **Left side:**
  - The "My story" label and the heading.
  - A much larger rolling year, about twice today's size, still rolling digit by digit.
  - The date range under the year.
  - A new counter, "01 / 04", that updates as you scroll.
- **Right side:**
  - The thin vertical line with a glowing orange dot that travels to the active entry.
  - Only the active entry at full strength; the others fade back further than now.
- **Desktop:** pinned while the years change, as now.
- **Mobile:** unpinned, with the year above each entry.

### 3. Museum of Failures (doors, like Reference 2 frame 3)
- **Doors:** four tall doors on the green panel. Each door's front shows "Exhibit 01" to "Exhibit 04" and the exhibit's title in large EB Garamond, so nothing is hidden from a visitor who doesn't interact.
- **Desktop:**
  - The section pins. Scrolling opens the doors one at a time.
  - The active doorway widens while the others narrow. Its door swings back on its hinge, a soft warm light spills out from behind it, and the exhibit's plaque is revealed inside.
- **Plaque:**
  - A plaque-like card showing "Exhibit 0X", the title, and the four labelled lines: Problem, Decision, Outcome, Lesson.
  - A "Read the full story" button.
  - Generous spacing.
- **Progress indicator:** the "01 / 04" counter and line stay.
- **Mobile:** the doors stack vertically. Each opens when it scrolls into view or is tapped.
- **Reduced motion:** plaque cards are shown directly, with no doors.

### 4. Skills (like the chips in Reference 1 frame 10)
- The five groups (Backend, Data, AI, Frontend, Quality and delivery), each with its label.
- Every listed item becomes its own rounded pill.
- Pills change colour only on hover.

### 5. Achievements (big stat tiles)
Three large tiles, each a big number with its original wording as the caption:
- **"AIR 18"**, captioned "CUET PG DU MCA (2023)"
- **"99.37 percentile"**, captioned "Naukri Campus Young Turks (2024)"
- **"300+ problems solved"**, captioned "across LeetCode, GFG, CodeStudio; 5 LeetCode badges"

"99.37" and "300+" count up when the tiles come into view. "AIR 18" is static, with no count-up.

### 6. Contact (like Reference 2 frame 6)
- A large closing statement: "Let's build something reliable together".
- Two buttons: Email and LinkedIn.
- The Contact placeholder is removed.

### 7. Type, site-wide
- **Body text:** 18 pixels on desktop and 17 on mobile.
- **Headings:** section headings become noticeably larger.
- **Secondary text:** made stronger. See Assumptions for how this works within the locked palette.

### 8. Cleanup
- Every eyebrow placeholder is removed, including the one in the hero.

### 9. Route
- The Wispr page moves to /wispr. It still isn't linked from the menu.

### 10. Screenshot download removed
- The screenshot download page, the zip file and its download address are deleted. None of them can be reached from the published site in any way.

## User flow
1. The visitor lands, and the intro plays and can be skipped. "Portfolio." settles as a faint giant word behind the forming portrait.
2. The hero greets them with "Hi, I'm Dhairya. I am a" and the flipping role card, then the Resume, LinkedIn, GitHub and Email links.
3. Scrolling, the timeline pins: the year rolls, the counter ticks from 01 / 04 to 04 / 04, and the glowing dot moves down the line.
4. The Museum pins: the doors open one by one into plaques. "Read the full story" opens each story page.
5. Skills appear as grouped pills, then Achievements as big tiles. 99.37 and 300+ count up, and AIR 18 stays still.
6. The page closes on "Let's build something reliable together" with Email and LinkedIn.
7. The pull cord switches theme at any point. The menu jumps to My story, Museum of Failures, Skills and Contact.

## UI/UX feel
- **Editorial and gallery-like:** large serif headings, generous whitespace, calm motion.
- **One memorable idea per section:**
  - Hero: the flipping role card
  - Timeline: the giant rolling year with its glowing dot
  - Museum: the doors
  - Skills: the chips
  - Achievements: oversized numbers
  - Contact: the closing statement
- **Motion:** soft, eased and scroll-led. Hovers change colour only.
- **Checks:** every section is checked in light mode, dark mode and on mobile before handover.

## Implementation phases
- **Phase 1 (built now, the MVP):** every item in sections 1–10 above, checked in both themes and on mobile. Afterwards, a list of every change, by section.
- **Phase 2:** story pages get the same gallery treatment, with a plaque-style "My role" box and the larger type. Wispr page layout polish once its content exists.
- **Phase 3:** fill the remaining placeholders: the BSc timeline line and the Wispr page's video, build log and setup line. Then publish.

## Assumptions
- **Screenshots:** the new screenshots weren't received, so the design follows the three earlier recordings.
- **Glow and light spill:** the "glowing" timeline dot and the door "light spill" are allowed as exceptions to the earlier no-glow rule, because they were asked for in this pass. They are kept soft and small, and use the palette's orange and cream.
- **Secondary text:** the palette stays locked. Secondary paragraphs use the main ink colour at slightly reduced strength, darker than #666666 in light mode and brighter than #A8A89A in dark mode. #666666 and #A8A89A stay for small labels only.
- **Achievements:** the tiles split each line into a big figure and a caption without changing any words. Only 99.37 and 300+ count up.
- **AIR 18 everywhere:** it is static wherever it appears, including the tile and the timeline's "AIR 18 in CUET PG DU MCA". The other approved count-ups stay as they are: 3,000+, 99.8%, and the "18" in "18 typed tools".
- **Role card:** it cycles about every 2.5 seconds. With reduced motion it shows "Full-stack engineer" only, with no flipping.
- **Doors:** door fronts use the card tone on the green panel, with an orange exhibit number. Dark mode uses the dark card tone.
- **Wispr route:** /wispr also works as /WISPR. The old /whisper address redirects to /wispr.
- **Links:** Resume, LinkedIn and GitHub open in a new tab. Email opens the visitor's mail app.
- **The "My story" label** stays, since it's real text rather than a placeholder.
- **Placeholders that remain:**
  - The BSc timeline line
  - The /wispr page's general content placeholder, video embed, three build log items and setup line
