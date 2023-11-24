/** @format */
/**
 * 系统必备菜单
 * 也可写写到数据库
 * parent_id 为0  则是最外层
 */
export const sysMenus = [
  {
    menu_id: 10000,
    parent_id: 0,
    perms: 'collect',
    menu_name: '学习收藏',
    order_num: 1,
    path: '/collect',
    component: '',
    icon: 'AppstoreOutlined',
    is_frame: 1, //权限验证 0需要 1不需要 2外链
    menu_type: 0, //菜单类型（0目录 1菜单）
    visible: 0, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  },
  {
    menu_id: 10001,
    parent_id: 10000,
    perms: 'collectIndex1',
    menu_name: '收藏夹一',
    order_num: 1,
    path: 'https://juejin.cn/post/7251394142683742269',
    component: '',
    icon: 'ExportOutlined',
    is_frame: 2, //权限验证 0需要 1不需要 2外链
    menu_type: 1, //菜单类型（0目录 1菜单）
    visible: 0, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  },

]
