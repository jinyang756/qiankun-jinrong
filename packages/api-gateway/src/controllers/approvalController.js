const { approvalQueue } = require('../queues/approvalQueue');

// 引入监控模块
const monitoring = require('../middleware/monitoring');

// 创建审批任务
exports.createApprovalTask = async (req, res) => {
  try {
    const { orderId, orderDetails } = req.body;
    
    // 将审批任务添加到队列
    const job = await approvalQueue.add('approval', {
      orderId,
      orderDetails
    });
    
    res.json({ 
      message: '审批任务已创建', 
      jobId: job.id 
    });
  } catch (error) {
    console.error('创建审批任务失败:', error);
    res.status(500).json({ error: '创建审批任务失败' });
  }
};

// 获取待审批订单列表
exports.getPendingApprovals = async (req, res) => {
  try {
    // 从队列中获取待处理的任务
    const jobs = await approvalQueue.getJobs(['waiting', 'active']);
    
    const pendingApprovals = jobs.map(job => ({
      id: job.id,
      orderId: job.data.orderId,
      orderDetails: job.data.orderDetails,
      createdAt: job.timestamp
    }));
    
    res.json({ pendingApprovals });
  } catch (error) {
    console.error('获取待审批订单失败:', error);
    res.status(500).json({ error: '获取待审批订单失败' });
  }
};

// 批准订单
exports.approveOrder = async (req, res) => {
  const start = Date.now();
  
  try {
    const { jobId } = req.params;
    
    // 更新任务状态为已批准
    await approvalQueue.updateJob(jobId, {
      status: 'approved'
    });
    
    // 记录订单处理指标
    const duration = (Date.now() - start) / 1000;
    monitoring.recordOrderMetrics('approval', 'approved', duration);
    
    res.json({ message: '订单已批准', order: updatedOrder });
  } catch (error) {
    console.error('批准订单失败:', error);
    monitoring.recordSystemError('approval_error', 'approval_service');
    res.status(500).json({ error: '批准订单失败' });
  }
};

// 拒绝订单
exports.rejectOrder = async (req, res) => {
  const start = Date.now();
  
  try {
    const { jobId } = req.params;
    const { reason } = req.body;
    
    // 更新任务状态为已拒绝
    await approvalQueue.updateJob(jobId, {
      status: 'rejected',
      rejectionReason: reason
    });
    
    // 记录订单处理指标
    const duration = (Date.now() - start) / 1000;
    monitoring.recordOrderMetrics('approval', 'rejected', duration);
    
    res.json({ message: '订单已拒绝', order: updatedOrder });
  } catch (error) {
    console.error('拒绝订单失败:', error);
    monitoring.recordSystemError('rejection_error', 'approval_service');
    res.status(500).json({ error: '拒绝订单失败' });
  }
};

// 获取待审批订单队列
exports.getApprovalQueue = async (req, res) => {
  try {
    // 从队列中获取所有任务
    const jobs = await approvalQueue.getJobs(['waiting', 'active']);
    
    const orders = jobs.map(job => ({
      id: job.id,
      orderId: job.data.orderId,
      orderDetails: job.data.orderDetails,
      createdAt: job.timestamp
    }));
    
    // 更新审批队列长度指标
    monitoring.updateApprovalQueueLength(orders.length);
    
    res.json({ orders });
  } catch (error) {
    console.error('获取审批队列失败:', error);
    monitoring.recordSystemError('queue_error', 'approval_service');
    res.status(500).json({ error: '获取审批队列失败' });
  }
};