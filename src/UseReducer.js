import React, { useReducer, useEffect } from 'react';

const SECURITY_CODE = 'paradigm';


const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};


const actionTypes = {
  confirmed: 'CONFIRMED',
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  deleted: 'DELETE',
  reset: 'RESET',
}

const reducer = (state, action) => {
  switch (action.type) {
    case  actionTypes.confirmed:
      return {
        ...state,
        error: false,
        loading: false, 
        confirmed: true,
      }
    case actionTypes.error:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.check:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.write:
      return {
        ...state,
        value: action.payload, 
      }
    case actionTypes.deleted:
      return {
        ...state,
        deleted: true,
      }
    case actionTypes.reset:
      return {
        ...state,
        confirmed: false, 
        value: '',
        deleted: false,
      }
    default:
      return {
        ...state,
      };
  }
};



export const UseReducer = ({ name }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const onReset = () => dispatch({ type: actionTypes.reset});
  const onError = () => dispatch({ type: actionTypes.error});
  const onCheck = () => dispatch({ type: actionTypes.check});
  const onDeleted = () => dispatch({ type: actionTypes.deleted});
  const onConfirmed = () => dispatch({ type: actionTypes.confirmed});
  
  const onWrite = (event) => {
    dispatch({ type: actionTypes.write, payload: event.target.value});
  }


  useEffect(() => {
    console.log("Started the effect");

    if(!!state.loading) {
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
          onChange={onWrite}
        />
        <button onClick={onCheck}>
          Check
        </button>
      </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>We have confirmed. are you security?</p>
        <button onClick={onDeleted}>
          Yes, delete
        </button>
        <button onClick={onReset}>
          No, cancel
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted state</p>

        <button onClick={onReset}>
          Reset, go back
        </button>
      </React.Fragment>
    );

  }
}


