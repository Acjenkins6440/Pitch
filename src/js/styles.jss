import React from 'react'
import { render } from 'react-dom'
import injectSheet from 'react-jss'
import Card from '../components/Card.jsx'

const styles = {
  card: {
    border: '1px solid black',
    width: '50px',
    height: '70px',
    position: 'relative'
  },
  number: {
    position: 'absolute',
    bottom: '50%',
    right: '50%'
  },
  hearts: {
    color: "red"
  },
  diamonds: {
    color: "red"
  },
  spades: {
    color: "black"
  },
  clubs: {
    color: "black"
  },
  ulSymbol: {
    fontSize: '30px',
    position: 'absolute',
    top: '0',
    left: '0',
    marginTop: '-8px'
  },
  brSymbol: {
    fontSize: '30px',
    position: 'absolute',
    bottom: '0',
    right: '0'
  }
}

const Card = () => <Card />
