import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('converts a cents with decimal value and rouds up', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('converts a cents with decimal value and round down', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });

    it('works with negative numbers', () => {
        expect(formatCurrency(-1000)).toEqual('-10.00');
    });
});

// We use expect() to see if the code works correctly