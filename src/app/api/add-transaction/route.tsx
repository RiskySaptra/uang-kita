import { NextRequest, NextResponse } from 'next/server';

import { clientPromise } from '@/lib/mongoDb-utils';

export async function POST(req: NextRequest) {
  const { transactionName, sender, receiver, amount } = await req.json();

  const transasction = {
    tx_name: transactionName,
    tx_sender: sender,
    tx_reciver: receiver,
    tx_amount: amount,
    tx_date: new Date(),
  };

  try {
    const client = await clientPromise('uangkita-test', 'transactions');
    const result = await client.insertOne(transasction);
    if (result) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Data not found' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
}
