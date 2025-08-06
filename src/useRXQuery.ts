import { useCallback, useEffect, useRef, useState } from "react";
import { Observable, Subscription } from "rxjs";
import { getInitQueryResponse, QueryResponse } from "reactive-query";

export type RxQueryOptions<T> = {
  initialState?: T;
  /**
   * On changes of these keys it'll call query call back again
   */
  keysToRecallQuery?: unknown[];
};

/**
 * to convert observable query model data to query data that convert push strategy of rxjs to pull strategy of react
 * @param query Method to get observable or undefnied
 * note: On getting undefined query we return init values with undefined data
 * @param configs
 * @returns react state data
 */
export const useRXQuery = <DATA>(
  query:
    | ((configs?: Partial<RxQueryOptions<DATA>>) => Observable<QueryResponse<DATA>>)
    | undefined,
  configs: RxQueryOptions<DATA> = {},
) => {
  const { initialState, keysToRecallQuery } = configs;
  const [data, setData] = useState(
    getInitQueryResponse<DATA | undefined>(initialState),
  );
  const [isInitValue, setIsInitValue] = useState(true);
  const subscriberRef = useRef<Subscription>();
  const queryHandler = useCallback(
    (
      query: (
        configs?: Partial<RxQueryOptions<DATA>>,
      ) => Observable<QueryResponse<DATA>>,
    ) => {
      if (subscriberRef.current?.unsubscribe)
        subscriberRef.current.unsubscribe();

      const observable$ = query(configs);
      subscriberRef.current = observable$.subscribe((subscribedData) => {
        if (isInitValue) {
          setIsInitValue(false);
        }
        setData(subscribedData);
      });
    },
    [!!query],
  );

  function usnsubscribe() {
    subscriberRef.current?.unsubscribe();
  }

  // Handle query method
  useEffect(() => {
    if (!query) return usnsubscribe;
    queryHandler(query);

    if (isInitValue) return usnsubscribe;

    return usnsubscribe;
  }, [!!query]);

  // Handle recal query
  useEffect(() => {
    if (!keysToRecallQuery || !query) return;
    queryHandler(query);
  }, [JSON.stringify(keysToRecallQuery)]);

  return data;
};
