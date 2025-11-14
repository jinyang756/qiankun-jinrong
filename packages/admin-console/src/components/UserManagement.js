export default function UserManagement() {
  return `
    <div class="user-management">
      <h2>用户管理</h2>
      <div class="user-list">
        <table>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>角色</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>U001</td>
              <td>admin</td>
              <td>管理员</td>
              <td>活跃</td>
              <td><button class="edit-btn">编辑</button></td>
            </tr>
            <tr>
              <td>U002</td>
              <td>agent01</td>
              <td>代理人</td>
              <td>活跃</td>
              <td><button class="edit-btn">编辑</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button id="add-user-btn">添加用户</button>
    </div>
  `;
}