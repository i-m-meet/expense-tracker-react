import { useState } from "react";


export default function ExpenseForm({setExpenses}) {
    // const [title, setTitle]= useState('')
    // const [category, setCategory] = useState('')
    // const [amount , setAmount] = useState('')
    const [expense, setExpense] = useState({
        title: "",
        category: "",
        amount: "",
    })

    const [errors, setErrors] = useState({})

    const validate = (formData) =>{
        const errorsData = {}
        if(!formData.title){
            errorsData.title = "Title is required"
        }
        if(!formData.category){
            errorsData.category = "Category is required"
        }
        if(!formData.amount){
            errorsData.amount = "Amount is required"
        }
        setErrors(errorsData)
        return errorsData;
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        const validateResult = validate(expense)

        if(Object.keys(validateResult).length) return
        setExpenses((prevState) => [...prevState, {...expense, id: crypto.randomUUID()}])
       setExpense({
        title: "",
        category: "",
        amount: "",
       })
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setExpense((prevState) => ({
            ...prevState, [name]: value
        }))
        setErrors({})
    }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input id="title" name="title"  value={expense.title} onChange={handleChange}/>
            <p className="error">{errors.title}</p>
          </div>
          <div className="input-container">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={expense.category} onChange={handleChange}>
                  <option value="" hidden>Select Category</option>
                  <option value="grocery">Grocery</option>
                  <option value="clothes">Clothes</option>
                  <option value="bills">Bills</option>
                  <option value="education">Education</option>
                  <option value="medicine">Medicine</option>
                </select>
            <p className="error">{errors.category}</p>                
          </div>
          <div className="input-container">
            <label htmlFor="amount">Amount</label>
            <input id="amount" name="amount" value={expense.amount} onChange={handleChange}/>
            <p className="error">{errors.amount}</p>    
          </div>
          <button className="add-btn">Add</button>
        </form>
  );
}
