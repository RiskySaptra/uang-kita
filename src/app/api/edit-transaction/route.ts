import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { transactionName, sender, receiver, amount, createdBy } =
    await request.json();

  // const parsedAmount = Number(amount.replace(/[^a-zA-Z0-9 ]/g, ''));
  // const transasction = {
  //   tx_name: transactionName,
  //   tx_sender: sender,
  //   tx_reciver: receiver,
  //   tx_amount: parsedAmount,
  //   tx_date: new Date(),
  //   created_by: createdBy,
  // };

  // try {
  //   const { db } = await connectToDatabase();

  //   if (sender === -1) {
  //     const total_balance = await db
  //       .collection('transactions')
  //       .aggregate(_totalBalanceAmount)
  //       .toArray();
  //     if (parsedAmount > total_balance[0].total_balance) {
  //       return NextResponse.json(
  //         {
  //           error: `saldo tidak cukup silahkan sesuaikan jumlah pembayaran`,
  //         },
  //         { status: 400 }
  //       );
  //     }
  //     if (receiver > 0) {
  //       const result = await db
  //         .collection('transactions')
  //         .aggregate(_findTotalDebt(receiver))
  //         .toArray();

  //       if (parsedAmount > result[0].difference || result[0].difference === 0) {
  //         const debt = result[0].difference <= 0 ? 0 : result[0].difference;
  //         return NextResponse.json(
  //           {
  //             error: `Anda telah mencoba melakukan pembayaran yang melebihi utangnya! (Hutang aktual:  ${formatCurrency(
  //               debt
  //             )} Jumlah yang dibayarkan: ${formatCurrency(parsedAmount)})`,
  //           },
  //           { status: 400 }
  //         );
  //       }
  //     }
  //   }

  // const result = await db.collection('transactions').insertOne(transasction);
  // if (result) {
  //   return NextResponse.json(result);
  // } else {
  //   return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  // }
  // } catch (error) {
  //   return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  // }
}

export const dynamic = 'force-dynamic';
