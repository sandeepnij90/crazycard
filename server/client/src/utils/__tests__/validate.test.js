import { isValidDate } from '../validateDate';

describe('validateDate', () => {
    it('it should return false if wrong date passed', () => {
        const result = isValidDate('ee','ee','eeee');
        expect(result).toEqual(false);
    });

    it('it should return true if correct date passed', () => {
        const result = isValidDate('12', '12', '1990');
        expect(result).toEqual(true);
    });

    it('it should return false if date is in the future', () => {
        const result = isValidDate('12', '12', '3000');
        expect(result).toEqual(false);
    });
})