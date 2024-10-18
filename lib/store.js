// lib/shopify.js
export async function getStoreDetails() {
  const query = `
    {
      shop {
        name
        primaryDomain {
          url
        }
        paymentSettings {
          currencyCode
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return null; // Return null if there's an error
    }

    return json.data.shop; // Return shop data
  } catch (error) {
    console.error("Error fetching store details:", error);
    return null; // Handle fetch errors
  }
}