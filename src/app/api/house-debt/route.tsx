import { NextResponse } from 'next/server';

import { clientPromise } from '@/lib/mongoDb-utils';

import { _settledAndDebtSummary } from '@/app/api/house-debt/pipeline';
import { InputData, processDebtData } from '@/app/api/house-debt/utils';

export async function GET() {
  try {
    const client = await clientPromise('uangkita-test', 'transactions');
    const result = await client.aggregate(_settledAndDebtSummary).toArray();
    if (result && result.length > 0) {
      const data = result as InputData[];
      return NextResponse.json(processDebtData(data));
    } else {
      return NextResponse.json({ error: 'Data not found' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
}
