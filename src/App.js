import React, { useEffect, Fragment, useState } from 'react';
import axios from "axios";
import generateUniqueId from "generate-unique-id";

const App = () => {

  const API_URL = "https://2jx1tn6oh0.execute-api.us-east-1.amazonaws.com/dev/modelviwer-devices-support";
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandSelected, setBrandSelected] = useState("");
  const [inputModel, setInputModel] = useState("");
  const [modelAvailable, setModelAvailable] = useState(false);

  useEffect(() => {

    axios.post(API_URL, {
      option: 2
    })
      .then(function (response) {
        console.log(response);
        setBrands(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);

  const handleSelectBrand = (event) => {
    console.log(event.target.value);
    setBrandSelected(event.target.value);

    axios.post(API_URL, {
      option: 4,
      filter: event.target.value,
    })
      .then(function (response) {
        console.log(response);
        setModels(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSearchForModel = () => {
    console.log(inputModel);
    setBrandSelected(false);

    axios.post(API_URL, {
      option: 5,
      filter: inputModel,
    })
      .then(function (response) {
        console.log(response);
        setModelAvailable(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <label>Escolha uma marca: </label>
      <select onChange={handleSelectBrand} >
        <option>Selecione uma marca</option>
        {brands.map((brand) => {
          return (
            <option key={generateUniqueId()} value={brand}>{brand}</option>
          );
        })}
      </select>
      {brandSelected && (
        <div>
          <label>Marca selecionada: {brandSelected}</label>
          <br />
          <label>Models disponiveis: </label>
          {models.map((model) => {
            return (
              <option key={generateUniqueId()} value={model}>{model}</option>
            );
          })}
        </div>

      )}
      <br />
      <label>Digite seu modelo (Ex: Galaxy S10): </label>
      <br />
      <input onChange={(event) => setInputModel(event.target.value)} type="text" /><br />
      <button onClick={handleSearchForModel} >Buscar por modelo</button>
      <br />
      {inputModel &&
        <div>
          {modelAvailable ?
            <label>Modelo disponivel</label> :
            <label>Modelo não disponivel</label>}
        </div>
      }
    </Fragment>
  );
}

export default App;