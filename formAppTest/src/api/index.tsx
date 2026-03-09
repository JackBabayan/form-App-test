const BASE_URL = 'https://dummyjson.com';


export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export interface AddProductPayload {
  title: string;
}

export interface AddProductResponse {
  id: number;
  title: string;
}

export async function addProduct(payload: AddProductPayload): Promise<AddProductResponse> {
  const res = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit application');
  return res.json();
}
