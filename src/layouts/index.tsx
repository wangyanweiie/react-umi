import { ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useAppData, useLocation, useMatch, useParams, useSearchParams } from 'umi';

export default function Layout() {
  const { clientRoutes } = useAppData();
  
  const location = useLocation();
  const match = useMatch(location.pathname);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  console.log('location 信息', location);
  console.log('match 信息', match);
  console.log('query 信息', searchParams);
  console.log('路由动态参数', params);

  function handleMenuItemRender(menuItemProps: any, defaultDom: any) {
    // console.log('menuItemProps', menuItemProps);
    // console.log('defaultDom', defaultDom);

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