import React from 'react';

const SECURITY_CODE = 'paradigm';


const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

export const UseReducer = ({ name }) => {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log("Started the effect");

    if(!!state.loading) {
      // dispatch({ type: 'ERROR',});
      setTimeout(() => {
        console.log("Doing the check")   
        if(state.value === SECURITY_CODE) {
          dispatch({ type: 'CONFIRMED',});
        } else {
          dispatch({ type: 'ERROR',});
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
            dispatch({ type: 'WRITE', payload: event.target.value });
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: 'CHECK',});
          }}
        >Check</button>
      </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>We have confirmed. are you security?</p>
        <button onClick={() => {
          dispatch({ type: 'DELETE',});
        }} 
        >
          Yes, delete
        </button>
        <button onClick={() => {
          dispatch({ type: 'RESET',});
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
          dispatch({ type: 'RESET',});
        }}>
          Reset, go back
        </button>
      </React.Fragment>
    );

  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONFIRMED':
      return {
        ...state,
        error: false,
        loading: false, 
        confirmed: true,
      }
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    case 'CHECK':
      return {
        ...state,
        loading: true,
      };
    case 'WRITE':
      return {
        ...state,
        value: action.payload, 
      }
    case 'DELETE':
      return {
        ...state,
        deleted: true,
      }
    case 'RESET':
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


