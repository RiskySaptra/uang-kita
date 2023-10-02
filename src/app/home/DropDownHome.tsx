import React, { useState } from 'react';

import Dropdown from '@/app/components/dropdown';

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
      className='flex cursor-pointer items-center justify-center rounded bg-gray-800'
      onClick={() => openDropdown(item._id)}
    >
      <div>
        <p className='dark:text-white-500 text-2xl text-white'>{item.title}</p>
        <div className='flex items-center justify-center text-white'>
          {item.amount}
        </div>
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
            <div>Bulan Lalu</div>
            <div>Rp.69</div>
            <div>Rp.69</div>
            <div>Rp.69</div>
            <div>Rp.69</div>
          </div>
          <div>
            <div>Bulan Ini</div>
            <div>Rp.69</div>
            <div>Rp.69</div>
            <div>Rp.69</div>
            <div>Rp.69</div>
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
