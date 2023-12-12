import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cardList, setCardList] = useState([])
  const [currentCard, setCurrenCard] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:8080/api")
      .then((response) => {
        setCardList(response.data)
      })
  }, [])

  function dragStartHandler(e, card) {
    console.log("drag", card)
    setCurrenCard(card)
  }
  function dragEndHandler(e) {
    e.target.style.background = 'white'

  }
  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.background = 'gray'
  }
  function dropHandler(e, card) {
    e.preventDefault()
    console.log("drop", card)
    const id1=card.id
    const id2=currentCard.id
    axios.put(`http://localhost:8080/api/drop/${id1}/${id2}`).then((response) => {
      setCardList(response.data)
    })
    e.target.style.background = 'white'

  }
  const sort = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }
 function refresh(e){
  e.preventDefault()
  axios.get(`http://localhost:8080/api/take`).then((response) => {
    setCardList(response.data)
  })
 }
  return (
    <div className={'big'}>
      <h1>Drag And Drop</h1>
      <p>first project</p>
      {/* <button onClick={(e)=>refresh(e)}>Get New</button> */}
      <div className='app'>
        {cardList.sort(sort).map(card =>
          <div className={'card'} key={card.id}
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, card)}
            draggable={true}>
            <img src={card.img} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
