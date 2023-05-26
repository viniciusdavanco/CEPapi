import { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from "./services/api";

function App() {

  const [input, setInput] = useState()
  const [cep, setCep] = useState({})

  const handleSearch = async () => {
    if (input === '') {
      alert('Preencher CEP')
      return;
    }
    try {
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Erro')
      setInput('')
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP:</h1>
      <div className="input">
        <input type="text" placeholder="Digite o CEP" value={input} onChange={e => setInput(e.target.value)} />
        <button className="search" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          {cep.complemento !== '' && (<span>Complemento: {cep.complemento}</span>)}
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade/Estado: {cep.localidade}/{cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
