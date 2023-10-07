import { useState } from 'react';

import Modal from '@/components/Modal';
import SelectForm from '@/components/Select';

import { data } from '@/constant/common';

interface AddUserIdentificationProps {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  modalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserIdentification: React.FC<AddUserIdentificationProps> = ({
  state,
  modalForm,
}) => {
  const [user, setUser] = useState<number>(0);
  const [userModal, setUserModal] = state;
  const setUserToStorage = () => {
    if (user > 0) {
      const username = data.find((itm) => itm.id === user);
      localStorage.setItem('user', username?.name || '');
      setUserModal(false);
      modalForm(true);
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

export default AddUserIdentification;
