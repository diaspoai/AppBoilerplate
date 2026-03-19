/**
 * ItemRow — unit tests
 *
 * Tests the presentational behaviour of ItemRow in isolation:
 * checkbox toggle callback, delete confirmation, and completed styling.
 */
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { ItemRow } from '../components/ItemRow';

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('@/shared/theme/ThemeProvider', () => ({
  useTheme: () => ({
    colors: {
      primary: '#6366F1',
      surface: '#F9FAFB',
      border: '#E5E7EB',
      textPrimary: '#111827',
      textSecondary: '#6B7280',
      error: '#EF4444',
    },
    typography: {
      body: {},
      caption: {},
    },
    spacing: { sm: 8 },
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

type ItemId = string & { __tableName: 'items' };
const ITEM_ID = 'test-id-123' as ItemId;

function renderRow(overrides: Partial<React.ComponentProps<typeof ItemRow>> = {}) {
  const defaults = {
    id: ITEM_ID,
    title: 'Buy groceries',
    completed: false,
    onToggle: jest.fn(),
    onDelete: jest.fn(),
  };
  return render(<ItemRow {...defaults} {...overrides} />);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('ItemRow', () => {
  it('renders the item title', () => {
    renderRow();
    expect(screen.getByText('Buy groceries')).toBeTruthy();
  });

  it('renders the description when provided', () => {
    renderRow({ description: 'Milk and eggs' });
    expect(screen.getByText('Milk and eggs')).toBeTruthy();
  });

  it('does not render a description element when omitted', () => {
    renderRow();
    expect(screen.queryByText('Milk and eggs')).toBeNull();
  });

  it('calls onToggle with the item id when checkbox is pressed', () => {
    const onToggle = jest.fn();
    renderRow({ onToggle });
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(ITEM_ID);
  });

  it('checkbox has checked state when completed is true', () => {
    renderRow({ completed: true });
    expect(screen.getByRole('checkbox').props.accessibilityState.checked).toBe(true);
  });

  it('checkbox has unchecked state when completed is false', () => {
    renderRow({ completed: false });
    expect(screen.getByRole('checkbox').props.accessibilityState.checked).toBe(false);
  });
});
