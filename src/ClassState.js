import React from 'react';
import { Loading } from './Loading';


const SECURITY_CODE = 'paradigm';

export class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount')
  // }

  // componentDidMount() {
  //   console.log('componentDidMount')

  // }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    // this.setState({ error: false });
    if(!!this.state.loading) {
      setTimeout(() => {
        console.log("Doing the check")
  
        if (SECURITY_CODE === this.state.value) {
          this.setState({loading: false, error: false});
        } else {
          this.setState({error: true, loading: false});
        }
  
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.name} Delete</h2>

        <p>Please, you write security code </p>

        {(this.state.error && !this.state.loading) && 
          <p>Error: Wrong security code</p>}
        {this.state.loading && 
          <Loading />}

        <input  
          disabled={this.state.loading}
          placeholder='Security code'
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value});
            // this.setState({ error: false});
          }}
        />
        <button
          onClick={() => this.setState({loading: true}) }
        >
          Check
        </button>
      </div>
    )
  }

}