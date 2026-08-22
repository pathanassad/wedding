# Asad & Sanobar — Wedding Invitation V4

V4 is an updated editable version of the chapter-based invitation.

## Main changes from V3

- The guest-facing title is now **WEDDING INVITATION**, not ASAD & SANOBAR.
- Couple names are treated as the hero identity underneath the title.
- Typography was changed to a more editorial pairing:
  - DM Serif Display for major display headings.
  - Cormorant Garamond for names, dates and elegant secondary typography.
  - Manrope for small UI labels.
- The hero was refined to be quieter and more balanced.
- The invitation card was substantially redesigned:
  - dark luxury envelope
  - envelope flap
  - wax-seal monogram
  - raised paper card
  - ivory paper
  - layered gold borders
  - architectural arch
  - corner ornaments
  - Arabic Bismillah
  - restrained typography
- The overall experience remains chapter-based rather than one long information wall.
- Navigation is through a discreet bottom navigation and a menu drawer.
- No guest-facing "click this and that" instructions.
- Bismillah appears at the opening and on the invitation card, not as a random closing element.
- Google Maps links are the exact supplied links.
- RSVP numbers remain unlabelled.
- No photography, parking or accommodation sections.

## Editable

Normal content changes belong in `config.js`:
- names
- family names
- dates
- times
- countdown target
- venues
- addresses
- Google Maps links
- RSVP numbers
- theme colors

Do not edit HTML to change ordinary wedding information.

## Run locally

    python3 -m http.server 8000

Open:

    http://localhost:8000

## Deploy

This is a static website and can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages or another static host.

## Countdown

The visible event wording is "AFTER MAGHRIB". Because no exact clock time has been supplied, the countdown target is temporarily 18:30 IST. Update `countdownTarget` in `config.js` when the exact time is known.
