import { useEffect, useState } from 'react';
import axios from 'axios';

import style from '../css/List.module.css';
import Content from '../components/Content';
import Searchbar from '../components/Searchbar';

export default function List() {
    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/info/list', (r) => {
            setData(r)
        })
    }, [])

    return(
        <div>
            <Searchbar></Searchbar>
            {
                data.forEach((a,i) => {
                    return(
                        <Content data={a}></Content>
                    )
                })
            }
        </div>
    )
}