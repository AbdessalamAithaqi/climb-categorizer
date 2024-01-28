import React from 'react';
import { render } from '@testing-library/react-native';
import Slider from '../components/Slider.js';
import Slides from '../data/Slides.js';

describe('Slider Component', () => {
    it('renders the Slider with FlatList and Pagination components', () => {
        const { getByTestId } = render(<Slider />);

        // Check if FlatList is rendered
        const flatList = getByTestId('flatlist');
        expect(flatList).toBeTruthy();

        // Check if Pagination is rendered
        const pagination = getByTestId('pagination');
        expect(pagination).toBeTruthy();

        // Check if FlatList data is correct
        expect(flatList.props.data).toEqual(Slides);
    });
});
