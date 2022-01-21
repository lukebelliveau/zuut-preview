import React, { createRef } from 'react';
import { Helmet } from 'react-helmet';
import { FullPage, Slide } from 'react-full-page';

import EnterName from './NewPlayground/EnterName';
import EnterDimensions from './NewPlayground/EnterDimensions';

export const new_playground_path = () => '/playgrounds/new';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();

  function nextPage() {
    fullPageRef.current.scrollNext();
  }

  return (<>
    <Helmet><title>Zuut - Create a new grow</title></Helmet>
    <FullPage ref={fullPageRef}>
      <Slide>
        <EnterName nextPage={nextPage} />
      </Slide>
      <Slide>
        <EnterDimensions nextPage={nextPage} />
      </Slide>
    </FullPage>
  </>);
}
