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
      <div className='mt-3 flex flex-col '>
        {isOpen && (
          <div className='flex justify-between text-white'>{children}</div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
