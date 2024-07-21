import {render, screen} from '@testing-library/react';
import CountView from './CountView';

describe('CountView', () => {
    it('shows the current count state.', () => {
        let sampleCount  = 0;
        render(<CountView countVal={sampleCount } />);
        const initialState = screen.getByText('num 0');
        expect(initialState).toBeInTheDocument();
    })
})
