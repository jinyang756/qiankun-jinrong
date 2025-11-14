export default function UserManagement() {
  return `
    <div class="user-management">
      <h2>全局账户与角色管理</h2>
      <div class="user-actions">
        <button id="add-user">添加用户</button>
        <button id="add-role">添加角色</button>
      </div>
      
      <div class="user-list">
        <h3>用户列表</h3>
        <table>
          <thead>
            <tr>
              <th>用户名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>admin@example.com</td>
              <td>管理员</td>
              <td>启用</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
            <tr>
              <td>operator</td>
              <td>operator@example.com</td>
              <td>运营</td>
              <td>启用</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="role-list">
        <h3>角色列表</h3>
        <table>
          <thead>
            <tr>
              <th>角色名称</th>
              <th>描述</th>
              <th>权限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>管理员</td>
              <td>系统管理员</td>
              <td>所有权限</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
            <tr>
              <td>运营</td>
              <td>运营人员</td>
              <td>用户管理、素材管理</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}