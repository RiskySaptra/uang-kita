'use client';

import React from 'react';
import { useQuery } from 'react-query';

import { formatCurrency } from '@/lib/utils';

import Card from '@/components/Card';
import ModalHome from '@/components/ModalHome';
import Table from '@/components/Table';

interface BalanceAmountProps {
  total_balance: number;
}

interface ExpenseProps {
  _id: number;
  total_expense: number;
}
export interface TotalSumProps {
  _id: number;
  name: string;
  total: number;
}

const _baseUrl = process.env.BASE_URL;

// move to api handlers
const getDataBalanceAmount = async () => {
  try {
    const data = await fetch(`${_baseUrl}api/total-balance-amount`, {
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
const getDataTotalDebt = async () => {
  try {
    const data = await fetch(`${_baseUrl}api/total-debt`, {
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

const getDataTotalContribution = async () => {
  try {
    const data = await fetch(`${_baseUrl}api/total-contribution`, {
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

const getDataTotalExpense = async () => {
  try {
    const data = await fetch(`${_baseUrl}api/total-expense`, {
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

// move to utils
const sumTotal = (data?: TotalSumProps[]) => {
  if (!data) return 0;
  return data.reduce((prev, curr) => {
    return (prev += curr.total);
  }, 0);
};

export default function HomePage() {
  const { data: balanceAmount } = useQuery<BalanceAmountProps>(
    'balance-amount',
    getDataBalanceAmount
  );
  const { data: totalDebt } = useQuery<TotalSumProps[]>(
    'total-debt',
    getDataTotalDebt
  );

  const { data: totalContribution } = useQuery<TotalSumProps[]>(
    'total-contribution',
    getDataTotalContribution
  );

  const { data: totalExpense } = useQuery<ExpenseProps>(
    'total-expense',
    getDataTotalExpense
  );

  return (
    <main className='container mx-auto px-2 py-10 sm:px-20 md:px-10'>
      <div className='flex justify-center pb-7'>
        <h1 className='text-xl font-bold text-white'>UANG BULANAN</h1>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card
          title='Total Saldo Di Rekening'
          amount={formatCurrency(
            balanceAmount?.total_balance
              ? Number(balanceAmount.total_balance)
              : 0
          )}
        />
        <Card
          title='Total Hutang Keseluruhan'
          detailsTitle='Total Hutang'
          amount={formatCurrency(sumTotal(totalDebt))}
          data={totalDebt}
        />
        <Card
          title='Total Kontribusi Keseluruhan'
          detailsTitle='Total Kontribusi'
          amount={formatCurrency(sumTotal(totalContribution))}
          data={totalContribution}
        />
        <Card
          title='Total Penegeluaran'
          amount={formatCurrency(
            totalExpense?.total_expense ? Number(totalExpense.total_expense) : 0
          )}
        />
      </div>

      <ModalHome />
      <Table />
    </main>
  );
}
