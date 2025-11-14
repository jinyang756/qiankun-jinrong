export default function RiskDisclosure() {
  return `
    <div class="risk-disclosure">
      <h2>风险说明</h2>
      <div class="risk-content">
        <h3>免责声明</h3>
        <p>本系统为模拟交易系统，所有交易均为虚拟操作，不涉及真实资金往来。</p>
        
        <h3>风险提示</h3>
        <ul>
          <li>市场风险：投资有风险，入市需谨慎</li>
          <li>技术风险：系统可能存在延迟、中断等技术问题</li>
          <li>数据风险：行情数据仅供参考，不构成投资建议</li>
          <li>操作风险：用户操作失误可能导致损失</li>
        </ul>
        
        <h3>注意事项</h3>
        <ul>
          <li>本系统仅供学习和模拟交易使用</li>
          <li>请勿将本系统用于真实投资决策</li>
          <li>系统数据可能与真实市场存在差异</li>
          <li>过往表现不代表未来收益</li>
        </ul>
      </div>
    </div>
  `;
}