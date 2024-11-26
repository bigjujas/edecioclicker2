import './App.css'
import './reset.css'
import MainTab from './components/MainTab';

function App() {

  return (
    <>
      <header className="header">
        <h1>Edecio Clicker 2</h1>
      </header>
      <div className="main_container">
        <div className="left_container">
          <div className="left_header">
            <h1>placeholder</h1>
          </div>
          <div className="left_tabs">
            <p>Perfil</p>
            <p>Conquistas</p>
          </div>
        </div>
        <div className="game_container">
          <MainTab />
        </div>
        <div className="right_container">
          <div className="right_header">
            <h1>placeholder</h1>
          </div>
          <div className="right_tabs">
            <p>Upgrades</p>
            <p>Skins</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
