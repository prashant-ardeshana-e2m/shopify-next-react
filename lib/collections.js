export async function fetchCollections() {
  const query = `
    {
      collections(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              src
            }
          }
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
      return null;
    }

    return json.data.collections;
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return null;
  }
}
