/* Edit only these public settings. Read CUSTOMISE.md > COD setup first.
 * Empty orderEndpoint keeps checkout in preview mode. Never put secret keys here.
 * USD amounts are integer cents; shippingCents: 499 means $4.99.
 */
window.ForgeShopConfig = {
  "slug": "velora",
  "name": "Velora",
  "shippingCents": 0,
  "freeShippingAt": 0,
  "orderEndpoint": "",
  "onlineCheckoutEndpoint": "",
  "checkoutHosts": [],
  "collectionSelector": "#collection",
  "products": [
    {
      "id": "metro",
      "name": "Metro",
      "price": 285000
    },
    {
      "id": "onyx",
      "name": "Onyx",
      "price": 245000
    },
    {
      "id": "loop",
      "name": "Loop",
      "price": 265000
    }
  ],
  "selectionSelector": "[data-summary]"
};
