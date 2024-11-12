import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { mockData } from './utils';

describe('renders learn react link', () => {
  const {asFragment} = render(<App />);

  it('matches snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays fetched data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as jest.Mock;
    render(<App />);
    // Wait for the fake fetch to finish 
    expect(fetch).toHaveBeenCalledWith('http://localhost:3005/BalanceSheet');
    await waitFor(async() => {
      expect(await screen.findByText('28 Feb 2018')).toBeInTheDocument()
    })
    await waitFor(async() => {
      expect(await screen.findByText('Total Bank')).toBeInTheDocument()
    })
  });

});
