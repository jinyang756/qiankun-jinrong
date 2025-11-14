export default function ProductManagement() {
  return `
    <div class="product-management">
      <h2>私募/看涨看跌产品管理</h2>
      <div class="product-actions">
        <button id="add-product">添加产品</button>
      </div>
      
      <div class="product-tabs">
        <button class="tab-btn active" data-tab="mutual-fund">私募基金</button>
        <button class="tab-btn" data-tab="options">看涨看跌</button>
      </div>
      
      <div class="product-list">
        <h3>私募基金产品</h3>
        <table>
          <thead>
            <tr>
              <th>产品代码</th>
              <th>产品名称</th>
              <th>净值</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MF001</td>
              <td>稳健增长基金</td>
              <td>1.25</td>
              <td>开放申购</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
            <tr>
              <td>MF002</td>
              <td>积极成长基金</td>
              <td>0.98</td>
              <td>开放赎回</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="product-list" style="display: none;">
        <h3>看涨看跌产品</h3>
        <table>
          <thead>
            <tr>
              <th>产品代码</th>
              <th>标的股票</th>
              <th>类型</th>
              <th>行权价</th>
              <th>到期日</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OPT001</td>
              <td>600000</td>
              <td>看涨</td>
              <td>12.50</td>
              <td>2023-06-30</td>
              <td>开放交易</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
            <tr>
              <td>OPT002</td>
              <td>000001</td>
              <td>看跌</td>
              <td>15.00</td>
              <td>2023-06-30</td>
              <td>开放交易</td>
              <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="product-config">
        <h3>产品配置</h3>
        <form id="product-config-form">
          <div class="form-group">
            <label for="product-type">产品类型:</label>
            <select id="product-type" name="product-type">
              <option value="mutual-fund">私募基金</option>
              <option value="options">看涨看跌</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="product-code">产品代码:</label>
            <input type="text" id="product-code" name="product-code" required>
          </div>
          
          <div class="form-group">
            <label for="product-name">产品名称:</label>
            <input type="text" id="product-name" name="product-name" required>
          </div>
          
          <div class="form-group">
            <label for="product-status">状态:</label>
            <select id="product-status" name="product-status">
              <option value="active">开放交易</option>
              <option value="inactive">暂停交易</option>
            </select>
          </div>
          
          <button type="submit">保存配置</button>
        </form>
      </div>
    </div>
  `;
}