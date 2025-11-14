const NodeCache = require('node-cache');
const crypto = require('crypto');

// 创建缓存实例
const newsCache = new NodeCache({ stdTTL: 300 }); // 5分钟缓存

// 模拟资讯源配置
let newsConfig = {
  sources: ['official', 'market'],
  frequency: 300, // 5分钟
  filters: {
    keywords: [],
    sources: []
  }
};

// 模拟资讯数据
const mockNewsData = [
  {
    id: 1,
    title: '市场迎来重大政策利好',
    summary: '今日证监会发布新规，将进一步优化市场环境，提升投资者信心。',
    source: '官方发布',
    publishTime: '2023-04-01 09:00',
    url: 'https://example.com/news/1'
  },
  {
    id: 2,
    title: '科技板块表现强劲',
    summary: '科技股今日集体上涨，多只个股创历史新高。',
    source: '市场观察',
    publishTime: '2023-04-01 10:30',
    url: 'https://example.com/news/2'
  }
];

// 生成缓存键
function generateCacheKey(params) {
  const keyString = JSON.stringify(params);
  return crypto.createHash('md5').update(keyString).digest('hex');
}

// 从模拟源抓取资讯
async function fetchNewsFromSource(source) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 根据源返回不同的数据
  switch(source) {
    case 'official':
      return mockNewsData;
    case 'market':
      return mockNewsData.map(item => ({
        ...item,
        id: item.id + 100,
        title: `[市场] ${item.title}`,
        source: '市场资讯'
      }));
    default:
      return [];
  }
}

// 获取最新资讯
exports.getLatestNews = async (req, res) => {
  try {
    // 生成缓存键
    const cacheKey = generateCacheKey({ 
      sources: newsConfig.sources,
      limit: req.query.limit || 20
    });
    
    // 尝试从缓存获取
    let news = newsCache.get(cacheKey);
    
    if (!news) {
      // 缓存未命中，从源抓取
      console.log('缓存未命中，从源抓取资讯');
      
      // 并行抓取所有源的资讯
      const fetchPromises = newsConfig.sources.map(source => 
        fetchNewsFromSource(source)
      );
      
      const results = await Promise.all(fetchPromises);
      
      // 合并结果并去重
      news = results.flat().filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      );
      
      // 按发布时间排序
      news.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime));
      
      // 限制数量
      const limit = parseInt(req.query.limit) || 20;
      news = news.slice(0, limit);
      
      // 存入缓存
      newsCache.set(cacheKey, news);
    } else {
      console.log('从缓存获取资讯');
    }
    
    res.json({ news });
  } catch (error) {
    console.error('获取资讯失败:', error);
    res.status(500).json({ error: '获取资讯失败' });
  }
};

// 配置资讯源
exports.configureNewsSource = async (req, res) => {
  try {
    const { sources, frequency, filters } = req.body;
    
    // 更新配置
    newsConfig = {
      sources: sources || newsConfig.sources,
      frequency: frequency || newsConfig.frequency,
      filters: filters || newsConfig.filters
    };
    
    // 更新缓存TTL
    newsCache.options.stdTTL = newsConfig.frequency;
    
    // 清除所有缓存
    newsCache.flushAll();
    
    console.log('资讯源配置已更新:', newsConfig);
    
    res.json({ 
      message: '资讯源配置已保存',
      config: newsConfig
    });
  } catch (error) {
    console.error('配置资讯源失败:', error);
    res.status(500).json({ error: '配置资讯源失败' });
  }
};

// 获取当前配置
exports.getNewsConfig = async (req, res) => {
  try {
    res.json({ config: newsConfig });
  } catch (error) {
    console.error('获取资讯配置失败:', error);
    res.status(500).json({ error: '获取资讯配置失败' });
  }
};