import axios, { AxiosError, AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { FC, ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContent } from 'react-toastify';
import * as yup from 'yup';

import { formatNumber, statusColor } from '@/lib/utils';

import InputForm from '@/components/Input';
import Modal from '@/components/Modal';
import { EditData, initPayload } from '@/components/table/Table';
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

interface ModalEditTrasactionProps {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectedDataState: [EditData, React.Dispatch<React.SetStateAction<EditData>>];
}

interface InputError {
  [x: string]: ToastContent<string>;
}

const _baseUrl = process.env.BASE_URL;

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

const edittTransaction = async (payload: EditData) => {
  return axios.post(`${_baseUrl}/api/edit-transaction`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const ModalEditTrasaction = ({
  state,
  selectedDataState,
}: ModalEditTrasactionProps) => {
  const user =
    typeof window !== 'undefined' ? localStorage.getItem('user') : '';
  const queryClient = useQueryClient();
  const [modalEdit, setModalEdit] = state;
  const [selectedData, setSelectedData] = selectedDataState;

  const { isLoading, mutate } = useMutation<
    AxiosResponse,
    AxiosError<InputError>,
    EditData
  >({
    mutationFn: edittTransaction,
    onSuccess: async (data) => {
      await queryClient.refetchQueries();
      setModalEdit(false);
      setSelectedData(initPayload);
      toast(`Berhasil: ${data.data.message}`, {
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
      toast.error(error.response?.data.error, {
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

  const validationSchema = yup.object({
    name: yup.string().required('Nama transaksi harus diisi'),
    amount: yup.string().required('Jumlah uang harus diisi'),
  });

  const formik = useFormik({
    initialValues: selectedData,
    validationSchema: validationSchema,
    onSubmit: async (values: EditData) => {
      values.createdBy = user || 'none';
      mutate(values);
    },
  });

  return (
    <Modal
      isOpen={modalEdit}
      onClose={() => {
        setModalEdit(false);
        setSelectedData(initPayload);
      }}
    >
      <div className='max-h-full md:w-[400px]'>
        <div className='flex justify-center pb-2'>
          <h1 className='text-xl font-bold'>Ubah Transaksi</h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <InputForm
              title='Berita Transaksi'
              type='text'
              value={formik.values.name}
              id='name'
              placeholder='Masukkan nama transaksi'
              onChange={formik.handleChange}
              err={formik.errors.name}
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
              err={formik.errors.amount}
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='focus:shadow-outline mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none disabled:bg-gray-700'
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
