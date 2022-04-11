import React from 'react';
import { EnableTranslationOptionsDropdown } from './enable_translation_options_dropdown';
import { Section } from '../../components/Section';

const HomeTab = () => {
  return (
    <>
      <Section>
        <EnableTranslationOptionsDropdown />
      </Section>
    </>
  );
}

export { HomeTab };