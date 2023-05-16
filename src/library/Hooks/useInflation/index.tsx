// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useApi } from 'contexts/Api';
import { useNetworkMetrics } from 'contexts/Network';
import { useStaking } from 'contexts/Staking';
import BN from 'bn.js';

export const useInflation = () => {
  const { network } = useApi();
  const { metrics } = useNetworkMetrics();
  const { staking } = useStaking();
  const { params } = network;
  const { lastTotalStake } = staking;
  const { totalIssuance } = metrics;

  const { falloff, maxInflation, minInflation, stakeTarget } = params;

  const BN_MILLION = new BN('1000000');

  const calculateInflation = (totalStaked: BN) => {
    const stakedFraction =
      totalStaked.isZero() || totalIssuance.isZero()
        ? 0
        : totalStaked.mul(BN_MILLION).div(totalIssuance).toNumber() /
          BN_MILLION.toNumber();

    // The idealStake is equal to stakeTarget since
    // Cere Network doesn't provide auctionMax, numAuctions and auctionAdjust so far.
    const idealStake = stakeTarget;

    const idealInterest = maxInflation / idealStake;
    const inflation =
      100 *
      (minInflation +
        (stakedFraction <= idealStake
          ? stakedFraction * (idealInterest - minInflation / idealStake)
          : (idealInterest * idealStake - minInflation) *
            2 ** ((idealStake - stakedFraction) / falloff)));

    return {
      idealInterest,
      idealStake,
      inflation,
      stakedFraction,
      stakedReturn: stakedFraction ? inflation / stakedFraction : 0,
    };
  };

  return calculateInflation(lastTotalStake);
};

export default useInflation;
