export default function Reports() {
  return `
    <div class="reports">
      <h2>报表导出</h2>
      <div class="report-filters">
        <div class="filter-group">
          <label>时间范围:</label>
          <select id="time-range">
            <option value="today">今天</option>
            <option value="week">本周</option>
            <option value="month" selected>本月</option>
            <option value="quarter">本季度</option>
            <option value="year">本年</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>报表类型:</label>
          <select id="report-type">
            <option value="member">会员统计</option>
            <option value="trade" selected>交易统计</option>
            <option value="invite">邀请统计</option>
            <option value="approval">审批统计</option>
          </select>
        </div>
        
        <button id="generate-report">生成报表</button>
        <button id="export-report">导出报表</button>
      </div>
      
      <div class="report-content">
        <h3>交易统计报表</h3>
        <table class="report-table">
          <thead>
            <tr>
              <th>日期</th>
              <th>订单总数</th>
              <th>成交订单</th>
              <th>撤销订单</th>
              <th>待审批</th>
              <th>总交易额(¥)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-04-01</td>
              <td>24</td>
              <td>18</td>
              <td>3</td>
              <td>3</td>
              <td>1,250,000.00</td>
            </tr>
            <tr>
              <td>2023-04-02</td>
              <td>19</td>
              <td>15</td>
              <td>2</td>
              <td>2</td>
              <td>980,000.00</td>
            </tr>
            <tr>
              <td>2023-04-03</td>
              <td>21</td>
              <td>17</td>
              <td>1</td>
              <td>3</td>
              <td>1,100,000.00</td>
            </tr>
          </tbody>
        </table>
        
        <div class="report-summary">
          <h4>统计汇总</h4>
          <div class="summary-item">
            <label>订单总数:</label>
            <span>64</span>
          </div>
          <div class="summary-item">
            <label>总交易额:</label>
            <span>¥3,330,000.00</span>
          </div>
          <div class="summary-item">
            <label>平均每日交易额:</label>
            <span>¥1,110,000.00</span>
          </div>
        </div>
      </div>
    </div>
  `;
}