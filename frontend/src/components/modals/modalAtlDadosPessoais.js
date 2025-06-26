import React, { useState, useEffect } from "react";
import "./modalAtlDadosPessoais.scss";

import closeImg from "../../assets/imagens/close.png";

const ModalAtlDadosPessoais = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    cpf: "",
    cellphone: "",
    address: {
    city: "",
    state: "",
    cep: "",
    street: "",
    number: "",
    district: "",
    complement: ""
  }
  });


  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/list/${userId}`); 
      const data = await response.json();
      setFormData({
        username: data.username,
        cpf: data.cpf,
        cellphone: data.cellphone,
        address: {
        city: data.address?.city || "",
        state: data.address?.state || "",
        cep: data.address?.cep || "",
        street: data.address?.street || "",
        number: data.address?.number || "",
        district: data.address?.district || "",
        complement: data.address?.complement || ""
      } 
      }); 
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };


  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name in formData.address) {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value
      }
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`http://localhost:3001/api/users/update/${userId}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        onClose();
      } else {
        alert("Erro ao atualizar os dados. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro de conexão com o servidor.");
    }
  };


  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div className="modal" onClick={(e) => e.target.className === "modal" && onClose()}>
      <div className="modalContainer">
        <div className="headerModal">
          <h1>Atualizar Dados Pessoais</h1>
          <img src={closeImg} alt="Fechar" onClick={onClose} />
        </div>
        <form className="dadosForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nome:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu nome"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cellphone">Celular:</label>
            <input
              type="tel"
              id="cellphone"
              name="cellphone"
              pattern="\(\d{2}\) \d{5}-\d{4}"
              placeholder="(00) 00000-0000"
              value={formData.cellphone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
  <label htmlFor="city">Cidade:</label>
  <input
    type="text"
    id="city"
    name="city"
    placeholder="Ex: Campinas"
    value={formData.address.city}
    onChange={handleChange}
    required
  />
</div>
<div>
  <label htmlFor="state">Estado:</label>
  <input
    type="text"
    id="state"
    name="state"
    placeholder="Ex: São Paulo"
    value={formData.address.state}
    onChange={handleChange}
    required
  />
</div>
<div>
  <label htmlFor="cep">CEP:</label>
  <input
    type="text"
    id="cep"
    name="cep"
    placeholder="80000-000"
    value={formData.address.cep}
    onChange={handleChange}
    required
  />
</div>
<div>
  <label htmlFor="street">Rua:</label>
  <input
    type="text"
    id="street"
    name="street"
    placeholder="Ex: Rua das Flores"
    value={formData.address.street}
    onChange={handleChange}
    required
  />
</div>
<div>
  <label htmlFor="number">Número:</label>
  <input
    type="text"
    id="number"
    name="number"
    placeholder="Ex: 123"
    value={formData.address.number}
    onChange={handleChange}
    required
  />
</div>
<div>
  <label htmlFor="district">Bairro:</label>
  <input
    type="text"
    id="district"
    name="district"
    placeholder="Ex: Centro"
    value={formData.address.district}
    onChange={handleChange}
    required
  />
</div>
<div>
  <label htmlFor="complement">Complemento:</label>
  <input
    type="text"
    id="complement"
    name="complement"
    placeholder="Apto, bloco, etc."
    value={formData.address.complement}
    onChange={handleChange}
  />
</div>

          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalAtlDadosPessoais;
