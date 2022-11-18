
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
  /* 編集用ハンドラー ここまで*/


  /* 削除用用ハンドラー */
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo.id !== targetTodo.id))
  }

  /* 編集メニュOPENハンドラー */
  const handleOpenEditForm = (todo) => {
    setIsEditable(true)

    /* todoパラメータを各オブジェクトにセットする。=>ん～効率悪いね。。*/
    setEditId(todo.id)
    setNewTitle(todo.title)
    setNewStatus(todo.status)
    setNewShousai(todo.shousai)
  }

  /* 編集用ハンドラー */
  const handleEditTodo = () => {

    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, id: editId, title: newTitle , status: newStatus, shousai: newShousai } : todo
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


  /* チェック後完了ステータス変更用ハンドラー =>アロー関数のmap処理の使い方は後でググろう。*/
const ToggleTodo = (todo) => {
  const newArray = todos.map(_todo => {
    return todo.id === _todo.id ? { ..._todo, status: "完了"} : _todo
  });
  setTodos(newArray);
};


//html出力
  return (

    <div>
      <div>
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

         {/* 編集ボタンを押すと表示*/}
         {isEditable ? (
        <div>

         {/* 旧フォーム　ここから*/}
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
          <option >↓ステータス選択</option>
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
