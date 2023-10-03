export const _transactionList = [
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
    },
  },
];
