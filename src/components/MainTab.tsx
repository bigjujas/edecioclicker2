import React from "react";
import { useState, useEffect } from 'react';
import './MainTab.css'
import Game from "./game.ts";

const MainTab: React.FC = () => {
    const [game, setGame] = useState<Game>(new Game());
    const [coins, setCoins] = useState<number>(game.getCoins());
    const [clicks, setClicks] = useState<number>(game.getClicks());

      // Atualizar os ganhos automáticos por segundo
  useEffect(() => {
    const interval = setInterval(() => {
      game.generateCoinsAutomatically();
      setCoins(game.getCoins());
    }, 1000);

    return () => clearInterval(interval);
  }, [game]);

  const ClickFunction = () => {
    game.registerClick();
    setCoins(game.getCoins());
    setClicks(game.getClicks());
  };

    return (
        <>
            <div className="mainTab">
                <header className="game_header">
                    <h1>placeholder</h1>
                </header>
                <div className="game_tab">
                    <p>Cps: {}</p>
                    <div className="edecio_container">
                        <h1>{coins} 💸</h1>
                        <img src='src/assets/edecio.jpg' onClick={ClickFunction} alt="" draggable="false" />
                    </div>
                </div>
            </div>
        </>
    )
}


export default MainTab;