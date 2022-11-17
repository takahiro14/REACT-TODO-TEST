import { useForm } from 'react-hook-form';
import './styles.css';

export default function App() {
		/* useFormから関数をimport */
    const {
        register,
        handleSubmit,
    } = useForm();
		
    const onSubmit = (data) => console.log('onSubmit:', data);
    
    return (
        /* handleSubmitはフォームの入力内容を検証したうえで、引数に渡した関数(onSubmit)を実行 */
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} />
			    <input {...register("lastName")} />
			    <input {...register("email")} />
          <input type="submit" />
        </form>
    );
}