export default function AgentManagement() {
  return `
    <div class="agent-management">
      <h2>代理人管理</h2>
      <div class="agent-actions">
        <button id="add-agent">添加代理人</button>
      </div>
      
      <div class="agent-list">
        <h3>代理人列表</h3>
        <table>
          <thead>
            <tr>
              <th>代理人名称</th>
              <th>邮箱</th>
              <th>会员数量</th>
              <th>配额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>张三</td>
              <td>zhangsan@example.com</td>
              <td>15</td>
              <td>100</td>
              <td>启用</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
            <tr>
              <td>李四</td>
              <td>lisi@example.com</td>
              <td>8</td>
              <td>50</td>
              <td>启用</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="agent-config">
        <h3>代理人配置</h3>
        <form id="agent-config-form">
          <div class="form-group">
            <label for="agent-name">代理人名称:</label>
            <input type="text" id="agent-name" name="agent-name" required>
          </div>
          
          <div class="form-group">
            <label for="agent-email">邮箱:</label>
            <input type="email" id="agent-email" name="agent-email" required>
          </div>
          
          <div class="form-group">
            <label for="agent-quota">配额:</label>
            <input type="number" id="agent-quota" name="agent-quota" min="1" value="100">
          </div>
          
          <div class="form-group">
            <label for="agent-status">状态:</label>
            <select id="agent-status" name="agent-status">
              <option value="active">启用</option>
              <option value="inactive">禁用</option>
            </select>
          </div>
          
          <button type="submit">保存配置</button>
        </form>
      </div>
    </div>
  `;
}