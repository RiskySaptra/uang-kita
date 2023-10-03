export const _findTotalDebt = (user_id: number) => [
  {
    $facet: {
      senderPipeline: [
        {
          $match: {
            tx_reciver: -2,
            tx_sender: user_id,
          },
        },
        {
          $group: {
            _id: null,
            total_debt: { $sum: '$tx_amount' },
          },
        },
      ],
      receiverPipeline: [
        {
          $match: {
            tx_reciver: user_id,
          },
        },
        {
          $group: {
            _id: null,
            settled_debt: { $sum: '$tx_amount' },
          },
        },
      ],
    },
  },
  {
    $project: {
      difference: {
        $subtract: [
          {
            $arrayElemAt: ['$senderPipeline.total_debt', 0],
          },
          {
            $arrayElemAt: ['$receiverPipeline.settled_debt', 0],
          },
        ],
      },
    },
  },
];
