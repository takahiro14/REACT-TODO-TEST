
import {useState} from "react"

function App() {

  const [todos, setTodos] = useState([])
  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoId] = useState(todos.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [todoStatus, setTodoStatus] = useState('')
  const [todoShousai, setTodoShousai] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newShousai, setNewShousai] = useState('')



  //タイトル入力時にステートメントへ保存
  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value)
  }
  //ステータス選択時にステートメントへ保存
  const handleAddFormChanges2 = (f) => {
    setTodoStatus(f.target.value)
  }
  //タイトル入力時にステートメントへ保存
  const handleAddFormChanges3 = (g) => {
    setTodoShousai(g.target.value)
  }

  //ここからTUDO追加処理開始
  const handleAddTodo = () => {
    //タスクを追加する

    //タイトル空であればなにもしない
    if(todoTitle === "") return; 

    //Todo空箱新規作成
    setTodos([...todos, { id: todoId, title: todoTitle , completed: false, status: todoStatus, shousai: todoShousai }])
   
    //IDをインクリメントして増やす。ただし重複の可能性があり、簡易版とする。UUIDを利用したほうがよいかも。
    setTodoId(todoId + 1)

    //ステートメント記録
    setTodoTitle('')
    setTodoStatus('')
    setTodoShousai('')

  }
  //追加処理終わり

   //追加編集機能
  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId('')
  }
  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value)
  }
  const handleEditFormChange2 = (f) => {
    setNewStatus(f.target.value)
  }
  const handleEditFormChange3 = (g) => {
    setNewShousai(g.target.value)
  }


  //削除 これはうまくいく
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo.id !== targetTodo.id))
  }

  //編集フォームを有効化、パラメータをセットする
  const handleOpenEditForm = (todo) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
    setNewStatus(todo.status)
    setNewShousai(todo.shousai)
  }


  //編集する
  const handleEditTodo = () => {
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle , status: newStatus, shousai: newShousai } : todo
    )
    setTodos(newArray)
    setEditId('')
    setNewTitle('')
    setNewStatus('')
    setNewShousai('')


    //編集後にフォームを閉じる
    handleCloseEditForm('')
    //
  }


//チェックボックス操作　チェック後完了としたいがうまくいかない
const ToggleTodo = (todo) => {
  setEditId(todo.id)
  const newArray = todos.map(() =>
  todo.id === editId ? { ...todo, status: '完了' } : todo
)
setTodos(newArray)

}

//html出力
  return (

    <div>
      <div>

         {/* 編集ボタンを押すと表示*/}
         {isEditable ? (
        <div>
          <br/>
          タイトル：
          <input
            type="text"
            label="新しいタイトル"
            value={newTitle}
            onChange={handleEditFormChange}
          />
          <br/>
          ステータス：
          <select value={newStatus} onChange={handleEditFormChange2}>
          <option selected>↓ステータス選択</option>
            <option value='未着手'>未着手</option>
            <option value='作業中'>作業中</option>
            <option value='完了'>完了</option>
          </select>
          <br/>
          詳細：
          <textarea  type="text" value={newShousai} onChange={handleEditFormChange3}></textarea >
          <br/>
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) :   (
        <div>
          <br/>
          タイトル：
          <input
            type="text"
            label="タイトル"
            value={todoTitle}
            onChange={handleAddFormChanges}
          />
          <br/>
          ステータス：
          <select value={todoStatus} onChange={handleAddFormChanges2}>
          <option selected>↓ステータス選択</option>
            <option value='未着手'>未着手</option>
            <option value='作業中'>作業中</option>
            <option value='完了'>完了</option>
          </select>
          <br/>
          詳細：
          <textarea  type="text" value={todoShousai} onChange={handleAddFormChanges3}></textarea >
          <br/>
          <button onClick={handleAddTodo}>作成</button>
        </div>
      )}
      </div>
      <div>残りのタスク:  {todos.filter((todo) => !todo.complated).length}</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label><input type="checkbox"  onClick={() => ToggleTodo(todo)}/> </label>
            <div>ID：{todo.id}</div>
            <div>タイトル：{todo.title}</div>
            <div>ステータス：{todo.status}</div>
            <div>詳細：{todo.shousai}</div>


            <button onClick={() => handleOpenEditForm(todo)}>編集</button>

            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
