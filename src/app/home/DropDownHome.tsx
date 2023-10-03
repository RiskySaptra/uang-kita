import React, { useState } from 'react';

import Dropdown from '@/components/Dropdown';

interface Props {
  item: any;
}

const DropDownHome: React.FC<Props> = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<any>({
    isOpen: false,
    id: null,
  });

  const openDropdown = (id: any) => {
    setIsDropdownOpen({
      isOpen: !isDropdownOpen.isOpen,
      id: id,
    });
  };

  const closeDropdown = (id: any) => {
    setIsDropdownOpen({ isOpen: false, id: id });
  };

  return (
    <div
      className='flex cursor-pointer rounded bg-gray-800 p-3 text-white'
      onClick={() => openDropdown(item._id)}
    >
      <div className='w-full'>
        {!isDropdownOpen.isOpen && (
          <div>
            <p className='font-medium'>{item.title}</p>
            <p className='text-xl font-semibold'>{item.amount}</p>
          </div>
        )}

        <Dropdown
          isOpen={isDropdownOpen.isOpen && isDropdownOpen.id === item._id}
          onClose={() => closeDropdown}
          isId={isDropdownOpen.id}
        >
          <div>
            <div>Nama</div>
            <div>M Risky</div>
            <div>Zam hadi</div>
            <div>Mahesa</div>
            <div>Kevin</div>
          </div>
          <div>
            <div>Bulan Ini</div>
            <div>Rp.200,000</div>
            <div>Rp.200,000</div>
            <div>Rp.200,000</div>
            <div>Rp.200,000</div>
          </div>
          <div>
            <div>Total</div>
            <div>Rp.138</div>
            <div>Rp.138</div>
            <div>Rp.138</div>
            <div>Rp.138</div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default DropDownHome;
