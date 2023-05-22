import React, { useState, useEffect, createContext } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { defaultCereStatsContext } from './defaults';
import { CereStatsContextInterface } from './types';
import { useConnect } from '../Connect';

const CereStatsContext = createContext<CereStatsContextInterface>(
  defaultCereStatsContext
);

export const useCereStats = () => React.useContext(CereStatsContext);

export const CereStatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { activeAccount } = useConnect();
  console.log('activeAccount', activeAccount);

  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [payouts, setPayouts] = useState([]);

  // replace with your era points GraphQL query
  const ERA_POINTS_QUERY = `
      subscription EraPoints($stashAddress: String) {
        era_points(
          where: { stash_address: { _eq: $stashAddress } }
        ) {
          stash_address
          era
          points
        }
      }
    `;

  // replace with your payouts GraphQL query
  const PAYOUTS_QUERY = `
    query FetchPayouts {
      //...
    }
  `;

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
      // @ts-ignore
      query: ERA_POINTS_QUERY,
      variables: { address, era },
    });

    return data.eraPoints; // replace with the actual key in the response
  };

  const fetchPayouts = async (address: string) => {
    if (!address || !client) {
      return;
    }

    const { data } = await client.query({
      // @ts-ignore
      query: PAYOUTS_QUERY,
      variables: { address },
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
