export default function Home() {
  return `
    <div class="home-container">
      <h2>会员首页</h2>
      <div class="market-data">
        <h3>市场行情</h3>
        <div class="stock-list">
          <div class="stock-item">
            <span>上证指数</span>
            <span>3200.12</span>
            <span class="up">+0.5%</span>
          </div>
          <div class="stock-item">
            <span>深证成指</span>
            <span>11800.45</span>
            <span class="down">-0.2%</span>
          </div>
        </div>
      </div>
      <div class="quick-actions">
        <button id="trade-btn">交易</button>
        <button id="portfolio-btn">持仓</button>
      </div>
    </div>
  `;
}