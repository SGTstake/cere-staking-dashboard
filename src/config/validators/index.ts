// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* Import your SVG Here.
 * Use upper camel-case for your SVG import, lower camel case for the svg.
 * import { ReactComponent as ValidatorEntityName } from './thumbnails/validatorEntityName.svg';
 */
import { ReactComponent as AnyValid } from './thumbnails/anyvalid.svg';

export const VALIDATOR_COMMUNITY = [
  {
    name: 'AnyValid',
    Thumbnail: AnyValid,
    bio: `Professional Proof-of-Stake Networks Validation Services`,
    email: 'mail@anyvalid.com',
    website: 'https://anyvalid.com',
    twitter: '@anyvalid',
    validators: {
      cere: [
        '6UDVCKB9opndqcRAxTpTvKFTFXUwvE36aYnp1bNyVV3Cfh16',
      ],
    },
  },
];
