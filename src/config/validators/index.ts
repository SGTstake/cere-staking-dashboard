// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* Import your SVG Here.
 * Use upper camel-case for your SVG import, lower camel case for the svg.
 * import { ReactComponent as ValidatorEntityName } from './thumbnails/validatorEntityName.svg';
 */
import { ReactComponent as Cere } from './thumbnails/cere.svg';
import { ReactComponent as XameyzIdentity } from './thumbnails/xameyz.svg';
import { ReactComponent as AnyValid } from './thumbnails/anyvalid.svg';
import { ReactComponent as SerGo } from './thumbnails/SerGo.svg';

export const VALIDATOR_COMMUNITY = [
  {
    name: 'CERE',
    Thumbnail: Cere,
    bio: `Official Validators from Cere Network, the world's first Decentralized Data Cloud platform.`,
    email: 'team@cere.network',
    website: 'https://cere.network',
    twitter: '@CereNetwork',
    validators: {
      cere: [
        '6S4mrsCrqWoBAYrp2PKQNh7CYcCtyEtYpx5J626Kj5vszSyy',
        '6QhzyvZQm3dLjDmeaoUnLPXzfuTi6X1HEo6AX6gfVbC3shzD',
        '6RgfwDiQTLjgbkQ5CorrKtRtCaDABQKYsibk9MeyvzmKFrk2',
        '6TBhZAgtFc3Wr8BeNu5tdMJG1NDpxKbG2Hwf2UbVtMGyFxzN',
        '6Pyh9zZgp4XCP338VDG7oshK7PvsAdyuBN6S2NNm7CBoCXx8',
        '6S9tXQmPYoeBXYey8vKYi9BMbNMD8Zgqb62k7SYMNQLUbydZ',
        '6PwAv2L43zGPEwHTb1L7LyCWv7yq2Hc4dSVYHvvi1kscCR91',
        '6Qshjra42mLDtc9ouHzUz1bMmYXg2qasmW2xSLgendRdsYED',
      ],
    },
  },
  {
    name: 'Xameyz',
    Thumbnail: XameyzIdentity,
    bio: `Just a humble validator on a humble decentralized network.`,
    email: 'xameyz.crypto@yahoo.com',
    website: '',
    twitter: '@xameyz',
    validators: {
      cere: ['6TYC5go4hQ85NxmGK8c658cmJozxeohKfp6YbDGC5r1HJ6nZ'],
    },
  },
  {
    name: 'AnyValid',
    Thumbnail: AnyValid,
    bio: `Professional Proof-of-Stake Networks Validation Services`,
    email: 'mail@anyvalid.com',
    website: 'https://anyvalid.com',
    twitter: '@anyvalid',
    validators: {
      cere: ['6UDVCKB9opndqcRAxTpTvKFTFXUwvE36aYnp1bNyVV3Cfh16'],
    },
  },
  {
    name: 'SerGo',
    Thumbnail: SerGo,
    bio: `We validate with expertise, you earn with confidence.`,
    email: 'contact@sergo.dev',
    website: 'https://sergo.dev',
    twitter: '',
    validators: {
      cere: ['6SpjH8swCtFwmntQmdikMWyDKgr59q1cLauePYc2iqwwe6Bv'],
    },
  },
  {
    name: 'SGTstake',
    Thumbnail: SGTstake,
    bio: `Professional validator service`,
    email: 'adorid@sgtstake.com',
    website: 'https://sgtstake.com',
    twitter: '@SgTstake',
    validators: {
      cere: ['6Qee9AkfHVxEv5jYYoXypQfknz8VmBiu8GiGuspp7yxchUvG'],
    },
  },
];
