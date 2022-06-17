import React from "react";
const logo = require("../../logo.jpg");
function Home() {
  return (
    <div>
      <img src={logo} alt="Logotipo" className="mx-auto d-block img-fluid" />
    </div>
  );
}

export default Home;
