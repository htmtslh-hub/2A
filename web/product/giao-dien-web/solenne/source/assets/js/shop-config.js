/* Edit only these public settings. Read CUSTOMISE.md > COD setup first.
 * Empty orderEndpoint keeps checkout in preview mode. Never put secret keys here.
 * USD amounts are integer cents; shippingCents: 499 means $4.99.
 */
window.ForgeShopConfig = {
  "slug": "solenne",
  "name": "Solenne",
  "shippingCents": 0,
  "freeShippingAt": 0,
  "orderEndpoint": "",
  "onlineCheckoutEndpoint": "",
  "checkoutHosts": [],
  "collectionSelector": "#collection",
  "products": [
    {
      "id": "glow-serum",
      "name": "Glow Serum",
      "price": 3800
    },
    {
      "id": "daily-cream",
      "name": "Daily Cream",
      "price": 4600
    }
  ]
};
