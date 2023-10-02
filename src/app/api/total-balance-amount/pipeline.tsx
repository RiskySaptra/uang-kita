export const _totalBalanceAmount = [
  {
    $match: {
      $or: [{ tx_reciver: -1 }, { tx_sender: -1 }],
    },
  },
  {
    $group: {
      _id: null,
      total_to: {
        $sum: {
          $cond: [{ $eq: ['$tx_reciver', -1] }, '$tx_amount', 0],
        },
      },
      total_from: {
        $sum: {
          $cond: [{ $eq: ['$tx_sender', -1] }, '$tx_amount', 0],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      total_balance: {
        $subtract: ['$total_to', '$total_from'],
      },
    },
  },
];
