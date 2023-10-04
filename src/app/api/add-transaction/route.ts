import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';
import { formatCurrency } from '@/lib/utils';

import { _findTotalDebt } from '@/app/api/add-transaction/pipeline';
import { _totalBalanceAmount } from '@/app/api/total-balance-amount/pipeline';

export async function POST(req: NextRequest) {
  const { transactionName, sender, receiver, amount, createdBy } =
    await req.json();
  const transasction = {
    tx_name: transactionName,
    tx_sender: sender,
    tx_reciver: receiver,
    tx_amount: Number(amount),
    tx_date: new Date(),
    created_by: createdBy,
  };

  try {
    const { db } = await connectToDatabase();

    if (sender === -1) {
      const total_balance = await db
        .collection('transactions')
        .aggregate(_totalBalanceAmount)
        .toArray();
      if (amount > total_balance[0].total_balance) {
        return NextResponse.json(
          {
            error: `saldo tidak cukup silahkan mencopet dulu`,
          },
          { status: 400 }
        );
      }
      if (receiver > 0) {
        const result = await db
          .collection('transactions')
          .aggregate(_findTotalDebt(receiver))
          .toArray();

        if (amount > result[0].difference || result[0].difference === 0) {
          const debt = result[0].difference <= 0 ? 0 : result[0].difference;
          return NextResponse.json(
            {
              error: `You have attempted to make a payment that exceeds the debt! (Actual debt: ${formatCurrency(
                debt
              )} Amount paid: ${formatCurrency(amount)})`,
            },
            { status: 400 }
          );
        }
      }
    }

    const result = await db.collection('transactions').insertOne(transasction);
    if (result) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
