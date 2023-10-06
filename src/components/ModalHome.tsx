import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

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
  createdBy: string;
}

const initPayload: Payload = {
  transactionName: '',
  sender: 0,
  receiver: 0,
  amount: '',
  createdBy: '',
};

const _baseUrl = process.env.BASE_URL;

const addNewTransaction = async (payload: Payload) => {
  return axios.post(`${_baseUrl}/api/add-transaction`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default function ModalHome() {
  const queryClient = useQueryClient();
  const [userModal, setUserModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayContribution, setIsPayContribution] = useState(false);
  const user =
    typeof window !== 'undefined' ? localStorage.getItem('user') : '';

  const mutation = useMutation<any, any, Payload>({
    mutationFn: addNewTransaction,
    onSuccess: async (data) => {
      await queryClient.refetchQueries();
      resetForm();
      setIsModalOpen(false);
      setIsPayContribution(false);
      toast(`Berhasil: ${data.data.insertedId}`, {
        position: 'bottom-left',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: 'bottom-left',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
  });

  const openModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      setUserModal(true);
    }
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
    amount: yup.string().required('Jumlah uang harus diisi'),
  });

  const formik = useFormik({
    initialValues: initPayload,
    validationSchema: validationSchema,
    onSubmit: async (values: Payload) => {
      values.createdBy = user || 'none';
      mutation.mutate(values);
    },
  });

  const resetForm = () => {
    formik.resetForm({
      values: initPayload,
    });
  };

  const handlePayContribution = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPayContribution(e.target.checked);
    if (e.target.checked) {
      await formik.setFieldValue('transactionName', 'Bayar Iuran Rumah', false);
      formik.setFieldValue('receiver', Number(-1));
    } else {
      await formik.setFieldValue('transactionName', '');
      formik.setFieldValue('receiver', Number(0));
    }
  };

  function formatNumber(n: string) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <React.Fragment>
      <div>
        <button
          onClick={openModal}
          className='focus:shadow-outline inline-flex h-10 items-center justify-center rounded-lg bg-blue-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-blue-800 focus:outline-none'
        >
          Buat Transaksi
        </button>
      </div>
      <AddUserIdentification state={[userModal, setUserModal]} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='max-h-full md:w-[400px]'>
          <div className='flex justify-center pb-2'>
            <h1 className='text-xl font-bold'>Edit Transaksi</h1>
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
                err={formik?.errors?.transactionName}
              />
            </div>
            <div className='my-2'>
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
                value={formatNumber(formik.values.amount.toString())}
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

interface AddUserIdentificationProps {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const AddUserIdentification: React.FC<AddUserIdentificationProps> = ({
  state,
}) => {
  const [user, setUser] = useState<number>(0);
  const [userModal, setUserModal] = state;
  const setUserToStorage = () => {
    if (user > 0) {
      const username = data.find((itm) => itm.id === user);
      localStorage.setItem('user', username?.name || '');
      setUserModal(false);
    }
  };

  return (
    <Modal isOpen={userModal} onClose={() => setUserModal(false)}>
      <div className='max-h-full md:w-[400px]'>
        <div className='flex justify-center pb-2'>
          <h1 className='text-xl font-bold'>Siapa anda</h1>
        </div>
        <div>
          <SelectForm
            title='Pengirim'
            id='sender'
            value={user}
            data={data.filter((itm) => itm.id > 0)}
            onChange={(e) => setUser(Number(e.target.value))}
          />
        </div>
        <button
          onClick={setUserToStorage}
          className='focus:shadow-outline mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none'
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};
