const { useState } = React;

function App() {
  const [valor, setValor] = useState(0);
  const [resultado, setResultado] = useState(0);

  const handleInputChange = (e) => {
    const inputValue = parseFloat(e.target.value) || 0;
    setValor(inputValue);
    setResultado(inputValue + inputValue * 0.2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calculadora de 20%</h1>
      <form>
        <label>
          Valor:
          <input
            type="number"
            value={valor}
            onChange={handleInputChange}
            style={{ marginLeft: '10px', padding: '5px', fontSize: '16px' }}
          />
        </label>
      </form>
      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <p>Resultado: {resultado}</p>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
