import {useState} from 'react'

const TodoList = () => {

    const [Todos, setTodos] = useState ([]);


    const [Textbody, setTextbody] = useState('');
    const [InputValue, setInputValue] = useState ('');
    const [Author, setAuthor] = useState ('');

    const [EditMode, setEditMode] = useState(null);

    const handleInput = (e)=>{
        setInputValue(e.target.value)
    }

    const handleTextbody = (e)=>{
         setTextbody(e.target.value)
    }

    const handleAuthor = (e)=>{
        setAuthor(e.target.value)
    }

    const HandleAdd = ()=>{
        if (InputValue.trim() === '' || Textbody.trim() ==='' || Author.trim() ==='') {
            alert('pls fill in the input field')

        }else{
            const newTodo = {
                id: Date.now(),
                text: InputValue,
                body: Textbody,
                author:Author,
                date: new Date()
            };

            setTodos([...Todos, newTodo]);
            setInputValue('');
            setTextbody('');
            setAuthor('');

        };
    };

    const handleDeleteTodo = (id)=>{
        const updatedTodos = Todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }
    const EditBtn = (id)=>{
        setEditMode(id);
        const todoToEdit = Todos.find ((todo) =>todo.id === id);
        setInputValue(todoToEdit.text);
        setTextbody(todoToEdit.body);
        setAuthor(todoToEdit.author)
    }

    const handleUpdateTodo = () => {
        if (InputValue.trim() === '' || Textbody.trim() ==='' || Author.trim() ===''){
            alert('pls, fill the input field')
        }else{
            const updatedTodos = Todos.map((todo) => {
                if (todo.id === EditMode){
                return {
                    ...todo,
                    text: InputValue,
                    body: Textbody,
                    author:Author,
                    
                };
              }
              return todo;
            });
            setTodos(updatedTodos);
            setInputValue('');
            setTextbody('');
            setAuthor('');
            setEditMode(null);
        }
    };






  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a todo..."
          value={InputValue}
          onChange= {handleInput}
         />
         { EditMode ? (<button onClick={handleUpdateTodo}>Update</button>):(<button onClick={HandleAdd}>Add</button>)}


      </div>

      <textarea cols={42} rows={10} placeholder='Enter your text content' value={Textbody} onChange={handleTextbody} />

      <textarea cols={42} rows={10} placeholder='Enter your text content' value={Author} onChange={handleAuthor} />


      <div className="todo-list">
            {Todos.map((todo) =>(
                <span key ={todo.id}>
                  <ul>
                    <li>TITLE:{todo.text}</li>
                    <li>Body:{todo.body}</li>
                    <li>Author:{todo.author}</li>

    
                    <div>
                    <button className="span" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    <button className="span" onClick={() => EditBtn(todo.id)}>Edit</button>
                    </div>


                  </ul>
                    
                
                    


                </span>
            ))}

         </div>


    </div>
  )
}

export default TodoList
