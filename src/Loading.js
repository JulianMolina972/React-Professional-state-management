import React from 'react';


export class Loading extends React.Component {

  componentDidUnMount() {
    console.log('componentDidUnMount')
    
  }
  render() {
    return (
      <p>Loading...</p>
    )
  }

}