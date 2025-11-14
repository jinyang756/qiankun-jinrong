import Login from './components/Login.js';
import Home from './components/Home.js';
import Trade from './components/Trade.js';
import OrderHistory from './components/OrderHistory.js';
import MutualFund from './components/MutualFund.js';
import PointsTrading from './components/PointsTrading.js';
import InviteRegister from './components/InviteRegister.js';

// 子应用生命周期函数
let app = null;

export async function bootstrap() {
  console.log('member app bootstraped');
}

export async function mount(props) {
  console.log('member app mounted', props);
  const { token, endpoints, featureFlags, theme } = props;
  
  // 在这里渲染会员端应用
  const root = document.getElementById('member-root');
  
  // 简单的路由判断
  const path = window.location.hash.slice(1);
  
  if (path === '/login' || !token) {
    root.innerHTML = Login();
    
    // 添加登录表单事件监听
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 这里应该调用登录API
        console.log('登录提交');
      });
    }
  } else if (path === '/trade') {
    root.innerHTML = Trade();
  } else if (path === '/orders') {
    root.innerHTML = OrderHistory();
  } else if (path === '/funds') {
    root.innerHTML = MutualFund();
  } else if (path === '/points') {
    root.innerHTML = PointsTrading();
  } else if (path === '/register') {
    root.innerHTML = InviteRegister();
  } else {
    root.innerHTML = Home();
  }
}

export async function unmount() {
  console.log('member app unmounted');
  const root = document.getElementById('member-root');
  if (root) {
    root.innerHTML = '';
  }
}