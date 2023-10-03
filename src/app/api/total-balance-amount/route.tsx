import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

import { _totalBalanceAmount } from '@/app/api/total-balance-amount/pipeline';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('transactions')
      .aggregate(_totalBalanceAmount)
      .toArray();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(error);
  }
}
