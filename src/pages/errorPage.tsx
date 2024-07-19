export default function Start() {
  return (
    <div className="errorPage">
      <img src="../public/blue.png" alt="blue illustration" className="blue" />
      <div>
        <h1 className="title text-center" style={{marginBottom:"20px"}}>404 Error</h1>
        <a href="/"><button className="start text-center" >Home Page</button></a>
      </div>
      <img
        src="../public/yellow.png"
        alt="yellow illustration"
        className="yellow"
      />
    </div>
  );
}
