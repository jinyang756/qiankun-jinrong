import EngineConfig from './components/EngineConfig.js';
import UserManagement from './components/UserManagement.js';
import ThemeConfig from './components/ThemeConfig.js';
import AssetManagement from './components/AssetManagement.js';

// 子应用生命周期函数
let app = null;

export async function bootstrap() {
  console.log('admin console bootstraped');
}

export async function mount(props) {
  console.log('admin console mounted', props);
  const { token, endpoints, featureFlags, theme } = props;
  
  // 在这里渲染管理端应用
  const root = document.getElementById('admin-root');
  
  // 简单的路由判断
  const path = window.location.hash.slice(1);
  
  if (path === '/engine') {
    root.innerHTML = EngineConfig();
  } else if (path === '/users') {
    root.innerHTML = UserManagement();
  } else if (path === '/theme') {
    root.innerHTML = ThemeConfig();
  } else if (path === '/assets') {
    root.innerHTML = AssetManagement();
  } else {
    root.innerHTML = `
      <div>
        <h2>管理端首页</h2>
        <div class="quick-links">
          <button id="engine-link">引擎配置</button>
          <button id="users-link">用户管理</button>
          <button id="theme-link">主题配置</button>
          <button id="assets-link">素材管理</button>
        </div>
      </div>
    `;
  }
  
  // 添加导航事件监听
  const engineLink = document.getElementById('engine-link');
  const usersLink = document.getElementById('users-link');
  const themeLink = document.getElementById('theme-link');
  const assetsLink = document.getElementById('assets-link');
  
  if (engineLink) {
    engineLink.addEventListener('click', () => {
      window.location.hash = '#/engine';
      mount(props);
    });
  }
  
  if (usersLink) {
    usersLink.addEventListener('click', () => {
      window.location.hash = '#/users';
      mount(props);
    });
  }
  
  if (themeLink) {
    themeLink.addEventListener('click', () => {
      window.location.hash = '#/theme';
      mount(props);
    });
  }
  
  if (assetsLink) {
    assetsLink.addEventListener('click', () => {
      window.location.hash = '#/assets';
      mount(props);
    });
  }
  
  // 添加引擎配置表单事件监听
  const engineConfigForm = document.getElementById('engine-config-form');
  if (engineConfigForm) {
    engineConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 这里应该调用保存配置API
      console.log('引擎配置提交');
    });
  }
  
  // 添加主题配置表单事件监听
  const themeConfigForm = document.getElementById('theme-config-form');
  if (themeConfigForm) {
    themeConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 这里应该调用保存主题API
      console.log('主题配置提交');
    });
  }
  
  // 添加素材上传表单事件监听
  const assetUploadForm = document.getElementById('asset-upload-form');
  if (assetUploadForm) {
    assetUploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 这里应该调用上传素材API
      console.log('素材上传提交');
    });
  }
}

export async function unmount() {
  console.log('admin console unmounted');
  const root = document.getElementById('admin-root');
  if (root) {
    root.innerHTML = '';
  }
}