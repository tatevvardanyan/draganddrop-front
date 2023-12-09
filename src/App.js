import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cardList, setCardList] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8080/api")
      .then((response) => {
        setCardList(response.data)
      })
  }, [])

  const [currentCard, setCurrenCard] = useState(null)
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
    setCardList(cardList.map(e => {
      if (e.id === card.id) {
        return { ...e, order: currentCard.order }
      }
      if (e.id === currentCard.id) {
        return { ...e, order: card.order }
      }
      return e
    }))
    e.target.style.background = 'white'

  }
  const sort = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className={'big'}>
      <h1>Drag And Drop</h1>
      <p>first project</p>
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
