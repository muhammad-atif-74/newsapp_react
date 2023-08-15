import React, { Component } from 'react'
import loading from '../loader.gif'
export class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading" style={{height: "150px"}}/>
      </div>
    )
  }
}

export default Loader
