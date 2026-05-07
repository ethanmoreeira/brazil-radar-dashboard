import { useState, useEffect } from 'react';
import { getResultsHistory, clearResultsHistory, removeResultFromHistory } from '../utils/storage';

const useLastResult = () => {
  const [resultsHistory, setResultsHistory] = useState([]);

  const refreshResultsHistory = () => {
    const history = getResultsHistory();
    setResultsHistory(history);
  };

  const clearSavedResults = () => {
    clearResultsHistory();
    setResultsHistory([]);
  };

  const removeSavedResult = (id) => {
    removeResultFromHistory(id);
    refreshResultsHistory();
  };

  useEffect(() => {

    refreshResultsHistory();
  }, []);

  const lastResult = resultsHistory.length > 0 ? resultsHistory[0] : null;

  return {
    resultsHistory,
    lastResult,
    refreshResultsHistory,
    clearSavedResults,
    removeSavedResult
  };
};

export default useLastResult;
