import React, { useState } from "react";
import { formatNumber } from './utilities';
import './UpgradesTab.css';
import { GameState } from './MainTab';

export interface Upgrade {
    id: number;
    type: string;
    name: string;
    level: number;
    baseCost: number;
    cost: number;
    boost: number;
    effect: (gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>, level: number) => void;
}

const initialUpgrades: Upgrade[] = [
    {
        id: 1,
        type: "click",
        name: "Clique",
        level: 0,
        baseCost: 10,
        cost: 10,
        boost: 1,
        effect: (_gameState, setGameState, level) => {
            setGameState((prev) => ({
                ...prev,
                coinsPerClick: prev.coinsPerClick + 1 * Math.pow(1.1, level - 1),
            }));
        },
    },
    {
        id: 2,
        type: "passive",
        name: "Segundo",
        level: 0,
        baseCost: 100,
        cost: 100,
        boost: 1,
        effect: (_gameState, setGameState, level) => {
            setGameState((prev) => ({
                ...prev,
                coinsPerSecond: prev.coinsPerSecond + 1 * Math.pow(1.1, level - 1),
            }));
        },
    },
];

interface UpgradesProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    onUpgradesChange: (upgrades: Upgrade[]) => void; // Adicionada para passar upgrades para o App
}

const UpgradesTab: React.FC<UpgradesProps> = ({ gameState, setGameState, onUpgradesChange }) => {
    const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);

    const buyUpgrade = (upgrade: Upgrade) => {
        if (gameState.coins >= upgrade.cost) {
            setGameState((prev) => ({
                ...prev,
                coins: prev.coins - upgrade.cost,
            }));
            // Usando um setTimeout para garantir que o estado seja atualizado antes de continuar
            setTimeout(() => {
                // Aplica o efeito do upgrade após a atualização das moedas
                upgrade.effect(gameState, setGameState, upgrade.level + 1);

                // Atualiza o nível e o custo do upgrade
                const newUpgrades = upgrades.map(upg =>
                    upg.id === upgrade.id
                        ? { ...upg, level: upgrade.level + 1, cost: Math.floor(upg.baseCost * Math.pow(1.15, upg.level + 1)) }
                        : upg
                );
                setUpgrades(newUpgrades);
                onUpgradesChange(newUpgrades); // Passa os upgrades atualizados para o App
            }, 0);
        }
    };

    return (
        <div className="upgrades">
            {upgrades.map((upgrade) => (
                <div key={upgrade.name} className="upgrade">
                    <div className="upgrade_container" onClick={() => buyUpgrade(upgrade)}>
                        <p className="upgrade_effect">+{formatNumber(upgrade.boost * Math.pow(1.1, upgrade.level))}{upgrade.type === "passive" && " P/s"}</p>
                        <p className="upgrade_name">{upgrade.name}</p>
                        <p className={`upgrade_cost ${gameState.coins >= upgrade.cost ? 'buyable' : 'expensive'}`}>{upgrade.cost}</p>
                        <p className="upgrade_level">Nv. {upgrade.level}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpgradesTab;
