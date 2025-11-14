export default function ApprovalQueue() {
  return `
    <div class="approval-queue">
      <h2>审批队列</h2>
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>会员ID</th>
            <th>股票代码</th>
            <th>交易类型</th>
            <th>数量</th>
            <th>价格</th>
            <th>提交时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ORD20230401001</td>
            <td>M001</td>
            <td>600000</td>
            <td>买入</td>
            <td>1000</td>
            <td>12.50</td>
            <td>2023-04-01 10:30</td>
            <td>
              <button class="approve-btn" data-order="ORD20230401001">批准</button>
              <button class="reject-btn" data-order="ORD20230401001">拒绝</button>
            </td>
          </tr>
          <tr>
            <td>ORD20230401002</td>
            <td>M002</td>
            <td>000001</td>
            <td>卖出</td>
            <td>500</td>
            <td>15.20</td>
            <td>2023-04-01 14:15</td>
            <td>
              <button class="approve-btn" data-order="ORD20230401002">批准</button>
              <button class="reject-btn" data-order="ORD20230401002">拒绝</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}