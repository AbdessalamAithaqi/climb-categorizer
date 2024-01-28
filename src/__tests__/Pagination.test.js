import React from 'react';
import { render } from '@testing-library/react-native';
import Pagination from '../components/Pagination.js';

describe('Pagination Component', () => {
    const data = new Array(5).fill(null);
    const scrollX = new Animated.Value(0);

    it('renders the correct number of pagination dots', () => {
        const { getAllByTestId } = render(<Pagination data={data} scrollX={scrollX} />);

        const dots = getAllByTestId('pagination-dot');
        expect(dots.length).toBe(data.length);
    });
});
