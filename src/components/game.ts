export default class Game {
    private coins: number; // Total de moedas acumuladas
    private clicks: number; // Total de cliques registrados
    private coinsPerClick: number; // Ganhos por clique
    private coinsPerSecond: number; // Ganhos automáticos por segundo
  
    constructor() {
      this.coins = 0;
      this.clicks = 0;
      this.coinsPerClick = 1;
      this.coinsPerSecond = 0;
    }
  
    // Método para registrar um clique
    registerClick() {
      this.clicks += 1;
      this.coins += this.coinsPerClick;
    }
  
    // Método para aumentar os ganhos por segundo
    addCoinsPerSecond(amount: number) {
      this.coinsPerSecond += amount;
    }
  
    // Método para simular ganhos automáticos
    generateCoinsAutomatically() {
      this.coins += this.coinsPerSecond;
    }
  
    // Métodos para acessar os dados do jogo
    getCoins(): number {
      return this.coins;
    }
  
    getClicks(): number {
      return this.clicks;
    }
  
    getCoinsPerClick(): number {
      return this.coinsPerClick;
    }
  
    getCoinsPerSecond(): number {
      return this.coinsPerSecond;
    }
  
    // Método para atualizar os ganhos por clique
    setCoinsPerClick(amount: number) {
      this.coinsPerClick = amount;
    }
  }
  