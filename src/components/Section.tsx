import React from 'react';

interface SectionProps {
  title?: string;
  children: React.ReactElement | React.ReactElement[];
}

const Section = (props: SectionProps) => {
  return (
    <section className="text-center mx-auto text-xs text-gray-500 font-medium px-2">
      <header className="text-left mb-1">
        <p className="text-md">{ props.title }</p>
      </header>

      {
        props.children
      }
    </section>
  )
}

export { Section };