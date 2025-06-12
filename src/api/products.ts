export async function getProductDetail(code: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/restapi/product/market/info`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VOYAGEONE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
  const json = await res.json()
  return json.data || null
}