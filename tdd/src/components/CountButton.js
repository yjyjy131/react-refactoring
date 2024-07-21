
const CountButton = ({incrementFn, decrementFn, value}) => {
    const apiFunction = async() => {
        const dataToSend = { key: 'value' };
        try {
            const response = await fetch('https://api.example/data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
              });
            const data = await response.json();
            console.log(data);
            return data;
          } catch (error) {
            console.log('API call failed', error);
          }
    };
    
    return (
        <div>
            <button onClick={incrementFn} data-testid="incrementButton">+</button>
            <button onClick={decrementFn} data-testid="decrementButton">-</button>
            <button onClick={apiFunction} data-testid="apiButton">API</button>
            <h1>value</h1>
        </div>
    )
};

export default CountButton;

