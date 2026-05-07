import api from './api';

export const getEstados = async () => {
  const response = await api.get('/ibge/uf/v1');
  return response.data;
};

export const getMunicipios = async (uf) => {
  if (!uf) throw new Error("A sigla do estado (UF) é obrigatória.");
  
  const ufSigla = uf.toUpperCase();
  const response = await api.get(`/ibge/municipios/v1/${ufSigla}`);
  return response.data;
};

export const getCepV2 = async (cep) => {
  const response = await api.get(`/cep/v2/${cep}`);
  return response.data;
};

export const getCepV1 = async (cep) => {
  const response = await api.get(`/cep/v1/${cep}`);
  return response.data;
};

export const getCep = async (cep) => {
  if (!cep) throw new Error("O CEP é obrigatório.");
  
  try {
    return await getCepV2(cep);
  } catch (errorV2) {
    console.warn("Falha ao consultar CEP V2. Tentando V1...", errorV2);
    try {
      return await getCepV1(cep);
    } catch (errorV1) {
      console.warn("Falha ao consultar CEP V1.", errorV1);
      throw errorV1;
    }
  }
};

export const getDdd = async (ddd) => {
  if (!ddd) throw new Error("O DDD é obrigatório.");
  
  const response = await api.get(`/ddd/v1/${ddd}`);
  return response.data;
};

export const getFeriados = async (ano) => {
  if (!ano) throw new Error("O ano é obrigatório.");
  
  const response = await api.get(`/feriados/v1/${ano}`);
  return response.data;
};
