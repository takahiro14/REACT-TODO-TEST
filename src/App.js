
<<<<<<< HEAD
import { useEffect, useState }  from "react"
import { useForm } from 'react-hook-form';

//認証用
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
//認証用






import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "./firebase";





function App() {

  /* firebase ここから */
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postData = collection(db, "posts");
    const q = query(postData, orderBy("timestamp", "desc"));
    getDocs(q).then((snapShot) => {
      console.log(snapShot.docs);
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    /* リアルタイムで取得 */
    onSnapshot(q, (querySnapshot) => {
      // console.log(querySnapshot.docs);
      setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  /* firebase ここまで */


  /* react-hook-form ここから */
  /* useForm使用準備 =>hook-formはこういう設定ということで内容は深く考えない。。*/
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

 /* react-hook-form useFormからデータ受け取り、setTodosへセット */
const onSubmit1 = (todo) => {
    //Todo空箱新規作成
    setTodos([...todos, { id: todoId, title: todo.strTitle1 ,status: todo.strStatus1, shousai: todo.strShousai1 }])
    //IDをインクリメントして増やす。ただし重複の可能性があり、簡易版とする。UUIDを利用したほうがよいかも。
    setTodoId(todoId + 1)
    console.log(todo)
};
  /* react-hook-form ここまで */

  /* useState定義 ここから 　=>これを設定する意味とuseStateがどういう形式でデータをもっているかがいまいち理解できていない。。。あとでググろう。*/
  const [todos, setTodos] = useState([])
  const [todoId, setTodoId] = useState(todos.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newShousai, setNewShousai] = useState('')
  /* useState定義 ここまで */

  /* 編集用ハンドラー　=>なんだか効率悪いね。。。 */
=======
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
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
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
<<<<<<< HEAD
  /* 編集用ハンドラー ここまで*/


  /* 削除用用ハンドラー */
=======


  //削除 これはうまくいく
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo.id !== targetTodo.id))
  }

<<<<<<< HEAD
  /* 編集メニュOPENハンドラー */
  const handleOpenEditForm = (todo) => {
    setIsEditable(true)

    /* todoパラメータを各オブジェクトにセットする。=>ん～効率悪いね。。*/
=======
  //編集フォームを有効化、パラメータをセットする
  const handleOpenEditForm = (todo) => {
    setIsEditable(true)
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
    setEditId(todo.id)
    setNewTitle(todo.title)
    setNewStatus(todo.status)
    setNewShousai(todo.shousai)
  }

<<<<<<< HEAD
  /* 編集用ハンドラー */
  const handleEditTodo = () => {

    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, id: editId, title: newTitle , status: newStatus, shousai: newShousai } : todo
=======

  //編集する
  const handleEditTodo = () => {
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle , status: newStatus, shousai: newShousai } : todo
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
    )
    setTodos(newArray)
    setEditId('')
    setNewTitle('')
    setNewStatus('')
    setNewShousai('')

<<<<<<< HEAD
=======

>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
    //編集後にフォームを閉じる
    handleCloseEditForm('')
    //
  }


<<<<<<< HEAD
  /* チェック後完了ステータス変更用ハンドラー =>アロー関数のmap処理の使い方は後でググろう。*/
const ToggleTodo = (todo) => {
  const newArray = todos.map(_todo => {
    return todo.id === _todo.id ? { ..._todo, status: "完了"} : _todo
  });
  setTodos(newArray);
};

=======
//チェックボックス操作　チェック後完了としたいがうまくいかない
const ToggleTodo = (todo) => {
  setEditId(todo.id)
  const newArray = todos.map(() =>
  todo.id === editId ? { ...todo, status: '完了' } : todo
)
setTodos(newArray)

}
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145

//html出力
  return (

    <div>
      <div>
<<<<<<< HEAD
        <label>認証用表示：ここから</label>
        <BrowserRouter>
          <Routes>
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/`} element={<Mypage />} />
          </Routes>
        </BrowserRouter>
        <p></p>
        <label>認証用表示：ここまで</label>
        <p></p>
=======
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145

         {/* 編集ボタンを押すと表示*/}
         {isEditable ? (
        <div>
<<<<<<< HEAD

         {/* 旧フォーム　ここから*/}
=======
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
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
<<<<<<< HEAD
          <option >↓ステータス選択</option>
=======
          <option selected>↓ステータス選択</option>
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
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
<<<<<<< HEAD
         {/* 旧フォーム　ここまで*/}
        </div>
      ) :   (
        <div>

 
<label>firebase/firestore表示：ここから</label>
{posts.map((post) => (
          <div key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>

          </div>
        ))}
        {/* <div>fsa</div>
        <div>fds</div>
        <div>fdfd</div> */}
<label>firebase/firestore表示：ここまで</label>
<p></p>
<label>Local表示：ここから</label>


          {/* 新規登録*/}
          <form onSubmit={handleSubmit(onSubmit1)}>
          <label>タイトル：</label>
            {/* register関数の第2引数にバリデーションのルールを追加 */}
            <input {...register("strTitle1", { required: true })} /><br/>
            {errors.strTitle1 && <p>必須です。タイトルを入力してください。</p>}
            <label>ステータス：</label>
            <select {...register("strStatus1", { required: true })} >
            <option value=''>↓ステータス選択</option>
              <option value='未着手'>未着手</option>
              <option value='作業中'>作業中</option>
              <option value='完了'>完了</option>
            </select>
            {errors.strStatus1 && <p>必須です。ステータスを選択してください。</p>}<br/>
            <label>詳細：</label>
            <textarea {...register("strShousai1", { maxLength: 10 })} />
            {errors.strShousai1 && <p>10文字以内で入力してください。</p>}
            <br/>
            <input type="submit" value="submit" />
		      </form>
        </div>
      )}
      </div>
      <div>残りの未了タスク:  {todos.filter((todo) => todo.status!=="完了").length}</div>
=======
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
>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label><input type="checkbox"  onClick={() => ToggleTodo(todo)}/> </label>
            <div>ID：{todo.id}</div>
            <div>タイトル：{todo.title}</div>
            <div>ステータス：{todo.status}</div>
            <div>詳細：{todo.shousai}</div>

<<<<<<< HEAD
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
=======

            <button onClick={() => handleOpenEditForm(todo)}>編集</button>

>>>>>>> 7a5962f442eab328bc7e8c3987079c9145502145
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
