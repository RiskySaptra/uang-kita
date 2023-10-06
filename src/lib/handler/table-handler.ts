const _baseUrl = process.env.BASE_URL;
export const getDataTable = async (month: number) => {
  try {
    const data = await fetch(
      `${_baseUrl}/api/transactions-list?month=${month}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      }
    );
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};
