import style from '../css/Content.module.css';

export default function Content(props) {
    return(
        <div>
            <h3>이름: {props.result[0]}</h3>
            <h4>학번: {props.result[1]}</h4>
            <h4>학과: {props.result[2]}</h4>
            <h4>결석 횟수: {props.result[3]}</h4>
        </div>
    )
}