import React, { useEffect } from "react";
import { formatNumber } from './utilities';
import './MainTab.css';
import { Skin } from './SkinsTab';

export interface GameState {
  coins: number;
  coinsPerClick: number;
  coinsPerSecond: number;
  clicks: number;
  lifeTimeCoins: number;
}

export const initialState: GameState = {
  coins: 0,
  coinsPerClick: 1,
  coinsPerSecond: 0,
  clicks: 0,
  lifeTimeCoins: 0,
};

interface MainTabProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  selectedSkin: Skin | null; 
  selectedBackground: Skin | null;
}

const MainTab: React.FC<MainTabProps> = ({ gameState, setGameState, selectedSkin, selectedBackground }) => {
  const backgroundStyle = selectedBackground ? { backgroundImage: `url(${selectedBackground.image})` } : {};
  const characterImage = selectedSkin ? selectedSkin.image : '/src/assets/edecio.jpg';

  const ClickFunction = () => {
    setGameState(prevState => ({
      ...prevState,
      coins: prevState.coins + prevState.coinsPerClick,
      lifeTimeCoins: prevState.lifeTimeCoins + prevState.coinsPerClick,
      clicks: prevState.clicks + 1
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins + (prev.coinsPerSecond / 10),
        lifeTimeCoins: prev.lifeTimeCoins + (prev.coinsPerSecond / 10)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.coinsPerSecond, setGameState]);

  return (
    <>
      <div style={backgroundStyle} className="mainTab">
        <div className="game_tab">
          <div className="edecio_container">
            <h1>${formatNumber(gameState.coins)}🪙</h1>
            <div className="game_infos">
              <p>${formatNumber(gameState.coinsPerClick)} por Clique</p>
              <p>${formatNumber(gameState.coinsPerSecond)} por Segundo</p>
            </div>
            <img src={characterImage} onClick={ClickFunction} alt="" draggable="false" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTab;
