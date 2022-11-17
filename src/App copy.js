
import {useState} from "react"
import { useForm } from 'react-hook-form';




function App() {


  /* useFormからformState: {errors} をimport */
  const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm();
const onSubmit0 = (data1) => console.log('onSubmit1:', data1);
//const onSubmit1 = (data2) => console.log(data2.lastName1);

const onSubmit1 = (todo) => {

    //Todo空箱新規作成
    setTodos([...todos, { id: todoId, title: todo.firstName1 , completed: false, status: todoStatus, shousai: todo.lastName1 }])
   
    //IDをインクリメントして増やす。ただし重複の可能性があり、簡易版とする。UUIDを利用したほうがよいかも。
    setTodoId(todoId + 1)


};


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


//チェックボックス操作　チェック後完了としたいがうまくいかない⇒別変数_todoでもたせると動いた。
const ToggleTodo = (todo) => {
  const newArray = todos.map(_todo => {
    return todo.id === _todo.id ? { ..._todo, status: "完了"} : _todo
  });
  setTodos(newArray);
};





//html出力
  return (

    <div>


        <form onSubmit={handleSubmit(onSubmit1)}>
            <label>First Name</label><br/>
            {/* register関数の第2引数にバリデーションのルールを追加 */}
            <input {...register("firstName1", { maxLength: 5 })} /><br/>
            {/* errorsと登録したname属性を使用して、エラーメッセージを記述 */}
            {errors.firstName1 && <p>5文字以内で入力してください</p>}
            <label>Last Name</label><br/>
            <input {...register("lastName1", { maxLength: 5 })} />
            {errors.lastName1 && <p>5文字以内で入力してください</p>}
            <label>Email</label><br/>
            <input {...register("email", { required: true })} /><br/>
            {errors.email && <p>メールアドレスは必須です</p>}
            <input type="submit" value="submit" />
		  </form>


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
            {...register("aaa", { maxLength: 5 })} 
          />
         {errors.aaa && <p>5文字以内で入力してください</p>}
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
