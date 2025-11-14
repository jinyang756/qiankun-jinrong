const { Queue, Worker } = require('bullmq');
const redisClient = require('../config/redis');

// 创建审批队列
const approvalQueue = new Queue('approval', {
  connection: redisClient
});

// 创建审批工作进程
const approvalWorker = new Worker('approval', async (job) => {
  // 处理审批任务
  console.log('处理审批任务:', job.data);
  
  // 模拟审批处理
  // 实际应用中这里会调用相应的业务逻辑
  return { status: 'processed', orderId: job.data.orderId };
}, {
  connection: redisClient
});

module.exports = {
  approvalQueue,
  approvalWorker
};