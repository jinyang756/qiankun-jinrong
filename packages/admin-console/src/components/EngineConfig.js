export default function EngineConfig() {
  return `
    <div class="engine-config">
      <h2>交易引擎配置</h2>
      <form id="engine-config-form">
        <div class="form-group">
          <label for="execution-mode">执行模式:</label>
          <select id="execution-mode" name="execution-mode">
            <option value="manual-approval">人工审核</option>
            <option value="auto">自动成交</option>
          </select>
        </div>
        <div class="form-group">
          <label for="slippage-bps">滑点(bps):</label>
          <input type="number" id="slippage-bps" name="slippage-bps" min="0" max="100" value="10">
        </div>
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
        <button type="submit">保存配置</button>
      </form>
    </div>
  `;
}