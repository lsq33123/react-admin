/** @format */
/**
 * 系统必备菜单
 * 也可写写到数据库
 * parent_id 为0  则是最外层
 */
export const sysMenus = [
  {
    menu_id: 9000,
    parent_id: 0,
    perms: 'nav',
    menu_name: '系统导航',
    order_num: 1,
    path: '/nav',
    component: '',
    icon: 'AppstoreOutlined',
    is_frame: 0, //权限验证 0需要 1不需要 2外链
    menu_type: 0, //菜单类型（0目录 1菜单）
    visible: 0, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  },
  {
    menu_id: 9001,
    parent_id: 9000,
    perms: 'home',
    menu_name: '首页',
    order_num: 1,
    path: '/nav/home',
    component: '/sys/home',
    icon: 'HomeOutlined',
    is_frame: 0, //权限验证 0需要 1不需要 2外链
    menu_type: 1, //菜单类型（0目录 1菜单）
    visible: 0, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  },
  {
    menu_id: 9002,
    parent_id: 0,
    perms: 'my',
    menu_name: '个人中心',
    order_num: 1,
    path: '/sys/my',
    component: '/sys/my',
    icon: '',
    is_frame: 0, //权限验证 0需要 1不需要 2外链
    menu_type: 1, //菜单类型（0目录 1菜单）
    visible: 1, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  },
  {
    menu_id: 9003,
    parent_id: 0,
    perms: 'notice',
    menu_name: '消息提醒',
    order_num: 1,
    path: '/sys/notice',
    component: '/sys/notice',
    icon: '',
    is_frame: 0, //权限验证 0需要 1不需要 2外链
    menu_type: 1, //菜单类型（0目录 1菜单）
    visible: 1, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  }
]
