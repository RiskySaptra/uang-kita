import { FC, ReactNode } from 'react';

import { statusColor } from '@/lib/utils';

import { ToolTip } from '@/components/Tooltip';

interface NameTooltipProps {
  name: string;
  sender: string;
  receiver: string;
  createdBy?: string;
}

interface TransactionDecorationProps {
  sender: string;
  receiver: string;
  children: ReactNode;
}

export const NameTooltip: FC<NameTooltipProps> = ({
  createdBy,
  sender,
  receiver,
  name,
}) => {
  return (
    <ToolTip tooltip={`Di Buat Oleh: ${createdBy}`}>
      <span
        className={`min-h-5 min-w-5 text mr-2 inline-block rounded-full ${statusColor(
          sender,
          receiver
        )} select-none text-transparent`}
      >
        |
      </span>
      {name}
    </ToolTip>
  );
};

export const TransactionDecoration: FC<TransactionDecorationProps> = ({
  sender,
  receiver,
  children,
}) => {
  return (
    <p
      className={`text-sm capitalize text-gray-800 underline ${statusColor(
        sender,
        receiver,
        'decoration'
      )}`}
    >
      {children}
    </p>
  );
};
