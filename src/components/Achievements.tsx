import React, { useEffect, useState } from "react";
import { GameState } from './MainTab';
import { Upgrade } from './UpgradesTab';
import { Skin } from './SkinsTab';
import './Achievements.css';

export interface Achievement {
    id: number;
    name: string;
    description: string;
    condition: (gameState: GameState, upgrades: Upgrade[]) => boolean;
    unlocksSkinId?: number;
    unlocked: boolean;
}

const initialAchievements: Achievement[] = [
    {
        id: 1,
        name: "Muito Legal! 👍",
        description: "Realize 1 Clique",
        condition: (gameState) => gameState.clicks >= 1,
        unlocksSkinId: 1,
        unlocked: false,
    },
    {
        id: 2,
        name: "Melhoria 💪",
        description: "Compre seu primeiro upgrade.",
        condition: (gameState, upgrades) => upgrades.some(upgrade => upgrade.level >= 1),
        unlocksSkinId: 2,
        unlocked: false,
    },
    {
        id: 3,
        name: "Clique Master 🫵",
        description: "Atingir 10 moedas por clique.",
        condition: (gameState) => gameState.coinsPerClick >= 10,
        unlocksSkinId: 3,
        unlocked: false,
    },
    {
        id: 4,
        name: "Rei do Upgrade 🦾",
        description: "Atingir o nível 5 no upgrade de clique.",
        condition: (gameState, upgrades) => upgrades.some(upgrade => upgrade.id === 1 && upgrade.level >= 5),
        unlocksSkinId: 4,
        unlocked: false,
    },
];

interface AchievementsProps {
    gameState: GameState;
    upgrades: Upgrade[];
    onSkinUnlock: (skinId: number) => void;
}

const Achievements: React.FC<AchievementsProps> = ({ gameState, upgrades, onSkinUnlock }) => {
    const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

    useEffect(() => {
        setAchievements(prevAchievements => {
            let updated = false;
            const newAchievements = prevAchievements.map(achievement => {
                if (!achievement.unlocked && achievement.condition(gameState, upgrades)) {
                    updated = true;
                    if (achievement.unlocksSkinId) {
                        onSkinUnlock(achievement.unlocksSkinId);
                    }
                    return { ...achievement, unlocked: true };
                }
                return achievement;
            });
            return updated ? newAchievements : prevAchievements; // Apenas atualiza se necessário
        });
    }, [gameState, upgrades, onSkinUnlock]);

    return (
        <div className="achievements_tab">
            <div className="achievements_container">
                <h1>Conquistas</h1>
                {achievements.map(achievement => (
                    <div key={achievement.id} className="achievement">
                        <h2>{achievement.name}</h2>
                        <p className={`${achievement.unlocked ? 'unlocked' : ''}`}>{achievement.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
