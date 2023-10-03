import React, { MouseEvent, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal only if the click is on the overlay (outside the modal content)
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overscroll-none'>
      <div
        className='absolute z-[-1] h-screen w-screen'
        onClick={handleOverlayClick}
      />
      <div className='relative min-w-[300px] rounded-lg bg-white shadow-md'>
        <button className='absolute right-4 top-1 text-3xl' onClick={onClose}>
          &times;
        </button>
        <div className='p-8'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
