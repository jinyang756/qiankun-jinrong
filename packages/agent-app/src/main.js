import MemberManagement from './components/MemberManagement.js';
import InviteManagement from './components/InviteManagement.js';
import ApprovalQueue from './components/ApprovalQueue.js';
import Dashboard from './components/Dashboard.js';
import Reports from './components/Reports.js';

// 子应用生命周期函数
let app = null;

export async function bootstrap() {
  console.log('agent app bootstraped');
}

export async function mount(props) {
  console.log('agent app mounted', props);
  const { token, endpoints, featureFlags, theme } = props;
  
  // 在这里渲染代理人端应用
  const root = document.getElementById('agent-root');
  
  // 简单的路由判断
  const path = window.location.hash.slice(1);
  
  if (path === '/members') {
    root.innerHTML = MemberManagement();
  } else if (path === '/invites') {
    root.innerHTML = InviteManagement();
  } else if (path === '/approvals') {
    root.innerHTML = ApprovalQueue();
  } else if (path === '/dashboard') {
    root.innerHTML = Dashboard();
    
    // 添加仪表板事件监听
    const dateRangeSelect = document.getElementById('date-range');
    const exportDashboardBtn = document.getElementById('export-dashboard');
    const refreshDashboardBtn = document.getElementById('refresh-dashboard');
    
    if (dateRangeSelect) {
      dateRangeSelect.addEventListener('change', () => {
        // 这里应该调用API获取相应时间范围的数据
        console.log('时间范围改变:', dateRangeSelect.value);
        updateDashboardData(dateRangeSelect.value);
      });
    }
    
    if (exportDashboardBtn) {
      exportDashboardBtn.addEventListener('click', () => {
        // 这里应该导出数据
        console.log('导出数据');
        alert('数据已导出');
      });
    }
    
    if (refreshDashboardBtn) {
      refreshDashboardBtn.addEventListener('click', () => {
        // 这里应该刷新数据
        console.log('刷新数据');
        updateDashboardData(dateRangeSelect.value);
        alert('数据已刷新');
      });
    }
    
    // 更新仪表板数据函数
    function updateDashboardData(dateRange) {
      // 模拟数据更新
      console.log('更新仪表板数据:', dateRange);
      
      // 根据时间范围更新统计数据
      const data = getDashboardData(dateRange);
      
      // 更新DOM元素
      document.getElementById('total-members').textContent = data.totalMembers;
      document.getElementById('new-members').textContent = data.newMembers;
      document.getElementById('active-members').textContent = data.activeMembers;
      document.getElementById('today-orders').textContent = data.todayOrders;
      document.getElementById('pending-approvals').textContent = data.pendingApprovals;
      document.getElementById('trade-value').textContent = data.tradeValue;
      document.getElementById('sent-invites').textContent = data.sentInvites;
      document.getElementById('used-invites').textContent = data.usedInvites;
      document.getElementById('invite-rate').textContent = data.inviteRate;
    }
    
    // 获取仪表板数据函数
    function getDashboardData(dateRange) {
      // 模拟不同时间范围的数据
      const data = {
        today: {
          totalMembers: 125,
          newMembers: 2,
          activeMembers: 89,
          todayOrders: 24,
          pendingApprovals: 8,
          tradeValue: '¥125,000',
          sentInvites: 86,
          usedInvites: 42,
          inviteRate: '48.8%'
        },
        week: {
          totalMembers: 125,
          newMembers: 12,
          activeMembers: 89,
          todayOrders: 168,
          pendingApprovals: 8,
          tradeValue: '¥875,000',
          sentInvites: 86,
          usedInvites: 42,
          inviteRate: '48.8%'
        },
        month: {
          totalMembers: 125,
          newMembers: 12,
          activeMembers: 89,
          todayOrders: 24,
          pendingApprovals: 8,
          tradeValue: '¥1,250,000',
          sentInvites: 86,
          usedInvites: 42,
          inviteRate: '48.8%'
        },
        quarter: {
          totalMembers: 125,
          newMembers: 36,
          activeMembers: 89,
          todayOrders: 756,
          pendingApprovals: 8,
          tradeValue: '¥3,750,000',
          sentInvites: 86,
          usedInvites: 42,
          inviteRate: '48.8%'
        },
        year: {
          totalMembers: 125,
          newMembers: 144,
          activeMembers: 89,
          todayOrders: 2920,
          pendingApprovals: 8,
          tradeValue: '¥15,000,000',
          sentInvites: 86,
          usedInvites: 42,
          inviteRate: '48.8%'
        }
      };
      
      return data[dateRange] || data.month;
    }
  } else if (path === '/reports') {
    root.innerHTML = Reports();
  } else {
    root.innerHTML = `
      <div>
        <h2>代理人端首页</h2>
        <div class="quick-links">
          <button id="dashboard-link">数据看板</button>
          <button id="members-link">会员管理</button>
          <button id="invites-link">邀请管理</button>
          <button id="approvals-link">审批队列</button>
          <button id="reports-link">报表导出</button>
        </div>
      </div>
    `;
  }
  
  // 添加导航事件监听
  const dashboardLink = document.getElementById('dashboard-link');
  const membersLink = document.getElementById('members-link');
  const invitesLink = document.getElementById('invites-link');
  const approvalsLink = document.getElementById('approvals-link');
  const reportsLink = document.getElementById('reports-link');
  
  if (dashboardLink) {
    dashboardLink.addEventListener('click', () => {
      window.location.hash = '#/dashboard';
      mount(props);
    });
  }
  
  if (membersLink) {
    membersLink.addEventListener('click', () => {
      window.location.hash = '#/members';
      mount(props);
    });
  }
  
  if (invitesLink) {
    invitesLink.addEventListener('click', () => {
      window.location.hash = '#/invites';
      mount(props);
    });
  }
  
  if (approvalsLink) {
    approvalsLink.addEventListener('click', () => {
      window.location.hash = '#/approvals';
      mount(props);
    });
  }
  
  if (reportsLink) {
    reportsLink.addEventListener('click', () => {
      window.location.hash = '#/reports';
      mount(props);
    });
  }
  
  // 添加邀请表单事件监听
  const inviteForm = document.getElementById('invite-form');
  if (inviteForm) {
    inviteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 这里应该调用生成邀请码API
      console.log('生成邀请码提交');
    });
  }
  
  // 添加审批按钮事件监听
  const approveButtons = document.querySelectorAll('.approve-btn');
  const rejectButtons = document.querySelectorAll('.reject-btn');
  
  approveButtons.forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.getAttribute('data-order');
      // 这里应该调用批准订单API
      console.log('批准订单:', orderId);
    });
  });
  
  rejectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.getAttribute('data-order');
      // 这里应该调用拒绝订单API
      console.log('拒绝订单:', orderId);
    });
  });
  
  // 添加报表事件监听
  const generateReportBtn = document.getElementById('generate-report');
  const exportReportBtn = document.getElementById('export-report');
  
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', () => {
      // 这里应该调用生成报表API
      console.log('生成报表');
    });
  }
  
  if (exportReportBtn) {
    exportReportBtn.addEventListener('click', () => {
      // 这里应该调用导出报表API
      console.log('导出报表');
    });
  }
}

export async function unmount() {
  console.log('agent app unmounted');
  const root = document.getElementById('agent-root');
  if (root) {
    root.innerHTML = '';
  }
}