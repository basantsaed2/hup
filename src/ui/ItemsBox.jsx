import React from 'react';

const ItemsBox = ({
  modules,
  actions,
  selectedRoles,
  setSelectedRoles,
}) => {
  const toggleAction = (module, action) => {
    setSelectedRoles((prev) => {
      const currentActions = prev[module] || [];
      let updatedActions;
      if (currentActions.includes(action)) {
        updatedActions = currentActions.filter((a) => a !== action);
      } else {
        updatedActions = [...currentActions, action];
      }
      return {
        ...prev,
        [module]: updatedActions,
      };
    });
  };

  const toggleSelectAllActions = (module) => {
    setSelectedRoles((prev) => {
      const currentActions = prev[module] || [];
      const allSelected = actions.every((a) => currentActions.includes(a));
      return {
        ...prev,
        [module]: allSelected ? [] : [...actions],
      };
    });
  };

  const isAllSelected = (module) => {
    const currentActions = selectedRoles[module] || [];
    return actions.length > 0 && actions.every((a) => currentActions.includes(a));
  };

  return (
    <div className="flex flex-wrap gap-6">
      {modules.map((module) => (
        <div
          key={module}
          className={`w-72 p-6 rounded-xl shadow-md bg-white space-y-4 select-none`}
        >
     <div className="flex items-center justify-between">
  <span className="text-lg font-semibold text-gray-800 truncate max-w-[60%] overflow-hidden whitespace-nowrap">
    {module}
  </span>
  <label className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isAllSelected(module)}
      onChange={() => toggleSelectAllActions(module)}
      className="mr-2 cursor-pointer"
    />
    <span className="text-sm text-green-600 font-medium">Select All</span>
  </label>
</div>


          <div className="space-y-2 max-h-40 overflow-y-auto">
            {actions.map((action) => (
              <label
                key={action}
                className="flex items-center cursor-pointer text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedRoles[module]?.includes(action) || false}
                  onChange={() => toggleAction(module, action)}
                  className="mr-2 cursor-pointer"
                />
                <span>{action}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsBox;
