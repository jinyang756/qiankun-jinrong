const { approvalQueue } = require('../queues/approvalQueue');

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

// 审批通过
exports.approveOrder = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // 更新任务状态为已批准
    await approvalQueue.updateJob(jobId, {
      status: 'approved'
    });
    
    res.json({ message: '订单已批准' });
  } catch (error) {
    console.error('审批订单失败:', error);
    res.status(500).json({ error: '审批订单失败' });
  }
};

// 拒绝订单
exports.rejectOrder = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { reason } = req.body;
    
    // 更新任务状态为已拒绝
    await approvalQueue.updateJob(jobId, {
      status: 'rejected',
      rejectionReason: reason
    });
    
    res.json({ message: '订单已拒绝' });
  } catch (error) {
    console.error('拒绝订单失败:', error);
    res.status(500).json({ error: '拒绝订单失败' });
  }
};