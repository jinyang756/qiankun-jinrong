export default function MutualFund() {
  return `
    <div class="mutual-fund-container">
      <h2>私募基金</h2>
      <div class="fund-list">
        <div class="fund-item">
          <h3>成长型基金A</h3>
          <p>净值: 1.25</p>
          <p>日涨跌: +0.5%</p>
          <button class="subscribe-btn" data-fund="fundA">申购</button>
        </div>
        <div class="fund-item">
          <h3>稳健型基金B</h3>
          <p>净值: 1.12</p>
          <p>日涨跌: +0.2%</p>
          <button class="subscribe-btn" data-fund="fundB">申购</button>
        </div>
      </div>
      <div class="fund-trade-form">
        <h3>基金交易</h3>
        <div class="form-group">
          <label for="fund-code">基金代码:</label>
          <input type="text" id="fund-code" name="fund-code" readonly>
        </div>
        <div class="form-group">
          <label for="fund-trade-type">交易类型:</label>
          <select id="fund-trade-type" name="fund-trade-type">
            <option value="subscribe">申购</option>
            <option value="redeem">赎回</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fund-amount">金额:</label>
          <input type="number" id="fund-amount" name="fund-amount" min="1" step="0.01">
        </div>
        <button id="submit-fund-trade">提交交易</button>
      </div>
    </div>
  `;
}