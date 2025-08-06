import { describe, it, expect, vi } from 'vitest';
import { useRXQuery } from '../../useRXQuery';

// Mock the hook since we can't test React hooks directly without React Testing Library
describe('useRXQuery', () => {
  it('should be a function', () => {
    expect(typeof useRXQuery).toBe('function');
  });

  it('should accept query function and configs', () => {
    const mockQuery = vi.fn();
    const configs = { initialState: { test: 'data' } };
    
    // This is a basic test to ensure the hook can be called
    // In a real scenario, you'd use React Testing Library to test the hook
    expect(() => useRXQuery(mockQuery, configs)).not.toThrow();
  });
}); 