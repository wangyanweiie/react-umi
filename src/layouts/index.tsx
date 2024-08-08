import { ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useAppData, useLocation } from 'umi';

export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();

  function handleMenuItemRender(menuItemProps, defaultDom) {
    console.log('menuItemProps', menuItemProps);
    console.log('defaultDom', defaultDom);

    if (menuItemProps.isUrl || menuItemProps.children) {
      return defaultDom;
    }

    if (menuItemProps.path && location.pathname !== menuItemProps.path) {
      return (
        <Link to={menuItemProps.path} target={menuItemProps.target}>
          {defaultDom}
        </Link>
      );
    }
    
    return defaultDom;
  }

  return (
    <ProLayout
      route={clientRoutes[0]}
      location={location}
      title="Umi x Ant Design"
      menuItemRender={(menuItemProps, defaultDom) => handleMenuItemRender(menuItemProps, defaultDom)}
    >
      <Outlet />
    </ProLayout>
  );
}