import React from 'react';
import { Section } from '../../components/Section';
import { config } from '../../config';

const WhiteListedSites = () => {
  return (
    <Section title="Enabled sites">
      <ul className="list-none flex flex-col gap-2">
        {
          Object.values(config.whiteListedDomains).map((domain) => {
            return <li className="inline-flex gap-1" key={domain}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg> <p color="text-lg">{ domain }</p></li>;
          })
        }
      </ul>
    </Section>
  )
}

export { WhiteListedSites };