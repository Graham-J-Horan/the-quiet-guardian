🟢 NEW Minor: Layout.astro — Astro.site fallback chain is fragile
File: Layout.astro, line 22
jsconst siteUrl = import.meta.env.PUBLIC_SITE_URL ?? Astro.site?.origin ?? "https://quiet-guardian.com";
Astro.site is only populated if site is set in astro.config.mjs. If neither PUBLIC_SITE_URL nor astro.config.mjs's site property is set in the production environment, the hardcoded fallback kicks in. This is safe, but the hardcoded URL https://quiet-guardian.com should be verified to match the actual production domain exactly (including whether www. is used). A mismatch would cause the canonical URL and OG image URL to be wrong in production.
Action: Set PUBLIC_SITE_URL=https://quiet-guardian.com (or your actual domain) in your production .env and confirm it matches the domain in your hosting configuration.

🟢 NEW Minor: index.astro — empty <script> block at end of file
File: index.astro, lines 493–494
html<script>
</script>
The before/after slider script has been correctly removed (replaced by BeforeAfterSlider.astro), but the now-empty <script> tag was left behind. It causes no runtime error but is unnecessary noise. Remove it.

🟢 NEW Minor: privacy.astro — placeholder address not filled in
File: privacy.astro, line 24
[Registered Business Address, Dublin, Ireland]
The Controller Identity section correctly acknowledges that a business address is required, but the placeholder text is still literal bracket notation. This must be replaced with the actual registered business address before launch. Publishing a privacy policy with a placeholder address visible to the public undermines trust and may not satisfy GDPR Article 13 requirements for controller identity.

🟢 NEW Minor: BeforeAfterSlider.astro — loading="lazy" on both images, including the "after" base layer
File: BeforeAfterSlider.astro, lines 46 and 55
Both the afterSrc (base layer) and beforeSrc images use loading="lazy". For sliders that are above the fold or near it (e.g. the hero slider on index.astro), this may cause a brief layout shift or blank state while the image loads. The caller in index.astro wraps the component in class="reveal" which gates visibility on IntersectionObserver anyway, so the impact is mitigated. However, the component does not expose a loading prop, meaning callers cannot opt into eager loading even for prominent above-the-fold sliders.
Fix: Add an optional loading prop (default "lazy") to the component and pass it to the afterSrc image.

Pre-Launch Checklist — Updated
Must-fix before launch

 Fill in the actual registered business address in privacy.astro (replaces [Registered Business Address, Dublin, Ireland])
 Fix "Peace of Mind Plan" feature copy (". On plan" suffix) in process.astro
 Verify portfolio.astro has been migrated to BeforeAfterSlider.astro (confirm slider e.preventDefault() is present)
 Copy Leaflet marker icon images to public/leaflet/ from node_modules/leaflet/dist/images/
 Remove the empty <script></script> block at the bottom of index.astro
 Fix the <h2> "Access & Permission" heading in request-care.astro step 3 to <h3>

Should-do before launch

 Add loading prop to BeforeAfterSlider.astro for caller-controlled image loading priority
 Fix window listener accumulation in BeforeAfterSlider.astro (initSliders re-run issue)
 Add safeInitial guard to BeforeAfterSlider.astro for initialPercent = 0 edge case

Environment & Infrastructure

 Set PUBLIC_SITE_URL, PUBLIC_PHONE_NUMBER, PUBLIC_WHATSAPP_NUMBER, PUBLIC_FORMSPREE_ENDPOINT, PUBLIC_PLAUSIBLE_DOMAIN in production environment
 Confirm production domain exactly matches PUBLIC_SITE_URL (with or without www.)
 Confirm @astrojs/sitemap is configured and public/robots.txt exists with Disallow: /thank-you
 Verify og-image.jpg, favicon.ico, favicon.svg, apple-touch-icon.png, site.webmanifest exist in public/
 Add site property to astro.config.mjs to support Astro.site fallback

Final QA

 Test form end-to-end on Formspree (check emails arrive, redirect to /thank-you works)
 Test WhatsApp link on a real iOS and Android device
 Test map pin placement and coordinate collection on mobile
 Test before/after sliders on touch devices (all three pages)
 Run screen reader walkthrough on /request-care (focus order, step announcements)
 Lighthouse audit on production URL (target 90+ Performance, 100 Accessibility)
 Validate Schema.org with Google's Rich Results Test
 Test OG tags with Facebook Debugger and Twitter Card Validator
  astro build — zero errors, zero warnings
 W3C HTML validator on all 6 pages (index, process, portfolio, request-care, thank-you, privacy)
 Lighthouse on production URL — target 90+ Performance, 100 Accessibility
 Full form journey: step 1 → 4 → submit → /thank-you redirect → Formspree email received
 Test all three sliders on touch devices (index, process, portfolio)
 Screen reader walkthrough: /request-care step navigation and focus management
 Google Rich Results Test for Schema.org
 Facebook Sharing Debugger + Twitter Card Validator for OG tags
 Test WhatsApp links on real iOS and Android devices
 Verify Leaflet map initialises, pins can be placed, and coordinates appear in review step