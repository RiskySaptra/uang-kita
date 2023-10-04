import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

const _totalExpese = [
  {
    $match: {
      $or: [{ tx_sender: { $eq: -1, $gt: 0 } }, { tx_reciver: { $eq: -2 } }],
    },
  },
  {
    $group: {
      _id: '$tx_reciver',
      total_expense: { $sum: '$tx_amount' },
    },
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('transactions')
      .aggregate(_totalExpese)
      .toArray();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const dynamic = 'force-dynamic';
