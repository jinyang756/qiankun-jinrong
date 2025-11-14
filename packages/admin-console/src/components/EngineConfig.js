export default function EngineConfig() {
  return `
    <div class="engine-config">
      <h2>交易引擎配置</h2>
      <div class="config-tabs">
        <button class="tab-btn active" data-tab="engine">引擎配置</button>
        <button class="tab-btn" data-tab="risk">风控配置</button>
        <button class="tab-btn" data-tab="fees">费用配置</button>
      </div>
      
      <form id="engine-config-form">
        <div class="form-section">
          <h3>基本配置</h3>
          <div class="form-group">
            <label for="execution-mode">执行模式:</label>
            <select id="execution-mode" name="execution-mode">
              <option value="manual-approval">人工审核</option>
              <option value="auto">自动成交</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="price-source">价格源:</label>
            <select id="price-source" name="price-source">
              <option value="MID">中间价</option>
              <option value="LAST">最新价</option>
              <option value="VWAP_3S">3秒VWAP</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="slippage-bps">滑点(bps):</label>
            <input type="number" id="slippage-bps" name="slippage-bps" min="0" max="100" value="10">
          </div>
        </div>
        
        <div class="form-section">
          <h3>交易时间配置</h3>
          <div class="form-group">
            <label for="trading-time">交易时间:</label>
            <select id="trading-time" name="trading-time">
              <option value="follow-a-share">跟随A股</option>
              <option value="always-open">全天开放</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="t-plus-one">T+1限制:</label>
            <input type="checkbox" id="t-plus-one" name="t-plus-one" checked>
          </div>
        </div>
        
        <div class="form-section">
          <h3>限额配置</h3>
          <div class="form-group">
            <label for="max-single-order">单笔订单最大金额:</label>
            <input type="number" id="max-single-order" name="max-single-order" min="0" value="100000">
          </div>
          
          <div class="form-group">
            <label for="max-daily-order">每日订单最大金额:</label>
            <input type="number" id="max-daily-order" name="max-daily-order" min="0" value="500000">
          </div>
          
          <div class="form-group">
            <label for="max-position-value">最大持仓市值:</label>
            <input type="number" id="max-position-value" name="max-position-value" min="0" value="1000000">
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit">保存配置</button>
          <button type="button" id="reset-config">重置</button>
          <button type="button" id="export-config">导出配置</button>
        </div>
      </form>
      
      <div class="config-history">
        <h3>配置历史</h3>
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>操作人</th>
              <th>变更内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-04-01 10:30</td>
              <td>admin</td>
              <td>修改滑点为10bps</td>
            </tr>
            <tr>
              <td>2023-03-28 14:15</td>
              <td>admin</td>
              <td>启用T+1限制</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}