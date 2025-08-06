# Reactive Query React Adapter

This is a React adapter library for [reactive-query](https://github.com/behnamrhp/reactive-query), providing seamless integration between reactive query models and React components.

## Installation

```bash
npm install reactive-query/react
# or
yarn add reactive-query/react
```

## Peer Dependencies

This library requires the following peer dependencies:
- `react` (^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0)
- `rxjs` (^7.8.0)
- `reactive-query` (^0.2.7)

## Usage

### Basic Usage

```tsx
import React from 'react';
import { useRXQuery } from 'reactive-query/react';
import { yourQueryModel } from './your-query-model';

function MyComponent() {
  const queryData = useRXQuery(yourQueryModel.query);

  if (queryData.loading) {
    return <div>Loading...</div>;
  }

  if (queryData.error) {
    return <div>Error: {queryData.error.message}</div>;
  }

  return <div>Data: {JSON.stringify(queryData.data)}</div>;
}
```

### With Configuration

```tsx
import React from 'react';
import { useRXQuery } from 'reactive-query/react';
import { userQueryModel } from './user-query-model';

function UserProfile({ userId }: { userId: string }) {
  const userData = useRXQuery(
    userQueryModel.getUser,
    {
      initialState: { name: 'Loading...', email: '' },
      keysToRecallQuery: [userId] // Re-query when userId changes
    }
  );

  return (
    <div>
      <h2>{userData.data?.name}</h2>
      <p>{userData.data?.email}</p>
      {userData.loading && <span>Loading...</span>}
    </div>
  );
}
```

## API Reference

### `useRXQuery<T, P = undefined>`

A React hook that converts observable query model data to React state, bridging the push strategy of RxJS to the pull strategy of React.

#### Parameters

- `query`: A function that returns an Observable of QueryResponse<T> or undefined
- `configs`: Optional configuration object

#### Configuration Options

- `initialState`: Initial data state before the query loads
- `keysToRecallQuery`: Array of values that trigger re-querying when changed

#### Returns

Returns a QueryResponse<T> object with the following properties:
- `data`: The query result data
- `loading`: Boolean indicating if the query is in progress
- `error`: Error object if the query failed
- `success`: Boolean indicating if the query completed successfully

## How It Works

The `useRXQuery` hook:

1. **Subscribes** to the observable returned by your query function
2. **Manages** React state for loading, error, and data states
3. **Automatically** unsubscribes when the component unmounts
4. **Re-queries** when specified keys change
5. **Handles** the conversion from RxJS observables to React state

## Examples

### Conditional Queries

```tsx
function ConditionalQuery({ shouldFetch, id }: { shouldFetch: boolean; id: string }) {
  const data = useRXQuery(
    shouldFetch ? () => queryModel.getData(id) : undefined
  );
  
  // When shouldFetch is false, returns initial state
  return <div>{data.data ? 'Has data' : 'No data'}</div>;
}
```

### Dynamic Queries

```tsx
function DynamicQuery({ filters }: { filters: Record<string, any> }) {
  const data = useRXQuery(
    queryModel.getFilteredData,
    {
      keysToRecallQuery: [JSON.stringify(filters)] // Re-query when filters change
    }
  );
  
  return <div>{/* render data */}</div>;
}
```

## Contributing

This library is part of the [reactive-query](https://github.com/behnamrhp/reactive-query) project. Please refer to the main repository for contribution guidelines.

## License

MIT License - see the main [reactive-query](https://github.com/behnamrhp/reactive-query) repository for details. 