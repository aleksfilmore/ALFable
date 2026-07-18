# ALFable Repositioning Asset Manifest

**Status:** Revised visual family selected (personal photo set) — supersedes the A01–A04 editorial family on the homepage  
**Date:** 18 July 2026 (original selection 17 July 2026)  
**Production folder:** `assets/repositioning/selected/`  
**Reference media folder:** `assets/repositioning/pending/`
**Rights confirmation:** Alexandru confirms commercial-use rights for the Gemini-generated visuals. No public generator attribution or production-detail disclosure is required.

## Revision — 18 July 2026: personal photo family (B01–B04)

Following target-audience feedback that the A01–A04 abstract editorials read as unsettling ("black magic", "corpse fingers") and too cold, Alexandru supplied a new set of monochrome photographs of himself and directed that they replace the A01–A04 stills on the homepage. A01–A04 remain in `assets/repositioning/selected/` as archive only; do not reuse them on the site without new direction.

| ID | Source file | Placement | Production derivatives (`assets/repositioning/site/`) | Status |
|---|---|---|---|---|
| B01 | `assets/repositioning/selected/Alex Filip Hero.jpeg` (1376×768) | Homepage hero | `alex-hero-768.webp`, `alex-hero-1376.webp` | In use |
| B02 | `assets/repositioning/selected/Alex Filip pointing.jpeg` (1200×896) | Client situations figure | `alex-tiles-768.webp`, `alex-tiles-1200.webp` | In use |
| B03 | `assets/repositioning/selected/Alex Filip Editorial.jpeg` (896×1200) | One partner / capabilities figure | `alex-samples-640.webp`, `alex-samples-1080.webp` | In use |
| B04 | `assets/repositioning/selected/Alex Filip Editorial 2.jpeg` (896×1200) | How ALFable works / approach figure | `alex-desk-640.webp`, `alex-desk-1080.webp` | In use |
| — | `assets/repositioning/selected/Alex Filip pointing 2.jpeg` | None | None | Not selected: overhead lone-hand composition is close to the imagery the audience feedback flagged |

All B-series files were supplied by Alexandru on 18 July 2026 with direction to use them on ALFable.com; they depict Alexandru Filip, so person-alt-text may name him. A06 (real grayscale portrait) remains in use for About. The A07 motion source remains selected-but-optional and unoptimized.

The homepage was also restructured on 18 July 2026 in response to the same feedback: the Selected Work grid was removed in favor of a one-sentence proof strip (`#work`), with the full portfolio moving to the meeting presentations in `presentation/`.

## Implementation instruction (17 July 2026 — superseded where it conflicts with the revision above)

Use only the files in `assets/repositioning/selected/` for the first website implementation. The originals in `VISUALS/` are the exploration set and must not be selected ad hoc during implementation.

The selected family contains four editorial stills plus the existing real portrait of Alexandru. A fifth editorial still was intentionally not selected because it would add repetition without introducing a necessary visual role.

The final motion source is now in `assets/repositioning/selected/`. The older video in `assets/repositioning/pending/` remains a superseded working reference and must not be loaded, optimized, published, or used as a poster source.

## Selected production assets

| ID | File | Intended placement | Crop and implementation direction | Alt-text direction | Status |
|---|---|---|---|---|---|
| A01 | `assets/repositioning/selected/a01-hero-creative-technical-projection.jpeg` | Homepage hero | Landscape split composition. Keep the projected figure in the right half and protect the pale left field for the headline. Use `object-position` around `72% 50%`; verify separately at desktop and mobile. | Treat as decorative in the hero and use empty alt text. | Selected |
| A02 | `assets/repositioning/selected/a02-strategy-geometric-movement.jpeg` | Strategy/promise transition or client-situation lead-in | Use as a wide horizontal crop. Preserve the shoe and long angular shadow; do not crop the image into an isolated footwear shot. Approximate focal point: `72% 34%`. | Decorative unless it carries section meaning. If semantic: `A shoe crossing a geometric tiled surface, casting a long angular shadow.` | Selected |
| A03 | `assets/repositioning/selected/a03-approach-material-curation.jpeg` | How ALFable works / approach | Preserve the hand, translucent grid, layered paper, and rough timber surface. Approximate focal point: `62% 55%`. This image represents judgment and curation, not a documented client process. | `A hand arranging translucent layers and textured materials on a worktable.` | Selected |
| A04 | `assets/repositioning/selected/a04-connected-experience-material-light.jpeg` | Connected capabilities / physical and digital experience | Use as a restrained still-life interruption. Preserve the material edges and projected light. It may tolerate a tighter 4:5 crop around the center-right group. | `Paper, concrete, fabric, and translucent panels arranged in directional light.` | Selected |
| A06 | `assets/repositioning/selected/a06-about-alexandru-grayscale.png` | About Alexandru only | This is the real owned grayscale portrait and provides authorship. Do not replace it with any generated person. Preserve the existing portrait focal point unless the redesigned composition requires a separately reviewed crop. | `Alexandru Filip, founder of ALFable.` | Selected and ready; owned |

