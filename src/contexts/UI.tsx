// Copyright 2022 @rossbulat/polkadot-staking-experience authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { useConnect } from './Connect';
import { useNetworkMetrics } from './Network';
import { useStaking } from './Staking';
import { useBalances } from './Balances';
import { useApi } from './Api';

export interface UIContextState {
  setSideMenu: (v: number) => void;
  setListFormat: (v: string) => void;
  orderValidators: (v: string) => void;
  applyValidatorOrder: (l: any, o: string) => any;
  applyValidatorFilters: (l: any, k: string, f?: any) => void;
  toggleFilterValidators: (v: string, l: any) => void;
  isSyncing: () => any;
  sideMenuOpen: number;
  listFormat: string;
  validators: any;
}

export const UIContext: React.Context<UIContextState> = React.createContext({
  setSideMenu: (v: number) => { },
  setListFormat: (v: string) => { },
  orderValidators: (v: string) => { },
  applyValidatorOrder: (l: any, o: string) => { },
  applyValidatorFilters: (l: any, k: string, f?: any) => { },
  toggleFilterValidators: (v: string, l: any) => { },
  isSyncing: () => false,
  sideMenuOpen: 0,
  listFormat: 'col',
  validators: {},
});

export const useUi = () => React.useContext(UIContext);

export const UIContextWrapper = (props: any) => {

  const { activeAccount } = useConnect();
  const { meta, session }: any = useStaking();
  const { consts }: any = useApi();
  const { maxNominatorRewardedPerValidator } = consts;
  const { metrics }: any = useNetworkMetrics();
  const { getAccount }: any = useBalances();


  const [state, setState]: any = useState({
    sideMenuOpen: 0,
    listFormat: 'col',
    validators: {
      order: 'default',
      filter: [],
    }
  });

  const setSideMenu = (v: number) => {
    setState({ ...state, sideMenuOpen: v });
  }

  const setListFormat = (v: string) => {
    setState({ ...state, listFormat: v });
  }

  const setValidatorsOrder = (by: string) => {
    setState({
      ...state, validators: {
        ...state.validators,
        order: by,
      }
    });
  }

  const setValidatorsFilter = (filter: any) => {
    setState({
      ...state,
      validators: {
        ...state.validators,
        filter: filter,
      }
    });
  }

  // Validator list filtering functions

  const toggleFilterValidators = (f: string) => {
    let filter = Object.assign(state.validators.filter);
    let action = state.validators.filter.includes(f) ? 'remove' : 'push';

    if (action === 'remove') {
      let index = filter.indexOf(f);
      filter.splice(index, 1);
    } else {
      filter.push(f);
    }
    setValidatorsFilter(filter);
  }

  const applyValidatorFilters = (list: any, batchKey: string, filter: any = state.validators.filter) => {

    if (filter.includes('all_commission')) {
      list = filterAllCommission(list);
    }
    if (filter.includes('blocked_nominations')) {
      list = filterBlockedNominations(list);
    }
    if (filter.includes('over_subscribed')) {
      list = filterOverSubscribed(list, batchKey);
    }
    if (filter.includes('inactive')) {
      list = filterInactive(list);
    }

    return list;
  }

  const filterOverSubscribed = (list: any, batchKey: string) => {
    if (meta[batchKey] === undefined) {
      return list;
    }
    let filteredList: any = [];
    for (let validator of list) {
      let addressBatchIndex = meta[batchKey].addresses?.indexOf(validator.address) ?? -1;

      // if we cannot derive data, fallback to include validator in filtered list
      if (addressBatchIndex === -1) {
        filteredList.push(validator);
        continue;
      }
      let stake = meta[batchKey]?.stake ?? false;
      if (!stake) {
        filteredList.push(validator);
        continue;
      }
      let totalNominations = stake[addressBatchIndex].total_nominations ?? 0;
      if (totalNominations < maxNominatorRewardedPerValidator) {
        filteredList.push(validator);
        continue;
      }
    }

    return filteredList;
  }

  const filterAllCommission = (list: any) => {
    list = list.filter((validator: any) => validator?.prefs?.commission !== 100);
    return list;
  }

  const filterBlockedNominations = (list: any) => {
    list = list.filter((validator: any) => validator?.prefs?.blocked !== true);
    return list;
  }

  const filterInactive = (list: any) => {
    // if list has not yet been populated, return original list
    if (session.list.length === 0) {
      return list;
    }
    list = list.filter((validator: any) => session.list.includes(validator.address));
    return list;
  }

  // Validator list ordering functions

  const orderValidators = (by: string) => {
    let action = state.validators.order === by
      ? 'revert'
      : 'apply';

    let order = action === 'revert'
      ? 'default'
      : by;

    setValidatorsOrder(order);
  }

  const applyValidatorOrder = (list: any, order: string) => {
    if (order === 'commission') {
      return orderLowestCommission(list);
    }
    return list;
  }

  const orderLowestCommission = (list: any) => {
    let orderedList = [...list].sort((a: any, b: any) => (a.prefs.commission - b.prefs.commission));
    return orderedList;
  }

  /*
   * Helper function to determine whether the dashboard is still
   * fetching remote data.
   */
  const isSyncing = () => {

    // check era has synced from Network
    if (metrics.activeEra.index === 0) {
      return true;
    }
    // check account has synced from Balances
    if (getAccount(activeAccount) === null) {
      return true;
    }
    return false;
  }

  return (
    <UIContext.Provider value={{
      setSideMenu: setSideMenu,
      setListFormat: setListFormat,
      orderValidators: orderValidators,
      applyValidatorOrder: applyValidatorOrder,
      applyValidatorFilters: applyValidatorFilters,
      toggleFilterValidators: toggleFilterValidators,
      isSyncing: isSyncing,
      sideMenuOpen: state.sideMenuOpen,
      listFormat: state.listFormat,
      validators: state.validators,
    }}>
      {props.children}
    </UIContext.Provider>
  );
}