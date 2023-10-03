import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

import { _settledAndDebtSummary } from '@/app/api/house-debt/pipeline';
import { InputData, processDebtData } from '@/app/api/house-debt/utils';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('transactions')
      .aggregate(_settledAndDebtSummary)
      .toArray();
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

export const dynamic = 'force-dynamic';
