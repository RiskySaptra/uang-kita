const _baseUrl = process.env.BASE_URL;

// move to api handlers
export const getDataBalanceAmount = async () => {
  try {
    const data = await fetch(`${_baseUrl}/api/total-balance-amount`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};
export const getDataTotalDebt = async () => {
  try {
    const data = await fetch(`${_baseUrl}/api/total-debt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};

export const getDataTotalContribution = async () => {
  try {
    const data = await fetch(`${_baseUrl}/api/total-contribution`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    return data.json();
  } catch (error) {
    // console.log(error);
  }
};

export const getDataTotalExpense = async () => {
  try {
    const data = await fetch(`${_baseUrl}/api/total-expense`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    return data.json();
  } catch (error) {
    // console.log(error);
  }
};
