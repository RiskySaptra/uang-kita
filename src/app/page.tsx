'use client';

import React from 'react';
import { useQuery } from 'react-query';

import { formatCurrency } from '@/lib/utils';

import Card from '@/components/Card';
import Table from '@/components/Table';

import ModalHome from '@/app/home/ModalHome';

interface BalanceAmountProps {
  total_balance: number;
}
export interface TotalDebtProps {
  user_id: number;
  name: string;
  total_debt: number;
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
    const data = await fetch(`${_baseUrl}api/house-debt`, {
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
const sumDebt = (data?: TotalDebtProps[]) => {
  if (!data) return 0;
  return data.reduce((prev, curr) => {
    return (prev += curr.total_debt);
  }, 0);
};

export default function HomePage() {
  const { data: balanceAmount } = useQuery<BalanceAmountProps>(
    'balance-amount',
    getDataBalanceAmount
  );
  const { data: totalDebt } = useQuery<TotalDebtProps[]>(
    'total-debt',
    getDataTotalDebt
  );

  return (
    <main className='container mx-auto px-2 py-10 sm:px-20 md:px-10'>
      <div className='flex justify-center pb-7'>
        <h1 className='text-xl font-bold text-white'>UANG BULANAN</h1>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card
          title='Total Amount in the Account'
          amount={formatCurrency(
            balanceAmount?.total_balance
              ? Number(balanceAmount.total_balance)
              : 0
          )}
        />
        <Card
          title='Total Debt'
          amount={formatCurrency(sumDebt(totalDebt))}
          data={totalDebt}
        />
        <Card title='contribution' amount={formatCurrency(0)} />
        <Card title='Total Expenses' amount={formatCurrency(0)} />
      </div>

      <ModalHome />
      <Table />
    </main>
  );
}
