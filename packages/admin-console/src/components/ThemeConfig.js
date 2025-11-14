export default function ThemeConfig() {
  return `
    <div class="theme-config">
      <h2>主题配置</h2>
      <form id="theme-config-form">
        <div class="form-group">
          <label for="primary-color">主色调:</label>
          <input type="color" id="primary-color" name="primary-color" value="#1E3A5F">
        </div>
        <div class="form-group">
          <label for="secondary-color">辅助色:</label>
          <input type="color" id="secondary-color" name="secondary-color" value="#4A90E2">
        </div>
        <div class="form-group">
          <label for="success-color">成功色:</label>
          <input type="color" id="success-color" name="success-color" value="#52C41A">
        </div>
        <div class="form-group">
          <label for="danger-color">危险色:</label>
          <input type="color" id="danger-color" name="danger-color" value="#F5222D">
        </div>
        <div class="form-group">
          <label for="text-primary-color">主要文字色:</label>
          <input type="color" id="text-primary-color" name="text-primary-color" value="#FFFFFF">
        </div>
        <div class="form-group">
          <label for="text-secondary-color">次要文字色:</label>
          <input type="color" id="text-secondary-color" name="text-secondary-color" value="#B8BCC8">
        </div>
        <div class="form-group">
          <label for="background-primary-color">主要背景色:</label>
          <input type="color" id="background-primary-color" name="background-primary-color" value="#0A0E1A">
        </div>
        <div class="form-group">
          <label for="background-secondary-color">次要背景色:</label>
          <input type="color" id="background-secondary-color" name="background-secondary-color" value="#141824">
        </div>
        <div class="form-group">
          <label for="border-color">边框色:</label>
          <input type="color" id="border-color" name="border-color" value="#2B3245">
        </div>
        <div class="form-group">
          <label for="border-radius">圆角大小:</label>
          <input type="number" id="border-radius" name="border-radius" min="0" max="50" value="12">
        </div>
        <button type="submit">保存主题</button>
        <button type="button" id="preview-theme">预览主题</button>
      </form>
    </div>
  `;
}