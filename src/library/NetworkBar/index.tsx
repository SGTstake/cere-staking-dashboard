// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState, useRef } from 'react';
import { useApi } from 'contexts/Api';
import { useOutsideAlerter } from 'library/Hooks';
import { Wrapper, Summary, NetworkInfo, Separator } from './Wrappers';
import { Status } from './Status';

export const NetworkBar = () => {
  const { network } = useApi();

  // currently not in use
  const [open, setOpen] = useState(false);

  // handle expand transitions
  const variants = {
    minimised: {
      height: '2.5rem',
    },
    maximised: {
      height: '155px',
    },
  };

  const animate = open ? 'maximised' : 'minimised';
  const ref = useRef(null);

  const PRIVACY_URL = process.env.REACT_APP_PRIVACY_URL;
  const DISCLAIMER_URL = process.env.REACT_APP_DISCLAIMER_URL;
  const ORGANISATION = process.env.REACT_APP_ORGANISATION;

  useOutsideAlerter(
    ref,
    () => {
      setOpen(false);
    },
    ['igignore-network-info-toggle']
  );

  return (
    <Wrapper
      ref={ref}
      initial={false}
      animate={animate}
      transition={{
        duration: 0.4,
        type: 'spring',
        bounce: 0.25,
      }}
      variants={variants}
    >
      <Summary>
        <section>
          <network.brand.icon className="network_icon" />
          <p>{ORGANISATION === undefined ? network.name : ORGANISATION}</p>
          <Separator />
          {PRIVACY_URL !== undefined ? (
            <p>
              <a href={PRIVACY_URL} target="_blank" rel="noreferrer">
                Privacy
              </a>
            </p>
          ) : (
            <Status />
          )}
          {DISCLAIMER_URL !== undefined && (
            <>
              <Separator />
              <p>
                <a href={DISCLAIMER_URL} target="_blank" rel="noreferrer">
                  Disclaimer
                </a>
              </p>
            </>
          )}
        </section>
        <section>
          <div className="hide-small" />
        </section>
      </Summary>

      <NetworkInfo />
    </Wrapper>
  );
};

export default NetworkBar;
