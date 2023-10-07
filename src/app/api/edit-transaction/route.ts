import { ClientSession, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoDb-utils';

export async function POST(request: NextRequest) {
  const { id, name, amount, createdBy } = await request.json();

  try {
    const { client, db } = await connectToDatabase();
    const session = client.startSession();

    const transactionOperations = async (session: ClientSession) => {
      const parsedAmount = Number.isInteger(amount)
        ? amount
        : Number(amount.replace(/[^a-zA-Z0-9 ]/g, ''));
      const transasction = {
        tx_name: name,
        tx_amount: parsedAmount,
      };
      const originalData = await db
        .collection('transactions')
        .findOne({ _id: new ObjectId(id) }, { session });

      if (originalData?._id) {
        // Clone documents
        const newData = {
          ...originalData,
          edited_date: new Date(),
          edited_by: createdBy,
        };
        await db
          .collection('backup_transactions')
          .updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: { history: newData } },
            { session, upsert: true }
          );

        // Update a document
        await db
          .collection('transactions')
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: transasction },
            { session }
          );
      }
      // If any error occurs during the above operations, the transaction will be rolled back automatically
    };

    await session.withTransaction(transactionOperations);

    // Commit the transaction
    await session.commitTransaction();

    // Close the session
    session.endSession();
    return NextResponse.json({ message: `update ${id}` });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
