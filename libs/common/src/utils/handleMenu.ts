import { Menu } from '../../../../apps/admin/src/menu/entities/menu.entity';

// 把平铺的菜单处理成树形结构
export const handleMenuToTree = (menu: Menu[]) => {
  const map = {};
  const roots = [];

  // 将所有项存储在一个哈希表中
  menu.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // 构建树
  menu.forEach((item) => {
    const treeItem = map[item.id];
    if (item.parentId === null) {
      // 如果是根节点
      roots.push(treeItem);
    } else {
      // 否则找到它的父节点，并把它加到父节点的children中
      if (map[item.parentId]) {
        map[item.parentId].children.push(treeItem);
      }
    }
  });

  return roots;
};
