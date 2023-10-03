import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import InputForm from '@/components/Input';
import Modal from '@/components/Modal';
import SelectForm from '@/components/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
    id: 4,
    name: 'Mahesa',
  },
  {
    id: 3,
    name: 'Zamhadi',
  },
  {
    id: 2,
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
  amount: number | string;
}

const initPayload: Payload = {
  transactionName: '',
  sender: 0,
  receiver: 0,
  amount: '',
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
  const [isPayContribution, setIsPayContribution] = useState(false);
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

  const processPayload = (selected: number, field: string) => {
    const conditionCallback = (item: DataItem) => {
      if (field === 'sender') {
        if (isPayContribution && item.id === -1) return false;
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

  // sender dan receiver tidak boleh nol
  // transactionName tidak boleh kosong
  // amount tidak boleh kosong dan lebih dari 0

  const validationSchema = yup.object({
    transactionName: yup.string().required('Nama transaksi harus diisi'),
    sender: yup
      .number()
      .notOneOf([0], 'Pilih pengirim')
      .required('Pengirim harus diisi'),
    receiver: yup
      .number()
      .notOneOf([0], 'Pilih penerima')
      .required('Penerima harus diisi'),
    amount: yup.number().required('Jumlah uang harus diisi'),
  });

  const formik = useFormik({
    initialValues: payload,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      mutation.mutate(values);
      resetForm();
      setIsModalOpen(false);
      setIsPayContribution(false);
      console.log(values, 'values');
    },
  });

  const resetForm = () => {
    formik.resetForm({
      values: initPayload,
    });
  };

  const handlePayContribution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPayContribution(e.target.checked);
    if (e.target.checked) {
      formik.setFieldValue('transactionName', 'Bayar Iuran Rumah');
      formik.setFieldValue('receiver', Number(-1));
      formik.validateField('transactionName');
    } else {
      formik.setFieldValue('transactionName', '');
      formik.setFieldValue('receiver', Number(0));
    }
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

          <form onSubmit={formik.handleSubmit}>
            <div>
              <InputForm
                title='Berita Transaksi'
                type='text'
                value={formik.values.transactionName}
                isDisabled={isPayContribution}
                id='transactionName'
                placeholder='Masukkan nama transaksi'
                onChange={formik.handleChange}
                err={isPayContribution && formik?.errors?.transactionName}
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='toogleA'
                className='flex cursor-pointer items-center'
              >
                <div className='relative'>
                  <input
                    id='toogleA'
                    type='checkbox'
                    defaultChecked={isPayContribution}
                    onChange={handlePayContribution}
                    className='sr-only'
                  />
                  <div className='h-4 w-10 rounded-full bg-gray-400 shadow-inner'></div>
                  <div className='dot absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition'></div>
                </div>
                <div className='ml-3 block text-sm font-medium text-gray-900'>
                  Bayar Iuran Rumah
                </div>
              </label>
            </div>
            <div>
              <SelectForm
                title='Pengirim'
                id='sender'
                value={formik.values.sender}
                data={processPayload(formik.values.sender, 'sender')}
                onChange={(e) =>
                  formik.setFieldValue('sender', Number(e.target.value))
                }
                err={formik?.errors?.sender}
              />
            </div>
            <div>
              <SelectForm
                title='Penerima'
                id='receiver'
                isDisabled={isPayContribution}
                value={formik.values.receiver}
                data={processPayload(formik.values.sender, 'receiver')}
                onChange={(e) =>
                  formik.setFieldValue('receiver', Number(e.target.value))
                }
                err={formik?.errors?.receiver}
              />
            </div>
            <div>
              <InputForm
                title='Jumlah'
                type='text'
                value={formik.values.amount}
                id='amount'
                placeholder='Masukkan jumlah uang'
                onChange={formik.handleChange}
                err={formik?.errors?.amount}
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
