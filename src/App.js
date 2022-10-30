
import ObjTodoList from './todolist.js';
import {useState} from "react"

function App() {
  const [todos,setTodos]=useState(["aa","bb"]);

  return (

    <div>
<ObjTodoList todos={todos}/>
<input type="tezt"/>
<button>タスクを追加</button>
<button>削除</button>
    </div>
  );
}

export default App;
{}