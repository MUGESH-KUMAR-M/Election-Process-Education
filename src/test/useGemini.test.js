import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useGemini } from '../hooks/useGemini';

// Mock the GoogleGenerativeAI class
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      startChat: vi.fn().mockReturnValue({
        sendMessage: vi.fn().mockResolvedValue({
          response: { text: () => "Mocked Response" }
        })
      })
    })
  })),
  HarmCategory: { HARM_CATEGORY_HARASSMENT: '1' },
  HarmBlockThreshold: { BLOCK_MEDIUM_AND_ABOVE: '1' }
}));

describe('useGemini Hook', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useGemini('fake-key'));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error when no API key is provided', async () => {
    const { result } = renderHook(() => useGemini(''));
    await act(async () => {
      await result.current.sendMessage('test');
    });
    expect(result.current.error).toBeTruthy();
  });
});
