/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { ELASTIC_SEARCH_RE_INDEX_PAGE_TABS } from 'enums/ElasticSearch.enum';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalSettingOptions } from '../../constants/GlobalSettings.constants';
import { TeamType } from '../../generated/entity/teams/team';
import { useAuth } from '../../hooks/authHooks';
import {
  getGlobalSettingMenuItem,
  getGlobalSettingsMenuWithPermission,
  MenuList,
} from '../../utils/GlobalSettingsUtils';
import {
  getSettingPath,
  getSettingsPathWithFqn,
  getTeamsWithFqnPath,
} from '../../utils/RouterUtils';
import ErrorPlaceHolder from '../common/error-with-placeholder/ErrorPlaceHolder';
import LeftPanelCard from '../common/LeftPanelCard/LeftPanelCard';
import { usePermissionProvider } from '../PermissionProvider/PermissionProvider';

const GlobalSettingLeftPanel = () => {
  const history = useHistory();
  const { tab, settingCategory } = useParams<{ [key: string]: string }>();

  const { permissions } = usePermissionProvider();

  const { isAdminUser } = useAuth();

  const menuItems: ItemType[] = useMemo(
    () =>
      getGlobalSettingsMenuWithPermission(permissions, isAdminUser).reduce(
        (acc: ItemType[], curr: MenuList) => {
          const menuItem = getGlobalSettingMenuItem({
            label: curr.category,
            key: curr.key,
            category: curr.category,
            children: curr.items,
            type: 'group',
            isBeta: curr.isBeta,
          });
          if (menuItem.children?.length) {
            return [...acc, menuItem];
          } else {
            return acc;
          }
        },
        [] as ItemType[]
      ),
    [permissions]
  );

  const onClick: MenuProps['onClick'] = (e) => {
    // As we are setting key as "category.option" and extracting here category and option
    const [category, option] = e.key.split('.');

    switch (option) {
      case GlobalSettingOptions.TEAMS:
        history.push(getTeamsWithFqnPath(TeamType.Organization));

        break;
      case GlobalSettingOptions.SEARCH:
        history.push(
          getSettingsPathWithFqn(
            category,
            option,
            ELASTIC_SEARCH_RE_INDEX_PAGE_TABS.ON_DEMAND
          )
        );

        break;
      default:
        history.push(getSettingPath(category, option));

        break;
    }
  };

  return menuItems.length ? (
    <LeftPanelCard id="settings">
      <Menu
        className="custom-menu"
        data-testid="global-setting-left-panel"
        items={menuItems}
        mode="inline"
        selectedKeys={[`${settingCategory}.${tab}`]}
        onClick={onClick}
      />
    </LeftPanelCard>
  ) : (
    <ErrorPlaceHolder />
  );
};

export default GlobalSettingLeftPanel;
