import React from 'react';
import { useStateMany } from './hooks/index';

const SECURITY_CODE = 'paradigm';


export const UseState = ({ name }) => {

  const [state, setState] = useStateMany({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  
  const onConfirmed = () => {
    setState({
      error: false,
      loading: false, 
      confirmed: true,
    });
  }
  
  const onError = () => {
    setState({
      loading: false,
      error: true, 
    });
  }

  const onWrite = (newValue) => {
    setState({
      value: newValue, 
    });
  }

  const onCheck = () => {
    setState({
      loading: true, 
    });
  }

  const onDelete = () => {
    setState({
      deleted: true, 
    });
  }

  const onReset = () => {
    setState({
      confirmed: false, 
      value: '',
      deleted: false,
    });
  }

  React.useEffect(() => {
    console.log("Started the effect");

    if(!!state.loading) {
      setState({
        error: false, 
      });
      setTimeout(() => {
        console.log("Doing the check")   
        if(state.value === SECURITY_CODE) {
          onConfirmed();
        } else {
          onError();
        }
      }, 2000);
    }

    console.log("Finish the effect");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>{name} Delete</h2>
  
        <p>Please, you write security code </p>
  
        {state.error && !state.loading && (
          <p>Error: Wrong security code</p>
        )}
        {state.loading && (
          <p>Loading...</p>
        )}
        
        <input  
          disabled={state.loading}
          placeholder='Security code'
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >Check</button>
      </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>We have confirmed. are you security?</p>
        <button onClick={() => {
          onDelete();
        }} 
        >
          Yes, delete
        </button>
        <button onClick={() => {
          onReset();
        }}>
          No, cancel
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted state</p>

        <button onClick={() => {
          onReset();
        }}>
          Reset, go back
        </button>
      </React.Fragment>
    );

  }
}