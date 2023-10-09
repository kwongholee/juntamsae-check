import style from '../css/Searchbar.module.css';

export default function Searchbar() {
    return(
        <div>
            <form action="/search" method="POST">
                <input type="text" />
                <button type="submit">search</button>
            </form>
        </div>
    )
}