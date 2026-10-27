import { SITE } from "@/lib/data";

/**
 * Shared schema.org Offer fields (price validity, shipping, returns) so every Product
 * snippet on the site states the same terms as the policy pages and the Merchant Center feed.
 *
 * shippingRate is deliberately left out: freight is quoted by delivery pincode, so a fixed
 * (or zero) rate would be untrue. Google treats it as an optional enhancement.
 */
export const offerPolicies = {
  // Date the current pricelist took effect.
  validFrom: "2026-09-25",
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 7, unitCode: "DAY" },
    },
  },
  // Matches /return-policy (and Merchant Center): India, defective or damaged units only, 10 days, free return shipping, no exchanges.
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "IN",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 10,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    merchantReturnLink: `${SITE.url}/return-policy`,
  },
};
