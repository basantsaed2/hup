import { useState, useEffect } from 'react';

const getActionsByModule = (moduleName) => {
  const stored = localStorage.getItem("role");
  if (!stored) return [];
  try {
    const position = JSON.parse(stored);
    if (!position?.roles || !Array.isArray(position.roles)) return [];
    return position.roles
      .filter(role => role.module === moduleName)
      .map(role => role.action);
  } catch (e) {
    console.error("Parsing role error", e);
    return [];
  }
};

const useModuleActions = (moduleName) => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    setActions(getActionsByModule(moduleName));
  }, [moduleName]);
  return actions;
};

export default useModuleActions;
