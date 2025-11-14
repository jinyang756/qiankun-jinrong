export default function OrderHistory() {
  return `
    <div class="order-history">
      <h2>订单历史</h2>
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>股票代码</th>
            <th>交易类型</th>
            <th>数量</th>
            <th>价格</th>
            <th>状态</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ORD20230401001</td>
            <td>600000</td>
            <td>买入</td>
            <td>1000</td>
            <td>12.50</td>
            <td>已成交</td>
            <td>2023-04-01 10:30</td>
          </tr>
          <tr>
            <td>ORD20230401002</td>
            <td>000001</td>
            <td>卖出</td>
            <td>500</td>
            <td>15.20</td>
            <td>已撤销</td>
            <td>2023-04-01 14:15</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}