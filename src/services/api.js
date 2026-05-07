import axios from 'axios';

const api = axios.create({
  baseURL: "https://brasilapi.com.br/api",
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "Ocorreu um erro inesperado ao conectar com a API.";
    
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = "Recurso não encontrado na base de dados.";
      } else if (error.response.status >= 500) {
        errorMessage = "O serviço da BrasilAPI está indisponível no momento.";
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      errorMessage = "Sem resposta do servidor. Verifique sua conexão com a internet.";
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
