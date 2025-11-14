export default function KillSwitch() {
  return `
    <div class="kill-switch">
      <h2>Kill Switch</h2>
      <div class="kill-switch-status">
        <h3>系统状态</h3>
        <div class="status-item">
          <label>交易系统:</label>
          <span class="status-active">运行中</span>
        </div>
        <div class="status-item">
          <label>审批系统:</label>
          <span class="status-active">运行中</span>
        </div>
        <div class="status-item">
          <label>撮合引擎:</label>
          <span class="status-active">运行中</span>
        </div>
      </div>
      
      <div class="kill-switch-controls">
        <h3>紧急控制</h3>
        <div class="control-group">
          <button id="kill-trading" class="kill-btn">暂停交易</button>
          <button id="resume-trading" class="resume-btn">恢复交易</button>
        </div>
        <div class="control-group">
          <button id="kill-approval" class="kill-btn">暂停审批</button>
          <button id="resume-approval" class="resume-btn">恢复审批</button>
        </div>
        <div class="control-group">
          <button id="kill-engine" class="kill-btn">暂停撮合</button>
          <button id="resume-engine" class="resume-btn">恢复撮合</button>
        </div>
        <div class="control-group">
          <button id="kill-all" class="kill-btn">全部暂停</button>
          <button id="resume-all" class="resume-btn">全部恢复</button>
        </div>
      </div>
      
      <div class="kill-switch-log">
        <h3>操作日志</h3>
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>操作</th>
              <th>操作人</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-04-01 10:30</td>
              <td>暂停交易系统</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>2023-04-01 10:35</td>
              <td>恢复交易系统</td>
              <td>admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}