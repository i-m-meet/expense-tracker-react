export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  rowId,
  setExpense,
  expenses,
  setEditingRowId,
}) {
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={{...menuPosition}}>
      <div
        onClick={() => {
          const editItem = expenses.find((expense) => expense.id === rowId )
          setExpense(
            {
            title: editItem.title,
            category: editItem.category,
            amount: editItem.amount,
          }
        )
          setMenuPosition({});
          setEditingRowId(rowId)
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id != rowId)
          );
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
