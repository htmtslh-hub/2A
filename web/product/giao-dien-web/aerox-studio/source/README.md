# Aerox Studio 1.2.0

Independent motorcycle showcase inspired by the supplied reference. Plain HTML/CSS/JS, no build or backend. Read CUSTOMISE.md first for ten steps, twelve prompts and the exact edit map. Open index.html directly or use a static server.

## Included

Six standard source/document files plus seven local WebP images in assets/img. No external fonts, scripts or network dependency for rendering. System font stacks vary across devices.

## Working behaviour

Responsive menu, section navigation, concept finish switching, three-image gallery, arrow-key gallery controls, native enlarge-image dialog, hover feedback and finite scroll reveals. All images are AI-generated. Graphite is a grayscale concept. Dealer links open the manufacturer website; no booking, payments, model database, live pricing or form submission. Navigation and content work without JS; presentation controls are disabled.

## Customise and motion

See CUSTOMISE.md. Motion defaults on by project policy and uses finite RAF fallback; no autoplay. Source metadata, copy, price and brand references must be reviewed before use.

## Status

Candidate for local review. See reviews/1.2.0 outside source for actual browser checks and limitations. No claim of official Yamaha affiliation, image accuracy certification or >95% visual fidelity. Commercial brand/image terms and copyright owner remain to be confirmed.

Concept finish transitions take 1.1 seconds. Adjust the duration in animate(bike, 1100, ...) in assets/js/main.js. Gallery and scroll reveal timings are unchanged.

The hero uses a five-item manual carousel: Aerox Silver / Gold, Aerox Graphite, Aerox Racing Blue, Urban Touring Burgundy and Classic City Mint. It wraps both directions and advances only when clicked.

## Products and colours in 1.2.0

Five carousel entries use four vehicle images: scooter.webp (Silver / Gold and grayscale Graphite), sport-blue.webp, touring-burgundy.webp and classic-mint.webp. The latter three are new AI-generated concept images. Edit the products array in assets/js/main.js for title, name, finish, image, alt and price display. Previous/next labels and the main headline update with the selected product. There is no autoplay. Native product colours and specification/price accuracy are not claimed; Urban Touring and Classic City are fictional concept models. The specifications and brake gallery remain a detail study of the original Aerox. No invented prices are assigned to new models.
