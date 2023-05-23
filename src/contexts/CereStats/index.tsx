import React, { useState, useEffect, createContext } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { defaultCereStatsContext } from './defaults';
import { CereStatsContextInterface } from './types';
import { useConnect } from '../Connect';
import { useApi } from '../Api';
import { UIContextInterface } from '../UI/types';
import { useUi } from '../UI';

const CereStatsContext = createContext<CereStatsContextInterface>(
  defaultCereStatsContext
);

export const useCereStats = () => React.useContext(CereStatsContext);

export const CereStatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { network, isReady } = useApi();
  const { services }: UIContextInterface = useUi();
  const { activeAccount } = useConnect();

  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [payouts, setPayouts] = useState([]);

  // reset payouts on network switch
  useEffect(() => {
    setPayouts([]);
  }, [network]);

  // fetch payouts as soon as network is ready
  useEffect(() => {
    if (isReady) {
      fetchPayouts();
    }
  }, [isReady, network, activeAccount]);

  // fetch payouts on services toggle
  useEffect(() => {
    fetchPayouts();
  }, [services]);

  useEffect(() => {
    const wsLink = new WebSocketLink({
      uri: 'wss://hasura.stats.cere.network/v1/graphql',
      options: {
        reconnect: true,
      },
    });

    const _client = new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
    });

    setClient(_client);
  }, []);

  const fetchEraPoints = async (address: string, era: number) => {
    if (!address || !client) {
      return [];
    }

    const { data } = await client.query({
      query: gql`
        query EraPoints($stashAddress: String) {
          era_points(where: { stash_address: { _eq: $stashAddress } }) {
            stash_address
            era
            points
          }
        }
      `,
      variables: { stashAddress: address },
    });

    return data.era_points;
  };

  const fetchPayouts = async () => {
    if (!activeAccount || !client) {
      return;
    }

    const { data } = await client.query({
      query: gql`
        query RewardEvents($activeAccount: String) {
          event(
            where: {
              section: { _eq: "staking" }
              method: { _like: "Reward%" }
              data: { _regex: $activeAccount }
            }
          ) {
            block_number
            data
            timestamp
          }
        }
      `,
      variables: {
        activeAccount,
      },
    });

    setPayouts(data.payouts); // replace with the actual key in the response
  };

  if (!client) {
    return null;
  }

  return (
    <CereStatsContext.Provider
      value={{
        fetchEraPoints,
        payouts,
      }}
    >
      {children}
    </CereStatsContext.Provider>
  );
};
