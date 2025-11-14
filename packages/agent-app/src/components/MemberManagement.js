export default function MemberManagement() {
  return `
    <div class="member-management">
      <h2>会员管理</h2>
      <div class="member-list">
        <table>
          <thead>
            <tr>
              <th>会员ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M001</td>
              <td>张三</td>
              <td>zhangsan@example.com</td>
              <td>活跃</td>
              <td><button class="edit-btn">编辑</button></td>
            </tr>
            <tr>
              <td>M002</td>
              <td>李四</td>
              <td>lisi@example.com</td>
              <td>冻结</td>
              <td><button class="edit-btn">编辑</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button id="add-member-btn">添加会员</button>
    </div>
  `;
}