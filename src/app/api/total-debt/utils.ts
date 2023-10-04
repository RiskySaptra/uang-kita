interface DebtSummary {
  name: string;
  total_debt: number;
  user_id: number;
}

interface SettledDebtSummary {
  settled_debt: number;
  tx_reciver: number;
}

interface Result {
  _id: number;
  name: string;
  total: number;
}

export interface InputData {
  debtSummary: DebtSummary[];
  settledDebtSummary: SettledDebtSummary[];
}

export function processDebtData(inputData: InputData[]): Result[] {
  const { debtSummary, settledDebtSummary } = inputData[0];

  const settledDebtMap: { [key: number]: number } = {};

  for (const settledDebt of settledDebtSummary) {
    settledDebtMap[settledDebt.tx_reciver] = settledDebt.settled_debt;
  }

  const processedData: Result[] = debtSummary.reduce(
    (accumulator: Result[], debt: DebtSummary) => {
      const settled_debt = settledDebtMap[debt.user_id] || 0;

      return [
        ...accumulator,
        {
          _id: debt.user_id,
          name: debt.name,
          total: debt.total_debt - settled_debt,
        },
      ];
    },
    []
  );

  return processedData;
}