## Selected motion source and required derivatives

| ID | Source file | Intended placement | Source details | Status | Required implementation action |
|---|---|---|---|---|---|
| A07 | `assets/repositioning/selected/a07-motion-architectural-light.mp4` | Optional interstitial or hero alternative | 1920 x 1080, H.264, 8 seconds, 30 fps; includes a stereo AAC audio stream | Selected source ready for optimization | Preserve this source file. Strip the audio stream completely from every website derivative; do not merely set playback volume to zero. Create an optimized H.264 MP4, an optimized WebM, and a high-quality WebP poster in the implementation's public media directory. Verify seamless looping, `autoplay muted loop playsinline` behavior where motion is used, responsive loading, and a poster/static experience for `prefers-reduced-motion`. |

## Selection rationale

The selected sequence communicates four distinct parts of ALFable's position:

1. **A01 - creative and technical integration:** the clearest expression of ALFable's differentiator and the strongest non-corporate hero.
2. **A02 - structure and movement:** a visual metaphor for positioning, decisions, and forward motion.
3. **A03 - judgment and curation:** tactile, human, and process-led without fake branding or generated copy.
4. **A04 - connected experience:** bridges material craft and digital precision without showing a generic device or interface.
5. **A06 - real authorship:** prevents the editorial system from feeling anonymous or from inventing a false founder identity.

The generated tailored-man portraits were not selected. Used beside ALFable's expert-led messaging, they could be mistaken for Alexandru or a documented client/founder. The generated visual-system images containing pseudo-typography, fake layouts, or readable-looking text were also rejected.

## Source and integrity record

| ID | Original source | Dimensions | SHA-256 | Provenance status |
|---|---|---:|---|---|
| A01 | `VISUALS/Human_silhouette_projected_lines…_202607171018.jpeg` | 1376 x 768 | `9c78c0d00e4de8a4a9672b3d2ca1418a2c39faf1a110b3451f095264266d48ac` | Gemini-generated and supplied by Alexandru; commercial-use rights confirmed |
| A02 | `VISUALS/Editorial_composition_geometric_…_202607171012.jpeg` | 1376 x 768 | `2d9857fce1949a7028863cc70cb4b5b946c9c78546e5e8e9cbb3db6c687702f4` | Gemini-generated and supplied by Alexandru; commercial-use rights confirmed |
| A03 | `VISUALS/Editorial_black-and-white_photog…_202607171020.jpeg` | 1376 x 768 | `e7d9d74dfdc327ae82b84468ecf20e1e1d1b4cb9a2164cd16dea3e009768c7a9` | Gemini-generated and supplied by Alexandru; commercial-use rights confirmed |
| A04 | `VISUALS/Editorial_black-and-white_photog…_202607171019.jpeg` | 1376 x 768 | `511b3e3384090496db5bccd725ccc9204c1c5f1b62078fb93bece4946b3e111a` | Gemini-generated and supplied by Alexandru; commercial-use rights confirmed |
| A06 | `assets/repositioning/selected/a06-about-alexandru-grayscale.png` | 1024 x 1024 | `31d3337260d43505be803f2570c7bc55e65ce108b15690354c5579fdb6bb1141` | Owned real portrait; grayscale derivative supplied by Alexandru |
| A07 | `assets/repositioning/selected/a07-motion-architectural-light.mp4` | 1920 x 1080; 8 seconds; 30 fps | `1c240d3bd1693d726d4094c41172819df66e8f4dd51bea8fd27124e80a0f8cac` | Final source supplied by Alexandru; source includes audio that must be removed from production derivatives |

## Publication gates

- Use A01-A04 without public attribution or generator-detail copy.
- Use only the selected A07 source if motion is retained. Production derivatives must contain no audio stream and must include a tested poster/reduced-motion fallback.
- Do not use the source `VISUALS/` folder directly in HTML or CSS.
- Do not publish alternative generated portraits, rejected experiments, watermarked media, contact sheets, or temporary review outputs.
- Optimize copies for production only after the final layout establishes the real rendered dimensions and crop requirements.
