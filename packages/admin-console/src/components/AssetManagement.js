export default function AssetManagement() {
  return `
    <div class="asset-management">
      <h2>素材管理</h2>
      <div class="asset-upload">
        <h3>上传素材</h3>
        <form id="asset-upload-form">
          <div class="form-group">
            <label for="asset-file">选择文件:</label>
            <input type="file" id="asset-file" name="asset-file" accept="image/*">
          </div>
          <div class="form-group">
            <label for="asset-name">素材名称:</label>
            <input type="text" id="asset-name" name="asset-name" placeholder="请输入素材名称">
          </div>
          <div class="form-group">
            <label for="asset-category">素材分类:</label>
            <select id="asset-category" name="asset-category">
              <option value="background">背景图</option>
              <option value="logo">Logo</option>
              <option value="icon">图标</option>
              <option value="banner">横幅</option>
            </select>
          </div>
          <button type="submit">上传素材</button>
        </form>
      </div>
      <div class="asset-list">
        <h3>素材库</h3>
        <div class="assets">
          <div class="asset-item">
            <img src="https://via.placeholder.com/150" alt="背景图1">
            <p>背景图1</p>
            <button class="delete-asset-btn">删除</button>
          </div>
          <div class="asset-item">
            <img src="https://via.placeholder.com/150" alt="Logo1">
            <p>Logo1</p>
            <button class="delete-asset-btn">删除</button>
          </div>
        </div>
      </div>
    </div>
  `;
}