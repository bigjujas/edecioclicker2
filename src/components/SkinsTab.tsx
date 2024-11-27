import React, { useState, useEffect } from "react";
import './SkinsTab.css';

// Skins
import edecio from '/src/assets/edecio.jpg';
import chadEdecio from '/src/assets/chadEdecio.jpg';
import criaEdecio from '/src/assets/criaEdecio.jpg';
import mainWallpaper from '/src/assets/mainWallpaper.jpg';
import mainWallpaper4 from '/src/assets/mainWallpaper4.jpg';
import mainWallpaper8 from '/src/assets/mainWallpaper8.jpg';

export interface Skin {
    id: number;
    type?: string;
    rarity?: string;
    name?: string;
    description?: string;
    image?: string;
    unlocked: boolean;
}

export const initialSkins: Skin[] = [
    { id: 0.1, type: "edecio", rarity: "", name: 'Edecio', description: "", image: edecio, unlocked: true },
    { id: 0.2, type: "background", rarity: "", name: 'Padrão', description: "", image: mainWallpaper, unlocked: true },
    { id: 1, type: "edecio", rarity: "", name: 'Chad Edecio', description: "", image: chadEdecio, unlocked: false },
    { id: 2, type: "edecio", rarity: "", name: 'Cria Edecio', description: "", image: criaEdecio, unlocked: false },
    { id: 3, type: "background", rarity: "", name: 'Prisao', description: "", image: mainWallpaper4, unlocked: false },
    { id: 4, type: "background", rarity: "", name: 'Cidade', description: "", image: mainWallpaper8, unlocked: false },
];

interface SkinsTabProps {
    unlockedSkins: Skin[];
    onSkinSelect: (skinId: number) => void;
}

const SkinsTab: React.FC<SkinsTabProps> = ({ unlockedSkins, onSkinSelect }) => {
    const [skins, setSkins] = useState<Skin[]>(initialSkins);

    useEffect(() => {
        const updatedSkins = skins.map(skin =>
            unlockedSkins.some(unlockedSkin => unlockedSkin.id === skin.id)
                ? { ...skin, unlocked: true }
                : skin
        );
        setSkins(updatedSkins);
    }, [unlockedSkins]);

    return (
        <div className="skins_tab">
            <div className="skins_container">
            <h1>Skins</h1>
            {skins.map(skin => (
                <div key={skin.id} className={`skin ${skin.unlocked ? 'unlocked' : 'locked'}`} onClick={() => skin.unlocked && onSkinSelect(skin.id)}>
                    <p>{skin.name}</p>
                    {skin.unlocked && <p>Unlocked</p>}
                    <img src={skin.image} alt="" />
                </div>
            ))}
            </div>
        </div>
    );
};

export default SkinsTab;
