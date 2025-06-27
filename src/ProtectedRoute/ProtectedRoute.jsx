import React from 'react';
import ErrorPage from '../ErrorPage.jsx';
import useModuleActions from '../Hooks/useModuleActions.jsx';

const ProtectedRoute = ({ moduleName, requiredAction, children }) => {
  const actions = useModuleActions(moduleName);
  return actions.includes(requiredAction) ? children : <ErrorPage />;
};

export default ProtectedRoute;
