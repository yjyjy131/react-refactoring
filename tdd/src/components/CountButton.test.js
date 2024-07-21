import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import CountButton from './CountButton'

const fakeData = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };

global.fetch = jest.fn(()=>{
    Promise.resolve({
        ok: true, 
        json: () => Promise.resolve(fakeData),
    })
});

describe('<CountButton/>', () => {
    it('has an increment button and a decrement button', () => {
        render(<CountButton />)
        const incrementButton = screen.getByTestId('incrementButton');
        const decrementButton = screen.getByTestId('decrementButton');
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
    })

    
    it('calls incrementFn and decrementFn', () => {
        const incrementFn = jest.fn();
        const decrementFn = jest.fn();
        render(
            <CountButton incrementFn={incrementFn} decrementFn={decrementFn}/>
        );

        const incrementButton = screen.getByTestId('incrementButton');
        const decrementButton = screen.getByTestId('decrementButton');

        fireEvent.click(incrementButton);
        fireEvent.click(decrementButton);

        expect(incrementFn).toHaveBeenCalledTimes(1);
        expect(decrementFn).toHaveBeenCalledTimes(1);
    })


    it('calls API mock', async () => {
        render(<CountButton/>);

        const apiButton = screen.getByTestId('apiButton');
        fireEvent.click(apiButton);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch).toHaveBeenCalledWith('https://api.example/data', expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }));
    })
})

