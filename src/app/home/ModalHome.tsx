import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import InputForm from '@/components/Input';
import Modal from '@/components/Modal';
import SelectForm from '@/components/Select';

export interface DataItem {
  id: number;
  name: string;
}

const data: DataItem[] = [
  {
    id: 1,
    name: 'Risky',
  },
  {
    id: 2,
    name: 'Mahesa',
  },
  {
    id: 3,
    name: 'Zamhadi',
  },
  {
    id: 4,
    name: 'Kevin',
  },
  {
    id: -1,
    name: 'Rumah',
  },
  {
    id: -2,
    name: 'Pengeluaran',
  },
];

interface Payload {
  transactionName: string;
  sender: number;
  receiver: number;
  amount: number;
}

const initPayload: Payload = {
  transactionName: '',
  sender: 0,
  receiver: 0,
  amount: 0,
};

const processPayload = (selected: number, field: string) => {
  const conditionCallback = (item: DataItem) => {
    if (field === 'sender') {
      if (item.id === -2) return false;
    } else {
      if (selected < 0) {
        if (item.id === -2) return true;
        return item.id > 0;
      } else {
        return item.id < 0;
      }
    }
    return true;
  };

  return data.filter(conditionCallback);
};

const _baseUrl = process.env.BASE_URL;

const addNewTransaction = async (payload: Payload) => {
  try {
    const data = await fetch(`${_baseUrl}api/add-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};

export default function ModalHome() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<Payload>(initPayload);
  const mutation = useMutation({
    mutationFn: addNewTransaction,
    onSuccess: async () => {
      await queryClient.refetchQueries();
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    setPayload({
      ...payload,
      [field]: Number(e.target.value),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    mutation.mutate(payload);
    setPayload(initPayload);
    setIsModalOpen(false);
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div className='mt-5 flex justify-between'>
        <button
          onClick={openModal}
          className='focus:shadow-outline inline-flex h-10 items-center justify-center rounded-lg bg-blue-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-blue-800 focus:outline-none'
        >
          Add New Transaction
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='max-h-full md:w-[400px]'>
          <div className='flex justify-center pb-2'>
            <h1 className='text-xl font-bold'>Pencatatan Dimulai</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <InputForm
                title='Berita Transaksi'
                type='text'
                value={payload.transactionName}
                id='transactionName'
                placeholder='Masukkan nama transaksi'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <SelectForm
                title='Pengirim'
                id='sender'
                value={payload.sender}
                data={processPayload(payload.sender, 'sender')}
                onChange={(e) => handleSelect(e, 'sender')}
              />
            </div>
            <div>
              <SelectForm
                title='Penerima'
                id='receiver'
                value={payload.receiver}
                data={processPayload(payload.sender, 'receiver')}
                onChange={(e) => handleSelect(e, 'receiver')}
              />
            </div>
            <div>
              <InputForm
                title='Jumlah'
                type='text'
                value={payload.amount}
                id='amount'
                placeholder='Masukkan jumlah uang'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type='submit'
              className='focus:shadow-outline mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none'
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}
