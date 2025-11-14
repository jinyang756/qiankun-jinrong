export default function InviteManagement() {
  return `
    <div class="invite-management">
      <h2>邀请管理</h2>
      <div class="invite-form">
        <h3>生成邀请码</h3>
        <form id="invite-form">
          <div class="form-group">
            <label for="invite-count">邀请码数量:</label>
            <input type="number" id="invite-count" name="invite-count" min="1" max="100" value="1">
          </div>
          <div class="form-group">
            <label for="invite-expiry">有效期(天):</label>
            <input type="number" id="invite-expiry" name="invite-expiry" min="1" max="365" value="7">
          </div>
          <button type="submit">生成邀请码</button>
        </form>
      </div>
      <div class="invite-list">
        <h3>已生成的邀请码</h3>
        <table>
          <thead>
            <tr>
              <th>邀请码</th>
              <th>创建时间</th>
              <th>过期时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INV20230401ABC</td>
              <td>2023-04-01</td>
              <td>2023-04-08</td>
              <td>未使用</td>
              <td><button class="revoke-btn">撤销</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}