import Login from './components/Login.js';
import Home from './components/Home.js';
import InviteRegister from './components/InviteRegister.js';
import Trade from './components/Trade.js';
import MutualFund from './components/MutualFund.js';
import PointsTrading from './components/PointsTrading.js';
import OrderHistory from './components/OrderHistory.js';
import Portfolio from './components/Portfolio.js';
import MessageCenter from './components/MessageCenter.js';
import RiskDisclosure from './components/RiskDisclosure.js';
import OnlineService from './components/OnlineService.js';

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
    
    // 添加交易表单事件监听
    const stockCodeInput = document.getElementById('stock-code');
    const tradeTypeSelect = document.getElementById('trade-type');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const submitTradeBtn = document.getElementById('submit-trade');
    const resetTradeBtn = document.getElementById('reset-trade');
    
    // 模拟股票数据
    const stockData = {
      '600000': { name: '浦发银行', price: 12.50 },
      '000001': { name: '平安银行', price: 15.20 },
      '600036': { name: '招商银行', price: 45.60 }
    };
    
    // 股票代码输入事件监听
    if (stockCodeInput) {
      stockCodeInput.addEventListener('input', () => {
        const code = stockCodeInput.value;
        const stock = stockData[code];
        
        if (stock) {
          document.getElementById('stock-name-display').textContent = stock.name;
          document.getElementById('current-price').textContent = stock.price.toFixed(2);
          
          // 如果价格输入框为空，自动填充当前价格
          if (!priceInput.value) {
            priceInput.value = stock.price.toFixed(2);
          }
          
          // 计算预计成交金额和交易费用
          updateTradeInfo();
        } else {
          document.getElementById('stock-name-display').textContent = '--';
          document.getElementById('current-price').textContent = '--';
        }
      });
    }
    
    // 数量和价格输入事件监听
    if (quantityInput) {
      quantityInput.addEventListener('input', updateTradeInfo);
    }
    
    if (priceInput) {
      priceInput.addEventListener('input', updateTradeInfo);
    }
    
    // 交易类型选择事件监听
    if (tradeTypeSelect) {
      tradeTypeSelect.addEventListener('change', updateTradeInfo);
    }
    
    // 更新交易信息函数
    function updateTradeInfo() {
      const quantity = parseInt(quantityInput.value) || 0;
      const price = parseFloat(priceInput.value) || 0;
      const amount = quantity * price;
      
      // 计算交易费用 (假设为成交金额的0.05%)
      const fee = amount * 0.0005;
      
      document.getElementById('trade-fee').textContent = fee.toFixed(2);
      document.getElementById('estimated-amount').textContent = amount.toFixed(2);
    }
    
    // 提交交易按钮事件监听
    if (submitTradeBtn) {
      submitTradeBtn.addEventListener('click', () => {
        const stockCode = stockCodeInput.value;
        const tradeType = tradeTypeSelect.value;
        const quantity = quantityInput.value;
        const price = priceInput.value;
        
        if (!stockCode || !quantity || !price) {
          alert('请填写完整的交易信息');
          return;
        }
        
        // 这里应该调用提交交易API
        console.log('提交交易:', { stockCode, tradeType, quantity, price });
        
        // 添加到交易历史
        addToTradeHistory(stockCode, tradeType, quantity, price, '已提交');
        
        // 显示成功消息
        alert('交易已提交，请等待审批');
      });
    }
    
    // 重置按钮事件监听
    if (resetTradeBtn) {
      resetTradeBtn.addEventListener('click', () => {
        stockCodeInput.value = '';
        quantityInput.value = '100';
        priceInput.value = '';
        document.getElementById('stock-name-display').textContent = '--';
        document.getElementById('current-price').textContent = '--';
        document.getElementById('trade-fee').textContent = '--';
        document.getElementById('estimated-amount').textContent = '--';
      });
    }
    
    // 添加到交易历史函数
    function addToTradeHistory(stockCode, tradeType, quantity, price, status) {
      const tradeHistoryBody = document.getElementById('trade-history-body');
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${stockCode}</td>
        <td>${tradeType === 'buy' ? '买入' : '卖出'}</td>
        <td>${quantity}</td>
        <td>${parseFloat(price).toFixed(2)}</td>
        <td>${status}</td>
      `;
      
      // 将新行插入到表格顶部
      if (tradeHistoryBody.firstChild) {
        tradeHistoryBody.insertBefore(row, tradeHistoryBody.firstChild);
      } else {
        tradeHistoryBody.appendChild(row);
      }
      
      // 限制只显示最近5条记录
      if (tradeHistoryBody.children.length > 5) {
        tradeHistoryBody.removeChild(tradeHistoryBody.lastChild);
      }
    }
  } else if (path === '/orders') {
    root.innerHTML = OrderHistory();
  } else if (path === '/funds') {
    root.innerHTML = MutualFund();
  } else if (path === '/points') {
    root.innerHTML = PointsTrading();
  } else if (path === '/register') {
    root.innerHTML = InviteRegister();
  } else if (path === '/portfolio') {
    root.innerHTML = Portfolio();
  } else if (path === '/messages') {
    root.innerHTML = MessageCenter();
  } else if (path === '/risk') {
    root.innerHTML = RiskDisclosure();
  } else if (path === '/service') {
    root.innerHTML = OnlineService();
  } else {
    root.innerHTML = Home();
    
    // 添加首页按钮事件监听
    setTimeout(() => {
      const portfolioBtn = document.getElementById('portfolio-btn');
      if (portfolioBtn) {
        portfolioBtn.addEventListener('click', () => {
          window.location.hash = '#/portfolio';
          root.innerHTML = Portfolio();
        });
      }
      
      const tradeBtn = document.getElementById('trade-btn');
      if (tradeBtn) {
        tradeBtn.addEventListener('click', () => {
          window.location.hash = '#/trade';
          root.innerHTML = Trade();
        });
      }
      
      const orderHistoryBtn = document.getElementById('order-history-btn');
      if (orderHistoryBtn) {
        orderHistoryBtn.addEventListener('click', () => {
          window.location.hash = '#/orders';
          root.innerHTML = OrderHistory();
        });
      }
      
      const messageCenterBtn = document.getElementById('message-center-btn');
      if (messageCenterBtn) {
        messageCenterBtn.addEventListener('click', () => {
          window.location.hash = '#/messages';
          root.innerHTML = MessageCenter();
        });
      }
      
      const riskDisclosureBtn = document.getElementById('risk-disclosure-btn');
      if (riskDisclosureBtn) {
        riskDisclosureBtn.addEventListener('click', () => {
          window.location.hash = '#/risk';
          root.innerHTML = RiskDisclosure();
        });
      }
      
      const onlineServiceBtn = document.getElementById('online-service-btn');
      if (onlineServiceBtn) {
        onlineServiceBtn.addEventListener('click', () => {
          window.location.hash = '#/service';
          root.innerHTML = OnlineService();
        });
      }
    }, 0);
  }
}

export async function unmount() {
  console.log('member app unmounted');
  const root = document.getElementById('member-root');
  if (root) {
    root.innerHTML = '';
  }
}