import React from "react";
import { formatNumber } from './utilities';
import './Profile.css';
import { GameState } from './MainTab';

interface ProfileProps { gameState: GameState; }

export const Profile: React.FC<ProfileProps> = ({ gameState }) => {
    return (
        <>
            <div className="profile_container">
                <div className="profile_table">
                    <h1>Estatísticas</h1>
                    <div className="profile_stat">
                        <h3>Moedas</h3>
                        <h3>{formatNumber(gameState.coins)}</h3>
                    </div>
                    <div className="profile_stat">
                        <h3>Cliques Totais</h3>
                        <h3>{formatNumber(gameState.clicks)}</h3>
                    </div>
                    <div className="profile_stat">
                        <h3>Moedas Totais</h3>
                        <h3>{formatNumber(gameState.lifeTimeCoins)}</h3>
                    </div>
                    <div className="profile_stat">
                        <h3>Coins por Clique</h3>
                        <h3>{formatNumber(gameState.coinsPerClick)}</h3>
                    </div>
                    <div className="profile_stat">
                        <h3>Coins por Segundo</h3>
                        <h3>{formatNumber(gameState.coinsPerSecond)}</h3>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;
