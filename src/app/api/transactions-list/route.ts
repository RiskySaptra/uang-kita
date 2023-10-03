import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

import { _transactionList } from '@/app/api/transactions-list/pipeline';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('transactions')
      .aggregate(_transactionList)
      .toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
