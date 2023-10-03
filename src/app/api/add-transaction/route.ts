import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';
import { formatCurrency } from '@/lib/utils';

import { _findTotalDebt } from '@/app/api/add-transaction/pipeline';

export async function POST(req: NextRequest) {
  const { transactionName, sender, receiver, amount } = await req.json();

  const transasction = {
    tx_name: transactionName,
    tx_sender: sender,
    tx_reciver: receiver,
    tx_amount: Number(amount),
    tx_date: new Date(),
  };

  try {
    const { db } = await connectToDatabase();
    if (sender === -1 && receiver > 0) {
      const result = await db
        .collection('transactions')
        .aggregate(_findTotalDebt(1))
        .toArray();

      if (amount > result[0].difference) {
        return NextResponse.json(
          {
            error: `You have attempted to make a payment that exceeds the debt! (Actual debt: ${formatCurrency(
              result[0].difference
            )} Amount paid: ${formatCurrency(amount)})`,
          },
          { status: 400 }
        );
      }
    }
    const result = await db.collection('transactions').insertOne(transasction);
    if (result) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Data not found' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
}

export const dynamic = 'force-dynamic';
