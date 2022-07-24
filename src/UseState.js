import React from 'react';

const SECURITY_CODE = 'paradigm';


export const UseState = ({ name }) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(value);
  
  React.useEffect(() => {
    console.log("Started the effect");

    if(!!loading) {
      setError(false);
      setTimeout(() => {
        console.log("Doing the check")
        
        if(value === SECURITY_CODE) {
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
  
      }, 2000);
    }

    console.log("Finish the effect");
  }, [loading]);

  return (
    <div>
      <h2>{name} Delete</h2>

      <p>Please, you write security code </p>

      {error && !loading && (
        <p>Error: Wrong security code</p>
      )}
      {loading && (
        <p>Loading...</p>
      )}
      

      <input  
        disabled={loading}
        placeholder='Security code'
        value={value}
        onChange={(event) => {
          // setError(false);
          setValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setLoading(true);
          // setError(false);
        }}
      >Check</button>
    </div>
  )
}