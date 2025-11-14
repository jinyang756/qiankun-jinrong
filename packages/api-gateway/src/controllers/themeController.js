const ThemeEditor = require('engine-core/src/themeEditor.js');

// 创建主题编辑器实例
const themeEditor = new ThemeEditor();

// 获取指定租户的主题
exports.getTheme = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const theme = themeEditor.getTheme(tenantId);
    
    res.json({ theme });
  } catch (error) {
    console.error('获取主题失败:', error);
    res.status(500).json({ error: '获取主题失败' });
  }
};

// 为租户创建新主题
exports.createTenantTheme = async (req, res) => {
  try {
    const { tenantId, themeData } = req.body;
    
    if (!tenantId) {
      return res.status(400).json({ error: '租户ID不能为空' });
    }
    
    const theme = themeEditor.createTenantTheme(tenantId, themeData);
    
    res.json({ 
      message: `租户${tenantId}的主题已创建`,
      theme
    });
  } catch (error) {
    console.error('创建租户主题失败:', error);
    res.status(500).json({ error: '创建租户主题失败' });
  }
};

// 更新租户主题
exports.updateTenantTheme = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const updates = req.body;
    
    if (!tenantId) {
      return res.status(400).json({ error: '租户ID不能为空' });
    }
    
    const theme = themeEditor.updateTenantTheme(tenantId, updates);
    
    res.json({ 
      message: `租户${tenantId}的主题已更新`,
      theme
    });
  } catch (error) {
    console.error('更新租户主题失败:', error);
    res.status(500).json({ error: '更新租户主题失败' });
  }
};

// 更新主题颜色
exports.updateThemeColor = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { key, value } = req.body;
    
    if (!tenantId || !key || !value) {
      return res.status(400).json({ error: '租户ID、键和值都不能为空' });
    }
    
    const success = themeEditor.updateColor(tenantId, key, value);
    
    if (success) {
      res.json({ message: `租户${tenantId}的主题颜色已更新` });
    } else {
      res.status(400).json({ error: '无效的颜色键' });
    }
  } catch (error) {
    console.error('更新主题颜色失败:', error);
    res.status(500).json({ error: '更新主题颜色失败' });
  }
};

// 预览主题
exports.previewTheme = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const theme = themeEditor.previewTheme(tenantId);
    
    res.json({ theme });
  } catch (error) {
    console.error('预览主题失败:', error);
    res.status(500).json({ error: '预览主题失败' });
  }
};

// 保存主题
exports.saveTheme = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const result = themeEditor.saveTheme(tenantId);
    
    res.json(result);
  } catch (error) {
    console.error('保存主题失败:', error);
    res.status(500).json({ error: '保存主题失败' });
  }
};

// 获取所有租户主题
exports.getAllThemes = async (req, res) => {
  try {
    const themes = themeEditor.getAllThemes();
    
    res.json({ themes });
  } catch (error) {
    console.error('获取所有主题失败:', error);
    res.status(500).json({ error: '获取所有主题失败' });
  }
};