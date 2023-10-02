'use client';
import InputForm from '@/app/components/input';
import Modal from '@/app/components/modal';
import SelectForm from '@/app/components/select';
import React, { useState } from 'react';

export default function ModalHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <React.Fragment>
      <div className='mt-5 flex justify-between'>
        <button
          onClick={openModal}
          className='focus:shadow-outline inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none'
        >
          Add New Transaction
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='max-h-full w-[300px]'>
          <div className='flex justify-center pb-7'>
            <h1 className='text-xl font-bold'>Pencatatan Dimulai</h1>
          </div>

          <form>
            <div>
              <SelectForm title='Fighter' id='name' value='berak' />
            </div>
            <div>
              <InputForm
                title='Amount'
                type='number'
                id='amount'
                placeholder='Masukkan jumlah uang'
              />
            </div>
            <div>
              <InputForm
                title='Sender'
                type='text'
                id='sender'
                placeholder='Nama pengirim'
              />
            </div>
            <div>
              <InputForm
                title='Receiver'
                type='text'
                id='receiver'
                placeholder='Nama penerima'
              />
            </div>
            <button
              type='submit'
              className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}
