export const _settledAndDebtSummary = [
  {
    $facet: {
      debtSummary: [
        {
          $match: {
            tx_reciver: -2,
            tx_sender: { $not: { $eq: -1 } },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'tx_sender',
            foreignField: 'user_id',
            as: 'senderUser',
          },
        },
        {
          $unwind: '$senderUser',
        },
        {
          $group: {
            _id: '$senderUser.user_id',
            name: { $first: '$senderUser.name' },
            total_debt: { $sum: '$tx_amount' },
          },
        },
        {
          $project: {
            user_id: '$_id',
            name: 1,
            total_debt: 1,
            _id: 0,
          },
        },
      ],
      settledDebtSummary: [
        {
          $match: {
            tx_reciver: { $gt: 0 },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'tx_sender',
            foreignField: 'user_id',
            as: 'settledUser',
          },
        },
        {
          $unwind: '$settledUser',
        },
        {
          $group: {
            _id: '$tx_reciver',
            settled_debt: { $sum: '$tx_amount' },
          },
        },
        {
          $project: {
            tx_reciver: '$_id',
            settled_debt: 1,
            _id: 0,
          },
        },
      ],
    },
  },
  // {
  //   $unwind: '$debtSummary',
  // },
  // {
  //   $lookup: {
  //     from: 'settledDebtSummary',
  //     localField: 'debtSummary.user_id',
  //     foreignField: 'tx_reciver',
  //     as: 'settledDebt',
  //   },
  // },
  // {
  //   $unwind: { path: '$settledDebt', preserveNullAndEmptyArrays: true },
  // },
  // {
  //   $project: {
  //     // data: '$debtSummary',
  //     hutang_kepada: '$debtSummary.name',
  //     total_hutang: {
  //       $subtract: [
  //         '$debtSummary.total_debt',
  //         { $ifNull: ['$settledDebt.settled_debt', 0] },
  //       ],
  //     },
  //   },
  // },
];
