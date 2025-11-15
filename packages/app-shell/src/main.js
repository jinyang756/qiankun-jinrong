import { registerMicroApps, start } from 'qiankun';

// 基础props
const baseProps = {
  endpoints: {
    api: '//localhost:3000/api',
    ws: '//localhost:3000/ws'
  },
  featureFlags: {
    enableManualApproval: true,
    enablePointsTrading: true
  }
};

// 注册子应用
registerMicroApps([
  {
    name: 'member',
    entry: '//localhost:8081',
    container: '#app-member',
    activeRule: '/member',
    props: baseProps
  },
  {
    name: 'agent',
    entry: '//localhost:8082',
    container: '#app-agent',
    activeRule: '/agent',
    props: baseProps
  },
  {
    name: 'admin',
    entry: '//localhost:8083',
    container: '#app-admin',
    activeRule: '/admin',
    props: baseProps
  }
]);

// 启动qiankun
start({
  sandbox: {
    strictStyleIsolation: true,
    experimentalStyleIsolation: true
  },
  prefetch: 'all'
});