const CardStyles = {
  card: {
    border: '1px solid black',
    width: '50px',
    height: '70px',
    position: 'relative',
    '&:hover': {
      'z-index': 6,
    },
    'z-index': props => props.cardIndex,
    overflow: 'show',
    float: 'left',
    'marginLeft': '-10px',
    'background-color': 'rgba(135, 206, 250, 1)',
    flipped: {
      color: 'rgba(135, 206, 250, 0)',
     '-webkit-touch-callout': 'none', /* iOS Safari */
       '-webkit-user-select': 'none', /* Safari */
        '-khtml-user-select': 'none', /* Konqueror HTML */
          '-moz-user-select': 'none', /* Firefox */
           '-ms-user-select': 'none', /* Internet Explorer/Edge */
               'user-select': 'none', /* Non-prefixed version, currently
                                     supported by Chrome and Opera */
    }
  },
  number: {
    position: 'absolute',
    bottom: '50%',
    right: '50%'
  },
  red_suit: {
    color: "red"
  },
  black_suit: {
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

export default CardStyles;
