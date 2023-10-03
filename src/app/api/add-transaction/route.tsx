import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

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
