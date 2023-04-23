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

import React, { useMemo } from 'react';
import { ERROR_PLACEHOLDER_TYPE, SIZE } from '../../../enums/common.enum';

import AssignErrorPlaceHolder from './AssignErrorPlaceHolder';
import CreateErrorPlaceHolder from './CreateErrorPlaceHolder';
import CustomNoDataPlaceHolder from './CustomNoDataPlaceHolder';
import FilterErrorPlaceHolder from './FilterErrorPlaceHolder';
import NoDataPlaceholder from './NoDataPlaceholder';
import PermissionErrorPlaceholder from './PermissionErrorPlaceholder';
import { ErrorPlaceholderProps } from './placeholder.interface';

const ErrorPlaceHolder = ({
  doc,
  onClick,
  type,
  children,
  heading,
  className,
  size = SIZE.LARGE,
  button,
  permission,
}: ErrorPlaceholderProps) => {
  const errorPlaceHolder = useMemo(() => {
    switch (type) {
      case ERROR_PLACEHOLDER_TYPE.CREATE:
        return (
          <CreateErrorPlaceHolder
            className={className}
            doc={doc}
            heading={heading}
            permission={permission}
            size={size}
            onClick={onClick}
          />
        );

      case ERROR_PLACEHOLDER_TYPE.ASSIGN:
        return (
          <AssignErrorPlaceHolder
            button={button}
            className={className}
            heading={heading}
            permission={permission}
            size={size}
          />
        );

      case ERROR_PLACEHOLDER_TYPE.FILTER:
        return (
          <FilterErrorPlaceHolder className={className} doc={doc} size={size} />
        );

      case ERROR_PLACEHOLDER_TYPE.PERMISSION:
        return <PermissionErrorPlaceholder className={className} size={size} />;

      case ERROR_PLACEHOLDER_TYPE.CUSTOM:
        return (
          <CustomNoDataPlaceHolder className={className} size={size}>
            {children}
          </CustomNoDataPlaceHolder>
        );

      default:
        return (
          <NoDataPlaceholder className={className} size={size}>
            {children}
          </NoDataPlaceholder>
        );
    }
  }, [type]);

  return errorPlaceHolder;
};

export default ErrorPlaceHolder;
