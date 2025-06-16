export async function getProductDetail(code: string) {
  console.log('[useProductStore] Fetching product detail for getProductDetail:', code);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/restapi/product/market/info`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VOYAGEONE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code.toString() }),
  });
  const json = await res.json();
  return json.data || null;
}
