'use client';

import React from 'react';
import { useQuery } from 'react-query';

import { formatCurrency } from '@/lib/utils';

import Table from '@/app/components/table';
import ModalHome from '@/app/home/ModalHome';

interface CardProps {
  title: string;
  amount: string;
}

interface BalanceAmountProps {
  total_balance: number;
}
interface TotalDebtProps {
  user_id: number;
  name: string;
  total_debt: number;
}

const getDataBalanceAmount = async () => {
  try {
    const data = await fetch(
      `https://uang-kita.vercel.app/api/total-balance-amount`
    );
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};
const getDataTotalDebt = async () => {
  try {
    const data = await fetch(`https://uang-kita.vercel.app/api/house-debt`);
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};

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
            balanceAmount ? Number(balanceAmount.total_balance) : 0
          )}
        />
        <Card title='Total Debt' amount={formatCurrency(sumDebt(totalDebt))} />
        <Card title='contribution' amount={formatCurrency(0)} />
        <Card title='Total Expenses' amount={formatCurrency(0)} />
      </div>

      <ModalHome />
      <Table />
    </main>
  );
}

function Card({ title, amount }: CardProps) {
  return (
    <div className='min-h-[8rem] rounded-lg bg-white p-4'>
      <p className='font-semibold uppercase'>{title}</p>
      <p className='text-xl font-bold'>{amount}</p>
    </div>
  );
}
