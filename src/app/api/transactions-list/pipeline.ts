export const _transactionList = (month?: number) => [
  {
    $lookup: {
      from: 'history_transactions',
      localField: '_id',
      foreignField: '_id',
      as: 'history',
    },
  },
  {
    $unwind: {
      path: '$history',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'tx_sender',
      foreignField: 'user_id',
      as: 'sender',
    },
  },
  {
    $unwind: '$sender',
  },
  {
    $lookup: {
      from: 'users',
      localField: 'tx_reciver',
      foreignField: 'user_id',
      as: 'receiver',
    },
  },
  {
    $unwind: '$receiver',
  },
  {
    $project: {
      tx_name: 1,
      sender: '$sender.name',
      receiver: '$receiver.name',
      tx_amount: 1,
      tx_date: 1,
      created_by: 1,
      history: { $ifNull: ['$history.history', []] },
      createdAtMonth: {
        $month: '$tx_date',
      },
    },
  },
  {
    $match: {
      createdAtMonth: month,
    },
  },
  {
    $sort: {
      tx_date: -1,
    },
  },
];
