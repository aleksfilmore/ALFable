# ALFable Repositioning Asset Manifest

**Status:** Initial website visual family selected  
**Date:** 17 July 2026  
**Production folder:** `assets/repositioning/selected/`  
**Pending media folder:** `assets/repositioning/pending/`
**Rights confirmation:** Alexandru confirms commercial-use rights for the Gemini-generated visuals. No public generator attribution or production-detail disclosure is required.

## Implementation instruction

Use only the files in `assets/repositioning/selected/` for the first website implementation. The originals in `VISUALS/` are the exploration set and must not be selected ad hoc during implementation.

The selected family contains four editorial stills plus the existing real portrait of Alexandru. A fifth editorial still was intentionally not selected because it would add repetition without introducing a necessary visual role.

The video in `assets/repositioning/pending/` is a working reference only. Alexandru will supply the final clean loop separately. Do not load, optimize, publish, or use the reference export as a poster source.

## Selected production assets

| ID | File | Intended placement | Crop and implementation direction | Alt-text direction | Status |
|---|---|---|---|---|---|
| A01 | `assets/repositioning/selected/a01-hero-creative-technical-projection.jpeg` | Homepage hero | Landscape split composition. Keep the projected figure in the right half and protect the pale left field for the headline. Use `object-position` around `72% 50%`; verify separately at desktop and mobile. | Treat as decorative in the hero and use empty alt text. | Selected |
| A02 | `assets/repositioning/selected/a02-strategy-geometric-movement.jpeg` | Strategy/promise transition or client-situation lead-in | Use as a wide horizontal crop. Preserve the shoe and long angular shadow; do not crop the image into an isolated footwear shot. Approximate focal point: `72% 34%`. | Decorative unless it carries section meaning. If semantic: `A shoe crossing a geometric tiled surface, casting a long angular shadow.` | Selected |
| A03 | `assets/repositioning/selected/a03-approach-material-curation.jpeg` | How ALFable works / approach | Preserve the hand, translucent grid, layered paper, and rough timber surface. Approximate focal point: `62% 55%`. This image represents judgment and curation, not a documented client process. | `A hand arranging translucent layers and textured materials on a worktable.` | Selected |
| A04 | `assets/repositioning/selected/a04-connected-experience-material-light.jpeg` | Connected capabilities / physical and digital experience | Use as a restrained still-life interruption. Preserve the material edges and projected light. It may tolerate a tighter 4:5 crop around the center-right group. | `Paper, concrete, fabric, and translucent panels arranged in directional light.` | Selected |
| A06 | `assets/repositioning/selected/a06-about-alexandru-grayscale.png` | About Alexandru only | This is the real owned grayscale portrait and provides authorship. Do not replace it with any generated person. Preserve the existing portrait focal point unless the redesigned composition requires a separately reviewed crop. | `Alexandru Filip, founder of ALFable.` | Selected and ready; owned |

## Pending motion asset

| ID | File | Intended placement | Technical details | Blocking issue | Required action |
|---|---|---|---|---|---|
| A07 | `assets/repositioning/pending/a07-motion-architectural-light-PENDING-CLEAN-EXPORT.mp4` | Optional interstitial or hero alternative | Current reference: 1920 x 1080, H.264, 8 seconds, 24 fps; contains an AAC audio track | Current file is not the final website export | Alexandru will supply `assets/repositioning/selected/a07-motion-architectural-light.mp4`. After it arrives, remove any audio track, create optimized MP4/WebM versions and a poster frame, then test the loop seam and `prefers-reduced-motion` fallback. |

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
| A07 | `VISUALS/Editorial_monochrome_loop_1080p_202607171022 (1).mp4` | 1920 x 1080; 8 seconds | `e74560c4ffdc32a74c20a128ba5031a1c0a8a1eec16c89dfa0df012ae1278b3a` | Working reference only; final clean loop pending from Alexandru |

## Publication gates

- Use A01-A04 without public attribution or generator-detail copy.
- Replace the A07 working reference with Alexandru's final clean export if motion is retained.
- Do not use the source `VISUALS/` folder directly in HTML or CSS.
- Do not publish alternative generated portraits, rejected experiments, watermarked media, contact sheets, or temporary review outputs.
- Optimize copies for production only after the final layout establishes the real rendered dimensions and crop requirements.
