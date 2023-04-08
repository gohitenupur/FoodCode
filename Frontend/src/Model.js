import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'#d3edec',
    padding: '50px',
    zIndex: 1000,
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    width:'90%',
    height:'90%',
    
  };
  
  const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };
  

  export default function Model({children ,onClose}) {
    return ReactDom.createPortal(
        <div>
            <div style={OVERLAY_STYLE}/>
            <div style={MODAL_STYLE}>
                <button className='btn bg-danger fs-4' style={{marginLeft:"90%" ,marginTop:"-25px"}}
                onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById('cart-root')
      )
}

