import { render, screen } from '@testing-library/react';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import BandComponent from '@/pages/bands/[bandId]';

test('band component displays correct band information', async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole('heading', {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

test('band component displays error message when error occurs', () => {
  render(<BandComponent band={null} error="Failed to load band data" />);

  const errorMessage = screen.getByText(/Failed to load band data/i);
  expect(errorMessage).toBeInTheDocument();
});
