import { useState } from 'react';
import './styles/css/App.css';

function App() {
  let [글제목, 글제목변경] = useState(['서울 맛집 목록', '요즘 유행하는 패션', '건강 관리 비결']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [글추가, 글추가변경] = useState('');

  return (
    <div className='App'>
      <div className='black-nav'>
        <img className='logo' src='./assets/logo/Daks.png'></img>
      </div>
      {
        글제목.map(function (a, i) {
          return <div className='list' key={i}>
            <h3 onClick={() => {
              modal !== true ? setModal(true) : setModal(false);
              setTitle(i);
            }}>{글제목[i]}</h3>
            <span>
              2023년 09월 06일
              <span className='goodBtn' onClick={() => {
                let 좋아요사본 = [...좋아요];
                좋아요사본[i] = 좋아요사본[i] + 1;
                좋아요변경(좋아요사본);
              }}>
                👍{좋아요[i]}
              </span>
              <div>
                <button className='Btn' onClick={() => {
                  let 삭제할제목 = [...글제목];
                  삭제할제목.splice(i, 1);
                  글제목변경(삭제할제목);
                }}>글 삭제</button>
              </div>
            </span>
          </div>
        })
      }
      <div>
        <p className='TLmargin'>글 제목 추가</p>
        <input className='TLmargin titleAdd' placeholder='글 제목 입력' onChange={(e) => {
          글추가변경(e.target.value);
        }} />&nbsp;
        <button className='Btn' onClick={() => {
          let 추가할제목 = [...글제목];
          추가할제목.push(글추가);
          글제목변경(추가할제목);
        }}>전송</button>
      </div>
      {
        modal === true ? <Modal title={title} 글제목={글제목}></Modal> : null
      }
    </div>
  );
}

function Modal(props) {
  return <div className="modal">
    <h4>{props.글제목[props.title]}</h4>
    <p>날짜</p>
    <p>상세내용</p>
  </div>
}

export default App;
