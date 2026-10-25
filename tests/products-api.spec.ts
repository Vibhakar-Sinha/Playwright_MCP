import { expect, test } from '@playwright/test';

test('get product 1 and validate its response', async ({ request }) => {
  const endpointUrl = 'https://fakestoreapi.com/products/1';
  const response = await request.get(endpointUrl);

  expect(response.status()).toBe(200);

  const product: unknown = await response.json();
  expect(product).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      price: expect.any(Number),
      category: expect.any(String),
      description: expect.any(String),
    }),
  );

  if (typeof product !== 'object' || product === null || !('title' in product) || !('price' in product)) {
    throw new Error('The product response is missing its title or price.');
  }

  console.log(`Product title: ${product.title}; price: ${product.price}`);
});
