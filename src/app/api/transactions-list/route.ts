import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

import { _transactionList } from '@/app/api/transactions-list/pipeline';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('transactions')
      .aggregate(_transactionList(Number(month)))
      .toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const dynamic = 'force-dynamic';
