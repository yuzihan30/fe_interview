1. echars使用注意事项
初始化，定义配置项，设置配置项；更新时需要重新设置配置项，有需要的话updateStyle; 使用resize方法，可以看到拖拽的时候和容器一起变大；distroy的时候要及时调用echarts的方法及时销毁，this.echart && this.echart.dispose && this.echart.dispose() 用于释放echart图标实例 释放后图表不再可用；
自己写vue组件的时候，组件内挂载的公用数据（不是响应式数据）会不会被销毁？
