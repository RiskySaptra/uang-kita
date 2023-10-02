import { NextResponse } from 'next/server';

import { clientPromise } from '@/lib/mongoDb-utils';

import { _totalBalanceAmount } from '@/app/api/total-balance-amount/pipeline';

export async function GET() {
  try {
    const client = await clientPromise('uangkita-test', 'transactions');
    const result = await client.aggregate(_totalBalanceAmount).toArray();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(error);
  }
}
