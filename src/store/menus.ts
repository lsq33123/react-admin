/** @format */
/**
 * 系统必备菜单
 * 也可写写到数据库
 */
export const sysMenus = [
  {
    id: 9000,
    parent_id: 0,
    code: 'nav',
    name: '系统导航',
    sort: 1,
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
    id: 9001,
    parent_id: 9000,
    code: 'home',
    name: '首页',
    sort: 1,
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
    id: 9002,
    parent_id: 0,
    code: 'my',
    name: '个人中心',
    sort: 1,
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
    id: 9002,
    parent_id: 0,
    code: 'notice',
    name: '消息提醒',
    sort: 1,
    path: '/sys/notice',
    component: '/sys/notice',
    icon: '',
    is_frame: 0, //权限验证 0需要 1不需要 2外链
    menu_type: 1, //菜单类型（0目录 1菜单）
    visible: 1, //菜单状态（0显示 1隐藏）
    status: 0, //菜单状态（0正常 1停用）
    remark: '',
  },
]
