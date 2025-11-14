import EngineConfig from './components/EngineConfig.js';
import UserManagement from './components/UserManagement.js';
import ThemeConfig from './components/ThemeConfig.js';
import AssetManagement from './components/AssetManagement.js';
import AgentManagement from './components/AgentManagement.js';
import ProductManagement from './components/ProductManagement.js';
import KillSwitch from './components/KillSwitch.js';

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
    
    // 添加引擎配置表单事件监听
    const engineConfigForm = document.getElementById('engine-config-form');
    const resetConfigBtn = document.getElementById('reset-config');
    const exportConfigBtn = document.getElementById('export-config');
    
    if (engineConfigForm) {
      engineConfigForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 这里应该调用保存配置API
        console.log('引擎配置提交');
        alert('配置已保存');
      });
    }
    
    if (resetConfigBtn) {
      resetConfigBtn.addEventListener('click', () => {
        // 重置表单到默认值
        document.getElementById('execution-mode').value = 'manual-approval';
        document.getElementById('price-source').value = 'MID';
        document.getElementById('slippage-bps').value = '10';
        document.getElementById('trading-time').value = 'follow-a-share';
        document.getElementById('t-plus-one').checked = true;
        document.getElementById('max-single-order').value = '100000';
        document.getElementById('max-daily-order').value = '500000';
        document.getElementById('max-position-value').value = '1000000';
        alert('配置已重置');
      });
    }
    
    if (exportConfigBtn) {
      exportConfigBtn.addEventListener('click', () => {
        // 这里应该导出配置
        console.log('导出配置');
        alert('配置已导出');
      });
    }
    
    // 添加标签页切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 移除所有活动状态
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // 添加当前按钮活动状态
        button.classList.add('active');
        
        // 这里可以添加切换不同配置页面的逻辑
        console.log('切换到标签页:', button.getAttribute('data-tab'));
      });
    });
  } else if (path === '/users') {
    root.innerHTML = UserManagement();
  } else if (path === '/theme') {
    root.innerHTML = ThemeConfig();
  } else if (path === '/assets') {
    root.innerHTML = AssetManagement();
  } else if (path === '/agents') {
    root.innerHTML = AgentManagement();
  } else if (path === '/products') {
    root.innerHTML = ProductManagement();
  } else if (path === '/kill-switch') {
    root.innerHTML = KillSwitch();
  } else {
    root.innerHTML = `
      <div>
        <h2>管理端首页</h2>
        <div class="quick-links">
          <button id="engine-link">引擎配置</button>
          <button id="users-link">用户管理</button>
          <button id="theme-link">主题配置</button>
          <button id="assets-link">素材管理</button>
          <button id="agents-link">代理人管理</button>
          <button id="products-link">产品管理</button>
          <button id="kill-switch-link">Kill Switch</button>
        </div>
      </div>
    `;
  }
  
  // 添加导航事件监听
  const engineLink = document.getElementById('engine-link');
  const usersLink = document.getElementById('users-link');
  const themeLink = document.getElementById('theme-link');
  const assetsLink = document.getElementById('assets-link');
  const agentsLink = document.getElementById('agents-link');
  const productsLink = document.getElementById('products-link');
  const killSwitchLink = document.getElementById('kill-switch-link');
  
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
  
  if (agentsLink) {
    agentsLink.addEventListener('click', () => {
      window.location.hash = '#/agents';
      mount(props);
    });
  }
  
  if (productsLink) {
    productsLink.addEventListener('click', () => {
      window.location.hash = '#/products';
      mount(props);
    });
  }
  
  if (killSwitchLink) {
    killSwitchLink.addEventListener('click', () => {
      window.location.hash = '#/kill-switch';
      mount(props);
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
  
  // 添加代理人配置表单事件监听
  const agentConfigForm = document.getElementById('agent-config-form');
  if (agentConfigForm) {
    agentConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 这里应该调用保存代理人配置API
      console.log('代理人配置提交');
    });
  }
  
  // 添加产品配置表单事件监听
  const productConfigForm = document.getElementById('product-config-form');
  if (productConfigForm) {
    productConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 这里应该调用保存产品配置API
      console.log('产品配置提交');
    });
  }
  
  // 添加产品标签页事件监听
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 移除所有活动状态
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // 添加当前按钮活动状态
      button.classList.add('active');
      
      // 显示对应的产品列表
      const tab = button.getAttribute('data-tab');
      const productLists = document.querySelectorAll('.product-list');
      
      productLists.forEach((list, index) => {
        if (index === 0 && tab === 'mutual-fund') {
          list.style.display = 'block';
        } else if (index === 1 && tab === 'options') {
          list.style.display = 'block';
        } else {
          list.style.display = 'none';
        }
      });
    });
  });
  
  // 添加Kill Switch按钮事件监听
  const killButtons = document.querySelectorAll('.kill-btn');
  const resumeButtons = document.querySelectorAll('.resume-btn');
  
  killButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 这里应该调用暂停系统API
      console.log('暂停系统:', button.id);
    });
  });
  
  resumeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 这里应该调用恢复系统API
      console.log('恢复系统:', button.id);
    });
  });
}

export async function unmount() {
  console.log('admin console unmounted');
  const root = document.getElementById('admin-root');
  if (root) {
    root.innerHTML = '';
  }
}