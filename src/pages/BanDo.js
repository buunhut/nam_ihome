import React from 'react'

const BanDo = () => {
  return (
    <div className="w-full h-screen"style={{height: '100vh'}}>
      <iframe
        src="https://map.tekadev.vn/"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Teka Map"
      ></iframe>
    </div>)
}

export default BanDo