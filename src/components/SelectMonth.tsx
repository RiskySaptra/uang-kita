import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

const SelectMonth = ({
  onChange,
  value,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  dayjs.extend(localeData);

  return (
    <div className='ml-5 w-[140px]'>
      <select
        id='select-month'
        value={value}
        onChange={onChange}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 '
      >
        {dayjs.months().map((month: string, index) => (
          <option key={month} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectMonth;
