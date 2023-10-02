import { NextResponse } from 'next/server';

import { clientPromise } from '@/lib/mongoDb-utils';

import { _transactionList } from '@/app/api/transactions-list/pipeline';

export async function GET() {
  try {
    const client = await clientPromise('uangkita-test', 'transactions');
    const result = await client.aggregate(_transactionList).toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
