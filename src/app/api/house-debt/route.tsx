import { NextResponse } from 'next/server';

import { clientPromise } from '@/lib/mongoDb-utils';

import { _settledAndDebtSummary } from '@/app/api/house-debt/pipeline';
import { processDebtData } from '@/app/api/house-debt/utils';

export async function GET() {
  try {
    const client = await clientPromise('uangkita-test', 'transactions');
    const result: any = await client
      .aggregate(_settledAndDebtSummary)
      .toArray();
    if (result) {
      const parseData = processDebtData(result[0]);
      return NextResponse.json(parseData);
    } else {
      return NextResponse.json({ error: 'Data not found' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
}
