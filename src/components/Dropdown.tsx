import React, { ReactNode } from 'react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isId: number;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, isId, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className=''>
        {isOpen && <div className='grid grid-cols-3 gap-4'>{children}</div>}
      </div>
    </>
  );
};

export default Dropdown;
