import React, { JSXElementConstructor, ReactElement, useState } from 'react';
import clsx from 'clsx';

interface Section {
  label: string;
  component: ReactElement<any, string | JSXElementConstructor<any>> | ReactElement<any, string | JSXElementConstructor<any>>[];
}

interface SectionTabsProps {
  sections: Section[];
}

const SectionTabs = (props: SectionTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div className='text-md font-medium text-center text-gray-500 border-gray-200'>
        <ul className='flex flex-wrap -mb-px'>
          {
            props.sections.map((section, index) => {
              return (
                <li key={section.label}>
                  <a href='#'
                     className={clsx('text-center inline-block px-2 py-1 rounded-t-lg border-b-2 border-transparent', index === selectedTab ? "border-blue-500 text-blue-500" : "hover:text-blue-500 hover:border-blue-500 border-gray-300")} onClick={() => {
                    setSelectedTab(index);
                  }}>{section.label}</a>
                </li>
              );
            })
          }
        </ul>

        <div className="mt-2">
          {props.sections[selectedTab].component}
        </div>
      </div>
    </>
  );
};

export { SectionTabs };