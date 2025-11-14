export default function Portfolio() {
  return `
    <div class="portfolio-container">
      <h2>持仓管理</h2>
      <div class="portfolio-summary">
        <div class="summary-item">
          <label>总资产:</label>
          <span>¥125,000.00</span>
        </div>
        <div class="summary-item">
          <label>总盈亏:</label>
          <span class="up">+12,500.00 (+11.11%)</span>
        </div>
      </div>
      <table class="portfolio-table">
        <thead>
          <tr>
            <th>股票代码</th>
            <th>股票名称</th>
            <th>持仓数量</th>
            <th>可用数量</th>
            <th>成本价</th>
            <th>当前价</th>
            <th>市值</th>
            <th>盈亏</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>600000</td>
            <td>浦发银行</td>
            <td>1000</td>
            <td>1000</td>
            <td>12.00</td>
            <td>12.50</td>
            <td>12,500.00</td>
            <td class="up">+500.00</td>
            <td>
              <button class="sell-btn" data-code="600000">卖出</button>
            </td>
          </tr>
          <tr>
            <td>000001</td>
            <td>平安银行</td>
            <td>500</td>
            <td>500</td>
            <td>15.00</td>
            <td>14.50</td>
            <td>7,250.00</td>
            <td class="down">-250.00</td>
            <td>
              <button class="sell-btn" data-code="000001">卖出</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}