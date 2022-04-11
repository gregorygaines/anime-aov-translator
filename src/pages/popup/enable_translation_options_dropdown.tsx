import clsx from 'clsx';
import React, { useState } from 'react';

interface Option {
  label: string;
  selection: string;
  value: string;
}

const translationOptions: Option[] = [
  { label: 'Enabled', selection: 'Enable', value: 'enable' },
  {
    label: 'Enabled for allow-listed sites',
    selection: 'Enable for allow-listed sites',
    value: 'enable_for_allow_listed_sites',
  },
  { label: 'Disabled', selection: 'Disable', value: 'disable' },
];

const EnableTranslationOptionsDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState<Boolean>(false);
  const [translationOption, setTranslationOption] = useState<String>(translationOptions[2].label);

  const handleTranslationButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleTranslationOptionSelected = (translationOption: String) => {

    let command: string = '';

    if (translationOption == translationOptions[0].label) {
      command = "start_recording"
    } else {
      command = "stop_recording";
    }

    const message = {
      command: command
    }

    chrome.runtime.sendMessage(message, (response) => {
      console.log(response);
    })

    setTranslationOption(translationOption);
    setDropdownVisible(false);
  };

  return (
    <>
      <button
        className='bg-blue-600 px-5 py-2 rounded text-white font-medium inline-flex items-center w-full inline-flex justify-center text-md'
        onClick={() => handleTranslationButtonClick()}>{translationOption}
        <svg
          className={clsx('ml-1 w-4 h-4  transition duration-150 ease-in-out', dropdownVisible && 'rotate-180')}
          fill='none' stroke='currentColor' viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      <div
        className={clsx('mt-1 mx-auto z-10 w-full bg-white rounded shadow-lg border', !dropdownVisible && 'hidden')}>
        <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefault'>
          {
            translationOptions.map((option) => {
              return (
                <li key={option.label}>
                  <button
                    className='block py-2 px-4 text-xs hover:bg-blue-600 hover:text-white text-gray-600 w-full text-left'
                    onClick={() => handleTranslationOptionSelected(option.label)}>{option.selection}</button>
                </li>
              );
            })
          }
        </ul>
      </div>

    </>
  );
};

export { EnableTranslationOptionsDropdown };