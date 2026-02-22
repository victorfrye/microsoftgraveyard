import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { render, screen } from '@testing-library/react';

import ConsentProvider from './consent-provider';

const mockHandleGAConsentChange = jest.fn();
const mockHandleClarityConsentChange = jest.fn();
const mockHandleValueChange = jest.fn();

jest.mock('@/analytics', () => ({
  useGA: jest.fn(() => ({
    handleConsentChange: mockHandleGAConsentChange,
  })),
  useClarity: jest.fn(() => ({
    handleConsentChange: mockHandleClarityConsentChange,
  })),
}));

jest.mock('@/storage', () => ({
  readValue: jest.fn(() => null),
  useLocalStorage: jest.fn(() => ({
    value: null,
    handleValueChange: mockHandleValueChange,
  })),
}));

describe('ConsentProvider', () => {
  it('renders children', () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <ConsentProvider>
          <div data-testid="test-child">Test Content</div>
        </ConsentProvider>
      </FluentProvider>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
