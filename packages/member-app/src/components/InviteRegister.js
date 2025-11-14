export default function InviteRegister() {
  return `
    <div class="invite-register-container">
      <h2>邀请注册</h2>
      <form id="invite-register-form">
        <div class="form-group">
          <label for="invite-code">邀请码:</label>
          <input type="text" id="invite-code" name="invite-code" required>
        </div>
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" name="password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码:</label>
          <input type="password" id="confirm-password" name="confirm-password" required>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" id="agree-terms" name="agree-terms" required>
            我已阅读并同意<a href="#" target="_blank">用户协议</a>和<a href="#" target="_blank">隐私政策</a>
          </label>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" id="agree-disclaimer" name="agree-disclaimer" required>
            我已了解这是一个模拟交易系统，不涉及真实资金
          </label>
        </div>
        <button type="submit">注册</button>
      </form>
    </div>
  `;
}