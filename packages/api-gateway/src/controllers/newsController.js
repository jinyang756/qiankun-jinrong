// 获取最新资讯
exports.getLatestNews = async (req, res) => {
  try {
    // 模拟资讯数据
    const news = [
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
    
    // 这里应该保存资讯源配置到数据库
    console.log('资讯源配置:', { sources, frequency, filters });
    
    res.json({ message: '资讯源配置已保存' });
  } catch (error) {
    console.error('配置资讯源失败:', error);
    res.status(500).json({ error: '配置资讯源失败' });
  }
};