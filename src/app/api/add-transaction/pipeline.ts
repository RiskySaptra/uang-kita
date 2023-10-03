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
            _id: '$tx_sender',
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
            _id: '$tx_reciver',
            settled_debt: { $sum: '$tx_amount' },
          },
        },
      ],
    },
  },
  {
    $project: {
      receiverPipeline: {
        $cond: {
          if: {
            $eq: [{ $size: '$receiverPipeline' }, 0],
          },
          then: [{ _id: user_id, settled_debt: 0 }], // Dummy object
          else: '$receiverPipeline',
        },
      },
      senderPipeline: {
        $cond: {
          if: {
            $eq: [{ $size: '$senderPipeline' }, 0],
          },
          then: [{ _id: user_id, settled_debt: 0 }], // Dummy object
          else: '$senderPipeline',
        },
      },
    },
  },
  {
    $unwind: '$receiverPipeline',
  },
  {
    $unwind: '$senderPipeline',
  },
  {
    $project: {
      difference: {
        $subtract: [
          { $ifNull: ['$senderPipeline.total_debt', 0] },
          { $ifNull: ['$receiverPipeline.settled_debt', 0] },
        ],
      },
    },
  },
];
