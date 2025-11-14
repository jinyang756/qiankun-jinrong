// 主题可视化编辑器核心功能
class ThemeEditor {
  constructor() {
    this.themes = new Map();
    this.defaultTheme = {
      version: "1.0.0",
      brand: {
        primary: "#1E3A5F",
        secondary: "#4A90E2",
        success: "#52C41A",
        danger: "#F5222D",
        textPrimary: "#FFFFFF",
        textSecondary: "#B8BCC8",
        bgPrimary: "#0A0E1A",
        bgSecondary: "#141824",
        border: "#2B3245"
      },
      shape: {
        radius: 12,
        shadow: "0 8px 30px rgba(0,0,0,.25)"
      },
      typography: {
        fontFamily: "system-ui, PingFang SC, sans-serif",
        scale: 1.0
      }
    };
    
    // 初始化默认主题
    this.themes.set('default', this.defaultTheme);
  }

  // 获取指定租户的主题
  getTheme(tenantId = 'default') {
    return this.themes.get(tenantId) || this.defaultTheme;
  }

  // 为租户创建新主题
  createTenantTheme(tenantId, themeData = {}) {
    const newTheme = {
      ...this.defaultTheme,
      ...themeData,
      version: themeData.version || "1.0.0",
      tenantId
    };
    
    this.themes.set(tenantId, newTheme);
    return newTheme;
  }

  // 更新租户主题
  updateTenantTheme(tenantId, updates) {
    const currentTheme = this.themes.get(tenantId) || this.defaultTheme;
    const updatedTheme = {
      ...currentTheme,
      ...updates,
      tenantId
    };
    
    this.themes.set(tenantId, updatedTheme);
    return updatedTheme;
  }

  // 更新主题颜色
  updateColor(tenantId, key, value) {
    const theme = this.themes.get(tenantId) || this.defaultTheme;
    if (theme.brand.hasOwnProperty(key)) {
      const updatedTheme = {
        ...theme,
        brand: {
          ...theme.brand,
          [key]: value
        }
      };
      
      this.themes.set(tenantId, updatedTheme);
      return true;
    }
    return false;
  }

  // 更新形状属性
  updateShape(tenantId, key, value) {
    const theme = this.themes.get(tenantId) || this.defaultTheme;
    if (theme.shape.hasOwnProperty(key)) {
      const updatedTheme = {
        ...theme,
        shape: {
          ...theme.shape,
          [key]: value
        }
      };
      
      this.themes.set(tenantId, updatedTheme);
      return true;
    }
    return false;
  }

  // 更新排版属性
  updateTypography(tenantId, key, value) {
    const theme = this.themes.get(tenantId) || this.defaultTheme;
    if (theme.typography.hasOwnProperty(key)) {
      const updatedTheme = {
        ...theme,
        typography: {
          ...theme.typography,
          [key]: value
        }
      };
      
      this.themes.set(tenantId, updatedTheme);
      return true;
    }
    return false;
  }

  // 预览主题
  previewTheme(tenantId = 'default') {
    const theme = this.themes.get(tenantId) || this.defaultTheme;
    // 在实际应用中，这里会将主题应用到页面元素
    console.log(`预览租户${tenantId}的主题:`, theme);
    return theme;
  }

  // 保存主题
  saveTheme(tenantId = 'default') {
    const theme = this.themes.get(tenantId) || this.defaultTheme;
    // 在实际应用中，这里会将主题保存到数据库或配置中心
    console.log(`保存租户${tenantId}的主题:`, theme);
    return {
      success: true,
      tenantId,
      version: theme.version,
      timestamp: new Date().toISOString()
    };
  }

  // 加载主题
  loadTheme(tenantId, themeData) {
    if (themeData) {
      this.themes.set(tenantId, { ...this.defaultTheme, ...themeData, tenantId });
      return true;
    }
    return false;
  }
  
  // 获取所有租户主题
  getAllThemes() {
    return Array.from(this.themes.entries()).map(([tenantId, theme]) => ({
      tenantId,
      ...theme
    }));
  }
}

module.exports = ThemeEditor;