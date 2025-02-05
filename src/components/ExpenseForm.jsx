import { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";

export default function ExpenseForm({ setExpenses }) {
  // const [title, setTitle]= useState('')
  // const [category, setCategory] = useState('')
  // const [amount , setAmount] = useState('')
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [{required: true, message: "Please enter the valid title"}, {minLength: 3, message: "title must have atleast 3 characters"}],
    category: [{required: true, message: "Please enter the valid category"}],
    amount: [{required: true, message: "Please enter the valid amount"}, {type: "number", message: "amount must be a number"}],
  }

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) =>{
        validationConfig[key].some((rule) => {
            if(rule.required && !value){
                errorsData[key] = rule.message
                return true
            }
            if(rule.minLength && value.length < 3){
                errorsData[key]= rule.message
                return true
            }
            if (rule.type === "number" && isNaN(value)){
                errorsData[key]= rule.message
                return true
            }
        })
    })
    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validateResult = validate(expense);

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
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
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
    options= {['Grocery', 'Clothes', 'Bills', 'Education' , 'Medicine']}
    defaultOption='Select a category'
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
      <button className="add-btn">Add</button>
    </form>
  );
}
