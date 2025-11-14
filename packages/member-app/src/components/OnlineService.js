export default function OnlineService() {
  return `
    <div class="online-service">
      <h2>在线客服</h2>
      <div class="service-content">
        <div class="contact-info">
          <h3>联系方式</h3>
          <p>客服热线：400-123-4567</p>
          <p>服务时间：周一至周五 9:00-18:00</p>
          <p>邮箱：service@simulated-trading.com</p>
        </div>
        
        <div class="faq-section">
          <h3>常见问题</h3>
          <div class="faq-item">
            <h4>如何注册账户？</h4>
            <p>您需要通过代理人邀请链接注册账户，并完成身份验证。</p>
          </div>
          <div class="faq-item">
            <h4>如何进行交易？</h4>
            <p>在交易页面选择股票代码、输入数量和价格，提交订单即可。</p>
          </div>
          <div class="faq-item">
            <h4>订单状态说明</h4>
            <p>订单状态包括：待审核、已成交、已撤销、已拒绝等。</p>
          </div>
        </div>
        
        <div class="live-chat">
          <h3>实时聊天</h3>
          <div class="chat-window">
            <div class="chat-messages">
              <div class="message received">
                <div class="message-content">您好！欢迎使用在线客服，请问有什么可以帮助您的吗？</div>
                <div class="message-time">09:00</div>
              </div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="请输入您的问题...">
              <button id="send-message">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}