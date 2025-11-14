export default function MessageCenter() {
  return `
    <div class="message-center">
      <h2>消息中心</h2>
      <div class="message-filters">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="unread">未读</button>
        <button class="filter-btn" data-filter="system">系统通知</button>
        <button class="filter-btn" data-filter="trade">交易通知</button>
      </div>
      <div class="message-list">
        <div class="message-item unread">
          <div class="message-header">
            <span class="message-type system">系统</span>
            <span class="message-time">2023-04-15 10:30</span>
          </div>
          <div class="message-title">系统维护通知</div>
          <div class="message-content">尊敬的用户，系统将于今晚00:00-02:00进行维护升级，期间可能无法正常交易。</div>
        </div>
        <div class="message-item">
          <div class="message-header">
            <span class="message-type trade">交易</span>
            <span class="message-time">2023-04-14 14:45</span>
          </div>
          <div class="message-title">订单成交确认</div>
          <div class="message-content">您提交的订单(编号: ORD20230414001)已成交，成交价格12.50元，成交数量1000股。</div>
        </div>
        <div class="message-item unread">
          <div class="message-header">
            <span class="message-type trade">交易</span>
            <span class="message-time">2023-04-14 09:15</span>
          </div>
          <div class="message-title">订单提交成功</div>
          <div class="message-content">您提交的订单(编号: ORD20230414001)已成功提交，等待撮合成交。</div>
        </div>
      </div>
      <div class="message-actions">
        <button id="mark-all-read">全部标记为已读</button>
        <button id="clear-all">清空消息</button>
      </div>
    </div>
  `;
}