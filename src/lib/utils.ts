import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { TotalSumProps } from '@/app/page';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  const formattedValue = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

  return formattedValue;
}

export const statusColor = (sender: string, reciver: string, type?: string) => {
  if (type === 'decoration') {
    if (sender === 'rekonsiliasi') return `decoration-yellow-500`;
    if (reciver === 'pengeluaran') return `decoration-red-500`;
    if (reciver === 'rumah') return `decoration-green-500`;
    return `decoration-blue-500`;
  }

  if (sender === 'rekonsiliasi') return `bg-yellow-500`;
  if (reciver === 'pengeluaran') return `bg-red-500`;
  if (reciver === 'rumah') return `bg-green-500`;
  return `bg-blue-500`;
};

export const transactionWording = (sender: string, receiver: string) => {
  if (sender !== 'rumah') {
    if (receiver === 'rumah') {
      if (sender === 'rekonsiliasi') {
        return 'Penyesuaian Saldo';
      }
      return `${sender} membayar kontribusi`;
    }
    if (receiver === 'pengeluaran') {
      return `rumah hutang kepada ${sender}`;
    }
    return sender;
  }

  if (sender === 'rumah') {
    if (receiver === 'pengeluaran') {
      return 'pengeluaran rumah';
    } else {
      return `rumah membayar hutang kepada ${receiver}`;
    }
  }
};

export const sumTotal = (data?: TotalSumProps[]) => {
  if (!data?.length) return 0;
  return data.reduce((prev, curr) => {
    return (prev += curr.total);
  }, 0);
};
