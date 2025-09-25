import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { filenames, writeJSONToFile } from '@/lib/db/db-utils';

export const resetDb = async () => {
  const safeToReset = process.env.NODE_ENV === 'test';
  if (!safeToReset) {
    // eslint-disable-next-line no-console
    console.log('WARNING: Not in test environment, refusing to reset db');
    return;
  }
  const { fakeShows, fakeUsers, fakeBands, fakeReservations } =
    await readFakeData();

  await Promise.all([
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.reservations, fakeReservations),
  ]);
};
