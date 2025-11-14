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
          <label for="stock-name">股票名称:</label>
          <span id="stock-name-display">--</span>
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
        <div class="form-group">
          <label for="current-price">当前价格:</label>
          <span id="current-price">--</span>
        </div>
        <div class="form-group">
          <label for="trade-fee">交易费用:</label>
          <span id="trade-fee">--</span>
        </div>
        <div class="form-group">
          <label for="estimated-amount">预计成交金额:</label>
          <span id="estimated-amount">--</span>
        </div>
        <button id="submit-trade">提交交易</button>
        <button id="reset-trade">重置</button>
      </div>
      <div class="trade-history">
        <h3>最近交易</h3>
        <table>
          <thead>
            <tr>
              <th>股票代码</th>
              <th>交易类型</th>
              <th>数量</th>
              <th>价格</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody id="trade-history-body">
            <!-- 交易历史将通过JavaScript动态填充 -->
          </tbody>
        </table>
      </div>
    </div>
  `;
}