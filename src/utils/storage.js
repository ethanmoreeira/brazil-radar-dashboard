const STORAGE_KEY = 'radarBrasil:lastResult';
const HISTORY_KEY = 'radarBrasil:resultsHistory';

export const saveLastResult = (payload) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Falha ao salvar no localStorage", error);
  }
};

export const getLastResult = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return null;
    return JSON.parse(item);
  } catch (error) {
    console.warn("Falha ao ler do localStorage", error);
    return null;
  }
};

export const clearLastResult = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Falha ao remover do localStorage", error);
  }
};


export const getResultsHistory = () => {
  try {
    const item = localStorage.getItem(HISTORY_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Falha ao ler histórico do localStorage", error);
    return [];
  }
};

export const saveResultToHistory = (payload) => {
  try {
    let history = getResultsHistory();


    history = history.filter(
      item => !(item.moduleName === payload.moduleName && item.queryLabel === payload.queryLabel)
    );

    history.unshift(payload);

    if (history.length > 10) {
      history = history.slice(0, 10);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    saveLastResult(payload);
  } catch (error) {
    console.warn("Falha ao salvar no histórico", error);
  }
};

export const removeResultFromHistory = (id) => {
  try {
    let history = getResultsHistory();
    history = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    if (history.length === 0) {
      clearLastResult();
    } else {
      saveLastResult(history[0]);
    }
  } catch (error) {
    console.warn("Falha ao remover do histórico", error);
  }
};

export const clearResultsHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    clearLastResult();
  } catch (error) {
    console.warn("Falha ao limpar o histórico", error);
  }
};

export const createResultPayload = ({ moduleName, queryLabel, summaryText, data }) => {
  return {
    id: String(Date.now()),
    moduleName,
    queryLabel,
    summaryText,
    data,
    createdAt: new Date().toISOString()
  };
};
