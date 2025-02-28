import { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  // const [title, setTitle]= useState('')
  // const [category, setCategory] = useState('')
  // const [amount , setAmount] = useState('')

  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter the valid title" },
      { minLength: 3, message: "title must have atleast 3 characters" },
    ],
    category: [{ required: true, message: "Please enter the valid category" }],
    amount: [
      { required: true, message: "Please enter the valid amount" },
      { type: "number", message: "amount must be a number" },
      {pattern: /'^[0-9]+(\\.[0-9]{0,2}){0,1}$/, message: "amount must be a number"}
    ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 3) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.type === "number" && isNaN(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validateResult = validate(expense);

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((value) => {
          if (value.id === editingRowId) {
            return {
              ...expense,
              id: editingRowId,
            };
          }
          return value;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return true;
    }

    if (Object.keys(validateResult).length) return;
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
  //logic for error handeling in amount input if characters were entered in input field
    if (name === "amount") {
      if (/^[0-9]*\.?[0-9]*$/.test(value)) {
        setExpense((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setErrors((prevState) => {
          const newErrors = { ...prevState };
          delete newErrors[name]; 
          return newErrors;
        });
      } else {
        setErrors((prevState) => ({
          ...prevState,
          [name]: "Amount must be a number",
        }));
      }
    } 
    //otherwise this normal code will work for error handeling
    else {
      setExpense((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors({});
    }
  };
  

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />

      <SelectInput
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select a category"
        error={errors.category}
      />

      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
