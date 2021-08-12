import { CustomDatePipe } from './custom-date.pipe';
describe('CustomDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should parse date and time on parseDate', () => {
    const pipe = new CustomDatePipe();
    const testDatetime = '24-11-1996 06:00:00';
    const expectedDate = new Date(1996, 11, 24, 6, 0, 0);
    const actualDate = pipe.parseDate(testDatetime);
    expect(actualDate).toEqual(expectedDate);
  });

  it('should parse date on parseDate', () => {
    const pipe = new CustomDatePipe();
    const testDate = '24-11-1996';
    const expectedDate = new Date(1996, 11, 24);
    const actualDate = pipe.parseDate(testDate);
    expect(actualDate).toEqual(expectedDate);
});
});
