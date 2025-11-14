import MemberManagement from './components/MemberManagement.js';
import InviteManagement from './components/InviteManagement.js';
import ApprovalQueue from './components/ApprovalQueue.js';

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
  } else {
    root.innerHTML = `
      <div>
        <h2>代理人端首页</h2>
        <div class="quick-links">
          <button id="members-link">会员管理</button>
          <button id="invites-link">邀请管理</button>
          <button id="approvals-link">审批队列</button>
        </div>
      </div>
    `;
  }
  
  // 添加导航事件监听
  const membersLink = document.getElementById('members-link');
  const invitesLink = document.getElementById('invites-link');
  const approvalsLink = document.getElementById('approvals-link');
  
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
}

export async function unmount() {
  console.log('agent app unmounted');
  const root = document.getElementById('agent-root');
  if (root) {
    root.innerHTML = '';
  }
}