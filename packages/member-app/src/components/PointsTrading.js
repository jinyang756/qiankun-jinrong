export default function PointsTrading() {
  return `
    <div class="points-trading-container">
      <h2>积分交易</h2>
      <div class="points-info">
        <p>当前积分: <span id="current-points">1250</span></p>
      </div>
      <div class="points-trade-form">
        <h3>积分交易</h3>
        <div class="form-group">
          <label for="points-trade-type">交易类型:</label>
          <select id="points-trade-type" name="points-trade-type">
            <option value="up">看涨</option>
            <option value="down">看跌</option>
          </select>
        </div>
        <div class="form-group">
          <label for="points-amount">积分数:</label>
          <input type="number" id="points-amount" name="points-amount" min="1" max="1250" value="100">
        </div>
        <div class="form-group">
          <label for="points-target">目标股票:</label>
          <input type="text" id="points-target" name="points-target" placeholder="请输入股票代码">
        </div>
        <button id="submit-points-trade">提交交易</button>
      </div>
      <div class="points-history">
        <h3>积分交易历史</h3>
        <table>
          <thead>
            <tr>
              <th>交易类型</th>
              <th>积分数</th>
              <th>目标股票</th>
              <th>结果</th>
              <th>获得积分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>看涨</td>
              <td>100</td>
              <td>600000</td>
              <td>正确</td>
              <td>+50</td>
            </tr>
            <tr>
              <td>看跌</td>
              <td>200</td>
              <td>000001</td>
              <td>错误</td>
              <td>-200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}