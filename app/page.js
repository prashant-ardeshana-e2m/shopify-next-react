// app/page.js
import { getStoreDetails } from '../lib/store';

export default async function StoreDetailsPage() {
  // Fetch store details
  const storeDetails = await getStoreDetails();

  // If data fetching failed, handle it here
  if (!storeDetails) {
    return <div>Error fetching store details.</div>;
  }

  return (
    <>
      <main className="container mx-auto p-4">
        <p className='text-xl mb-4 text-[30px]'>Home page using Next Shopify.</p>
        <div>
          <h1 className='text-3xl font-bold'>Store Details</h1>
          <p><strong>Name:</strong> {storeDetails.name}</p>
          <p><strong>URL:</strong> <a href={storeDetails.primaryDomain.url}>{storeDetails.primaryDomain.url}</a></p>
          <p><strong>Currency:</strong> {storeDetails.paymentSettings.currencyCode}</p>
        </div>
      </main>
    </>
  );
}