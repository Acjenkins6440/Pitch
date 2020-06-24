export default {
  card: {
    border: '1px solid black',
    width: '16%',
    height: '90%',
    margin: '0 auto',
    position: 'relative',
    perspective: '1000px',
    '&:hover': {
      'z-index': 6,
      border: '2px solid black'
    },
    'z-index': props => props.cardIndex,
    overflow: 'show',
    float: 'left',
    'background-color': 'rgba(135, 206, 250, 1)',
  },
  number: {
    position: 'absolute',
    bottom: '50%',
    right: '50%'
  },
  redSuit: {
    color: "red"
  },
  blackSuit: {
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
  },
}
