export const callApi = async (
  url: string,
  options: RequestInit = {},
  method: string
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      ...options.headers,
    },
    method: method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
