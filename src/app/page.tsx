'use client';

import React from 'react';
import { useQuery } from 'react-query';

import {
  getDataBalanceAmount,
  getDataTotalContribution,
  getDataTotalDebt,
  getDataTotalExpense,
} from '@/lib/handler/page-handler';
import { formatCurrency, sumTotal } from '@/lib/utils';

import Card from '@/components/Card';
import Table from '@/components/table/Table';

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

  // console.log(process.env.NODE_ENV, 'ENV whut ?');

  return (
    <main className='container mx-auto px-2 py-10 sm:px-20 md:px-10'>
      <div className='flex justify-center pb-7'>
        <h1 className='text-xl font-bold text-white'>Uang Kita</h1>
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
          title='Total Pengeluaran'
          amount={formatCurrency(
            totalExpense?.total_expense ? Number(totalExpense.total_expense) : 0
          )}
        />
      </div>

      <Table />
    </main>
  );
}
