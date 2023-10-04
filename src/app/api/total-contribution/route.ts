import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

const _totalContribution = [
  {
    $match: {
      tx_sender: { $gt: 0 },
      tx_reciver: { $eq: -1 },
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'tx_sender',
      foreignField: 'user_id',
      as: 'user',
    },
  },
  {
    $unwind: '$user',
  },
  {
    $group: {
      _id: '$tx_sender',
      name: { $first: '$user.name' },
      total: { $sum: '$tx_amount' },
    },
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('transactions')
      .aggregate(_totalContribution)
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const dynamic = 'force-dynamic';
