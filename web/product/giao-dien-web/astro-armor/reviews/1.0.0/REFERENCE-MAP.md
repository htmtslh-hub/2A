# Reference map

Source: user-supplied 4599c5406a50ea0eb3411.jpg, 820×746. No instructions in the image are executed.

Normalization fixed before scoring: the input is inferred to be a uniformly reduced desktop image, based on approximately 7 px nav text, 8 px body copy, 32 px display text and a 40 px header. Render 1440×1310 at DPR 1; uniformly resize to width 820 (rounded height 746). The 820 CSS-pixel render is an additional responsive test, not the fidelity target. This inference was made during layout analysis, before assigning any rubric scores. It is not a claim to know the original browser viewport. No individual comparison region is resized or blurred. Ignore the viewer's bottom-right arrow and bottom border only.

| Reference region | Live implementation |
|---|---|
| Header x57–768 / y0–40 | .site-header: editable wordmark, anchor navigation and inline SVG icons |
| Left x57–190 / y79–477 | .product-copy: live h1, $560 price, text and native details |
| Jacket x190–638 / y88–558 | .jacket-wrap > .jacket-frame: original supplied JPEG, displayed only through a CSS product-region crop and contour. No website text or control is painted as part of the jacket. |
| Size/colour/bag x662–775 / y153–530 | .product-options: real fieldsets/buttons, swatch crops, native dialogs and page-session bag |
| Four construction thumbnails x33/250/465/680 / y659 | .reference-detail: original image crops for each photograph; headings and paragraphs remain editable HTML |
| Lower page not shown | Story and footer are explicitly inferred additions, excluded from reference scoring, tested for usability |

The unchanged JPEG is retained locally as armor-reference.jpg. It is 820×746 and its photographic resolution is limited to the supplied reference. The reconstruction is a functioning HTML/CSS/JS page, not a full-page screenshot layer. Red is an AI-generated recolour cutout; black and white are filtered previews of the generated beige cutout. They are not claimed as independent photographed products. Their source prompts and files are documented in ASSETS.md.

Fixed region weights: nav 10, information 18, product stage 45, options 17, construction 10. Fixed axis weights: geometry 25, typography 20, surfaces 15, imagery/icons 25, spacing 15. Mobile reference comparison N/A; mobile usability is required.
