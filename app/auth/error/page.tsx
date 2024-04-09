import React from 'react'

const Error = ({message}: {message: string}) => {
    return (
        <div>
          <h1>Terjadi Kesalahan</h1>
          <p>{message}</p>
        </div>
      );
}

export default Error