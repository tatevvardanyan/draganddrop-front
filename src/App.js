import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

//primary scheme
function App() {
  const [cardList, setCardList] = useState([
    { id: 100, order: 3, text: "card 3" },
    { id: 101, order: 1, text: "card 1" },
    { id: 102, order: 2, text: "card 2" },
    { id: 103, order: 4, text: "card 4" },
  ])
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
    e.target.style.background = 'lightgray'
  }
  function dropHandler(e, card) {
    e.preventDefault()
    // console.log("drop",card)
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
    <div>
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
            {card.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
