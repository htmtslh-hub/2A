/* Edit only these public settings. Read CUSTOMISE.md > COD setup first.
 * Empty orderEndpoint keeps checkout in preview mode. Never put secret keys here.
 * USD amounts are integer cents; shippingCents: 499 means $4.99.
 */
window.ForgeShopConfig = {
  "slug": "shirtline",
  "name": "Shirtline",
  "shippingCents": 0,
  "freeShippingAt": 0,
  "orderEndpoint": "",
  "onlineCheckoutEndpoint": "",
  "checkoutHosts": [],
  "collectionSelector": "#collection",
  "products": [
    {
      "id": "noir",
      "name": "Noir Oxford",
      "price": 14800,
      "variants": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    {
      "id": "cabernet",
      "name": "Cabernet Camp",
      "price": 14200,
      "variants": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    {
      "id": "linen",
      "name": "Linen Sand",
      "price": 15600,
      "variants": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    {
      "id": "olive",
      "name": "Olive Utility",
      "price": 16400,
      "variants": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    {
      "id": "white",
      "name": "White Mandarin",
      "price": 15200,
      "variants": [
        "S",
        "M",
        "L",
        "XL"
      ]
    }
  ],
  "nativeCollection": true
};
