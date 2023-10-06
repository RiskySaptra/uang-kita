import { FC, ReactNode, useRef } from 'react';

interface Props {
  children: ReactNode;
  tooltip?: string;
}

export const ToolTip: FC<Props> = ({ children, tooltip }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + 'px';
      }}
      className='group relative inline-block'
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className='invisible absolute top-[-38px] mt-2 whitespace-nowrap rounded bg-blue-800 p-1 px-3 text-white opacity-0 transition group-hover:visible group-hover:opacity-100'
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
