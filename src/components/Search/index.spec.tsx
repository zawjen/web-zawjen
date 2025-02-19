import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Search from './index';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        search_text: 'Hadith',
        search_filters: ['Language: English', 'Classification: Green'],
        match_count: 100,
        total_pages: 10,
        current_page: 1,
        datasets: []
      })
  })
) as jest.Mock;

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render and allow text input, clear input, and trigger search', async () => {
    render(<Search />);
    const input = screen.getByTestId('search-input');
    const clearButtonName = /clear/i;
    // Type a query
    fireEvent.change(input, { target: { value: 'Hadith' } });
    expect(input).toHaveValue('Hadith');

    // Clear the text
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(input).toHaveValue('');

    // Set value again and trigger search
    fireEvent.change(input, { target: { value: 'Hadith' } });
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://zawjen.app.net/search-service',
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });
});