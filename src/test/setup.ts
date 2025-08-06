// Test setup for reactive-query/react
import { vi } from 'vitest';

// Mock React hooks for testing
vi.mock('react', () => ({
  useCallback: vi.fn((fn) => fn),
  useEffect: vi.fn((fn) => fn()),
  useRef: vi.fn(() => ({ current: undefined })),
  useState: vi.fn((initial) => [initial, vi.fn()]),
}));

// Mock rxjs
vi.mock('rxjs', () => ({
  Observable: class MockObservable {
    subscribe() {
      return {
        unsubscribe: vi.fn(),
      };
    }
  },
  Subscription: class MockSubscription {
    unsubscribe = vi.fn();
  },
}));

// Mock reactive-query
vi.mock('reactive-query', () => ({
  getInitQueryResponse: vi.fn((data) => ({
    data,
    loading: false,
    error: undefined,
    success: false,
  })),
  QueryResponse: {},
})); 