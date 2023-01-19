import React from 'react';
import * as api from "./generated/generated"

function App() {
  const { data, error, loading } = api.useMeQuery()

  return (
    <div>
      <header>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Hello {data.me?.name}</p>}
      </header>
    </div>
  );
}

export default App;
