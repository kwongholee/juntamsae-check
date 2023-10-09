import style from '../css/Loginbar.module.css';

export default function Loginbar() {
    return(
        <div>
            <form action="/login" method="post">
                <label>ID</label>
                <input name="id" type="text"/>
                <label>PW</label>
                <input name="pw" type="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}