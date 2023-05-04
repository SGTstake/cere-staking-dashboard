// SPDX-License-Identifier: Apache-2.0
import { Networks } from 'types';
import { DEFAULT_PARAMS } from 'consts';
import { ReactComponent as CereLogoSvg } from 'img/cere.svg';

const cereMainnet = {
  name: 'Cere Mainnet',
  colors: {
    primary: {
      light: 'rgb(183, 174, 255)',
      dark: 'rgb(183, 174, 255)',
    },
    secondary: {
      light: '#Ec8f6e',
      dark: '#Ec8f6e',
    },
    transparent: {
      light: 'rgb(236,110,121,0.05)',
      dark: 'rgb(236,110,121, 0.05)',
    },
  },
  endpoint: 'wss://archive.mainnet.cere.network/ws',
  subscanEndpoint: '',
  unit: 'CERE',
  units: 12,
  ss58: 54,
  // It's a draft icons set
  brand: {
    icon: CereLogoSvg,
    logo: {
      svg: CereLogoSvg,
      width: '8.5rem',
    },
    inline: {
      svg: CereLogoSvg,
      size: '1.15rem',
    },
  },
  api: {
    unit: 'CERE',
    priceTicker: 'CEREUSDT',
  },
  features: {
    pools: false,
  },
  params: DEFAULT_PARAMS,
};

const cereTestnet = {
  ...cereMainnet,
  name: 'Cere Testnet',
  endpoint: 'wss://archive.testnet.cere.network/ws',
};

/*
 * Network Configuration
 */
export const NETWORKS: Networks = {
  cereMainnet,
  cereTestnet,
};
