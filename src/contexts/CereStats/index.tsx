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
import { Network } from '../../types';

const useApolloClient = (endpoint: Network['cereStatsEndpoint']) => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const wsLink = new WebSocketLink({
      uri: endpoint,
      options: {
        reconnect: true,
      },
    });

    const _client = new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
    });

    setClient(_client);
  }, [endpoint]);

  return client;
};

const useFetchEraPoints = (
  client: ApolloClient<NormalizedCacheObject> | null
) => {
  const fetchEraPoints = async (address: string, activeEraIndex: number) => {
    if (!address || !client) {
      return [];
    }

    const { data } = await client.query({
      query: gql`
        query EraPoints($stashAddress: String) {
          era_points(where: { stash_address: { _eq: $stashAddress } }) {
            era
            points
          }
        }
      `,
      variables: { stashAddress: address },
    });

    if (data?.era_points !== null) {
      const list = [];
      // Set a constant for the number of eras we want to display
      const ERAS_TO_SHOW = 100;

      for (let i = activeEraIndex; i > activeEraIndex - ERAS_TO_SHOW; i--) {
        list.push({
          era: i,
          reward_point:
            data.era_points.find((item: any) => item.era === i)?.points ?? 0,
        });
      }
      // removes last zero item and returns
      return list.reverse().splice(0, list.length - 1);
    }

    return [];
  };

  return fetchEraPoints;
};

// Fetch Payouts Hook
const usePayouts = (
  client: ApolloClient<NormalizedCacheObject> | null,
  activeAccount: string | null
) => {
  const [payouts, setPayouts] = useState([]);

  const normalizePayouts = (
    payoutData: { block_number: number; data: string; timestamp: number }[]
  ) => {
    return payoutData
      .map(({ block_number, data, timestamp }) => {
        let amount = 0;

        // Using regex to extract the second parameter from the data string
        const match = data.match(/,\s*(\d+)\s*\]/);

        if (match && match[1]) {
          amount = parseInt(match[1], 10);
        }

        return {
          amount,
          block_num: block_number,
          block_timestamp: timestamp,
        };
      })
      .sort((a, b) => b.block_timestamp - a.block_timestamp);
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
              data: { _like: $activeAccount }
            }
          ) {
            block_number
            data
            timestamp
          }
        }
      `,
      variables: {
        activeAccount: `%${activeAccount}%`,
      },
    });

    // @ts-ignore
    setPayouts(normalizePayouts(data.event));
  };

  useEffect(() => {
    fetchPayouts();
  }, [client, activeAccount]);

  return payouts;
};

const CereStatsContext = createContext<CereStatsContextInterface>(
  defaultCereStatsContext
);

export const useCereStats = () => React.useContext(CereStatsContext);

export const CereStatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { network } = useApi();
  const { activeAccount } = useConnect();

  const client = useApolloClient(network.cereStatsEndpoint);
  const fetchEraPoints = useFetchEraPoints(client);
  const payouts = usePayouts(client, activeAccount);

  if (!client) {
    return null;
  }

  return (
    <CereStatsContext.Provider
      value={{
        fetchEraPoints,
        payouts,
        poolClaims: [],
      }}
    >
      {children}
    </CereStatsContext.Provider>
  );
};
