export default function Trade() {
  return `
    <div class="trade-container">
      <h2>股票交易</h2>
      <div class="trade-form">
        <div class="form-group">
          <label for="stock-code">股票代码:</label>
          <input type="text" id="stock-code" name="stock-code" placeholder="请输入股票代码">
        </div>
        <div class="form-group">
          <label for="trade-type">交易类型:</label>
          <select id="trade-type" name="trade-type">
            <option value="buy">买入</option>
            <option value="sell">卖出</option>
          </select>
        </div>
        <div class="form-group">
          <label for="quantity">数量:</label>
          <input type="number" id="quantity" name="quantity" min="1" value="100">
        </div>
        <div class="form-group">
          <label for="price">价格:</label>
          <input type="number" id="price" name="price" step="0.01" placeholder="请输入价格">
        </div>
        <button id="submit-trade">提交交易</button>
      </div>
      <div class="trade-info">
        <h3>交易信息</h3>
        <p>股票名称: <span id="stock-name">--</span></p>
        <p>当前价格: <span id="current-price">--</span></p>
        <p>交易费用: <span id="trade-fee">--</span></p>
        <p>预计成交金额: <span id="estimated-amount">--</span></p>
      </div>
    </div>
  `;
}