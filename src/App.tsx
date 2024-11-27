import { useState } from "react";
import MainTab, { GameState, initialState } from './components/MainTab';
import UpgradesTab, { Upgrade } from './components/UpgradesTab';
import Profile from './components/Profile';
import Achievements from './components/Achievements';
import SkinsTab, { Skin, initialSkins  } from './components/SkinsTab';
import './App.css';
import './reset.css';

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([]);
  const [unlockedSkins, setUnlockedSkins] = useState<Skin[]>([]);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<Skin | null>(null);
  
  const [currentLeftTab, setCurrentLeftTab] = useState<number>(1);
  const [currentRightTab, setCurrentRightTab] = useState<number>(1);

  const toggleLeftTab = (tab: number) => {
    setCurrentLeftTab(tab);
  };

  const toggleRightTab = (tab: number) => {
    setCurrentRightTab(tab);
  };

  const handleUpgradesChange = (newUpgrades: Upgrade[]) => {
    setUpgrades(newUpgrades);
  };

  const handleSkinUnlock = (skinId: number) => {
    const skinToUnlock = initialSkins.find(skin => skin.id === skinId);

    if (!skinToUnlock) {
      console.error("Skin não encontrada!");
      return;
    }

    setUnlockedSkins(prevSkins => {
      if (!prevSkins.some(skin => skin.id === skinId)) {
        return [...prevSkins, { ...skinToUnlock, unlocked: true }];
      }
      return prevSkins;
    });
  };

  const handleSkinSelect = (skinId: number) => {
    const selected = unlockedSkins.find(skin => skin.id === skinId);
    if (selected) {
      if (selected.type === 'background') {
        setSelectedBackground(selected);
      } else if (selected.type === 'edecio') {
        setSelectedSkin(selected);
      }
    }
  };

  return (
    <>
      <header className="header">
        <h1>Edecio <span>Clicker</span> 2</h1>
      </header>
      <div className="main_container">
        <div className="left_container">
          <div className="tabs">
            <p className={currentLeftTab === 1 ? "tab_active" : "tab_inactive"} onClick={() => toggleLeftTab(1)}>Perfil 🌐</p>
            <p className={currentLeftTab === 2 ? "tab_active" : "tab_inactive"} onClick={() => toggleLeftTab(2)}>Conquistas 🏆</p>
          </div>
          {currentLeftTab === 1 && (
            <Profile gameState={gameState} />
          )}
          {currentLeftTab === 2 && (
            <Achievements gameState={gameState} upgrades={upgrades} onSkinUnlock={handleSkinUnlock} />
          )}
        </div>
        <div className="game_container">
          <MainTab gameState={gameState} setGameState={setGameState} selectedSkin={selectedSkin} selectedBackground={selectedBackground} />
        </div>
        <div className="right_container">
          <div className="tabs">
            <p className={currentRightTab === 1 ? "tab_active" : "tab_inactive"} onClick={() => toggleRightTab(1)}>Upgrades 💸</p>
            <p className={currentRightTab === 2 ? "tab_active" : "tab_inactive"} onClick={() => toggleRightTab(2)}>Skins 🎪</p>
          </div>
          {currentRightTab === 1 && (
            <UpgradesTab gameState={gameState} setGameState={setGameState} onUpgradesChange={handleUpgradesChange} />
          )}
          {currentRightTab === 2 && (
            <SkinsTab unlockedSkins={unlockedSkins} onSkinSelect={handleSkinSelect} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
