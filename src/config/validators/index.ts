// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* Import your SVG Here.
 * Use upper camel-case for your SVG import, lower camel case for the svg.
 * import { ReactComponent as ValidatorEntityName } from './thumbnails/validatorEntityName.svg';
 */
import { ReactComponent as Cere } from './thumbnails/cere.svg';

export const VALIDATOR_COMMUNITY = [
  {
    name: 'CERE',
    Thumbnail: Cere,
    bio: 'CERE',
    email: 'team@cere.network',
    website: 'https://cere.network',
    twitter: '@CereNetwork',
    validators: {
      'cere mainnet': [
        '6QhzyvZQm3dLjDmeaoUnLPXzfuTi6X1HEo6AX6gfVbC3shzD',
        '6S4mrsCrqWoBAYrp2PKQNh7CYcCtyEtYpx5J626Kj5vszSyy',
      ],
    },
  },
];
