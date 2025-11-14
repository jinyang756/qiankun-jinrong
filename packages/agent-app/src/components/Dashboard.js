export default function Dashboard() {
  return `
    <div class="dashboard">
      <h2>代理人数据看板</h2>
      <div class="dashboard-controls">
        <div class="date-filter">
          <label for="date-range">时间范围:</label>
          <select id="date-range">
            <option value="today">今天</option>
            <option value="week">本周</option>
            <option value="month" selected>本月</option>
            <option value="quarter">本季度</option>
            <option value="year">本年</option>
          </select>
        </div>
        <div class="export-controls">
          <button id="export-dashboard">导出数据</button>
          <button id="refresh-dashboard">刷新</button>
        </div>
      </div>
      
      <div class="dashboard-summary">
        <div class="summary-card">
          <h3>会员统计</h3>
          <div class="summary-item">
            <label>总会员数:</label>
            <span id="total-members">125</span>
          </div>
          <div class="summary-item">
            <label>本月新增:</label>
            <span id="new-members">12</span>
          </div>
          <div class="summary-item">
            <label>活跃会员:</label>
            <span id="active-members">89</span>
          </div>
        </div>
        
        <div class="summary-card">
          <h3>交易统计</h3>
          <div class="summary-item">
            <label>今日订单:</label>
            <span id="today-orders">24</span>
          </div>
          <div class="summary-item">
            <label>待审批:</label>
            <span id="pending-approvals">8</span>
          </div>
          <div class="summary-item">
            <label>成交金额:</label>
            <span id="trade-value">¥1,250,000</span>
          </div>
        </div>
        
        <div class="summary-card">
          <h3>邀请统计</h3>
          <div class="summary-item">
            <label>已发送:</label>
            <span id="sent-invites">86</span>
          </div>
          <div class="summary-item">
            <label>已使用:</label>
            <span id="used-invites">42</span>
          </div>
          <div class="summary-item">
            <label>使用率:</label>
            <span id="invite-rate">48.8%</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-charts">
        <div class="chart-container">
          <h3>会员增长趋势</h3>
          <div class="chart-placeholder">
            <!-- 这里应该是图表 -->
            <canvas id="member-growth-chart"></canvas>
          </div>
        </div>
        
        <div class="chart-container">
          <h3>交易量统计</h3>
          <div class="chart-placeholder">
            <!-- 这里应该是图表 -->
            <canvas id="trade-volume-chart"></canvas>
          </div>
        </div>
        
        <div class="chart-container">
          <h3>会员活跃度分布</h3>
          <div class="chart-placeholder">
            <!-- 这里应该是图表 -->
            <canvas id="member-activity-chart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="dashboard-recent">
        <h3>最近活动</h3>
        <div class="activity-list">
          <div class="activity-item">
            <span>用户张三提交了订单</span>
            <span class="time">10分钟前</span>
          </div>
          <div class="activity-item">
            <span>用户李四注册成功</span>
            <span class="time">1小时前</span>
          </div>
          <div class="activity-item">
            <span>邀请码ABC123已被使用</span>
            <span class="time">2小时前</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-details">
        <h3>详细统计</h3>
        <div class="details-section">
          <h4>会员等级分布</h4>
          <table>
            <thead>
              <tr>
                <th>等级</th>
                <th>会员数</th>
                <th>占比</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>普通会员</td>
                <td>100</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>银卡会员</td>
                <td>20</td>
                <td>16%</td>
              </tr>
              <tr>
                <td>金卡会员</td>
                <td>5</td>
                <td>4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}