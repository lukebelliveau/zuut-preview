import { useEffect, useState, createRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FullPage, Slide } from 'react-full-page';
import { useDispatch } from 'react-redux';

import EnterName from './NewPlayground/EnterName';
import EnterDimensions from './NewPlayground/EnterDimensions';

export const new_playground_path = () => '/playgrounds/new';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();

  function nextPage() {
    fullPageRef.current.scrollNext();
  }

  return (
    <>
      <Helmet>
        <title>Zuut - Create a new grow</title>
      </Helmet>
      <FullPage ref={fullPageRef}>
        <Slide>
          <EnterName nextPage={nextPage} />
        </Slide>
        <Slide>
          <EnterDimensions />
        </Slide>
      </FullPage>
    </>
  );
}
