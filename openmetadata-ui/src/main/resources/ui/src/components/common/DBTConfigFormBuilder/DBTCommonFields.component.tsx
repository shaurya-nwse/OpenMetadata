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

import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldProp, FieldTypes, generateFormFields } from 'utils/formUtils';

interface Props {
  dbtClassificationName: string | undefined;
  descriptionId: string;
  handleUpdateDBTClassification: (value: string) => void;
  dbtUpdateDescriptions: boolean;
  handleUpdateDescriptions: (value: boolean) => void;
  enableDebugLog: boolean;
  handleEnableDebugLogCheck: (value: boolean) => void;
  includeTags: boolean;
  handleIncludeTagsClick: (value: boolean) => void;
}

function DBTCommonFields({
  descriptionId,
  dbtUpdateDescriptions,
  dbtClassificationName,
  handleUpdateDescriptions,
  handleUpdateDBTClassification,
  handleEnableDebugLogCheck,
  enableDebugLog,
  includeTags,
  handleIncludeTagsClick,
}: Props) {
  const { t } = useTranslation();

  const commonFields: FieldProp[] = [
    {
      name: 'loggerLevel',
      label: t('label.enable-debug-log'),
      type: FieldTypes.SWITCH,
      required: false,
      props: {
        checked: enableDebugLog,
        onChange: handleEnableDebugLogCheck,
        'data-testid': 'toggle-button-enable-debug-log',
      },
      id: 'root/loggerLevel',
      hasSeparator: true,
      helperText: t('message.enable-debug-logging'),
    },
    {
      name: 'dbtUpdateDescriptions',
      label: t('label.update-description'),
      type: FieldTypes.SWITCH,
      required: false,
      props: {
        checked: dbtUpdateDescriptions,
        onChange: handleUpdateDescriptions,
        'data-testid': descriptionId,
      },
      id: 'root/dbtUpdateDescriptions',
      hasSeparator: true,
      helperText: t('message.optional-configuration-update-description-dbt'),
    },
    {
      name: 'includeTags',
      label: t('label.include-entity', { entity: t('label.tag-plural') }),
      type: FieldTypes.SWITCH,
      required: false,
      props: {
        checked: includeTags,
        onChange: handleIncludeTagsClick,
        'data-testid': 'toggle-button-include-tags',
      },
      id: 'root/includeTags',
      hasSeparator: true,
      helperText: t('message.include-assets-message'),
    },
    {
      name: 'dbtClassificationName',
      label: t('label.dbt-classification-name'),
      type: FieldTypes.TEXT,
      required: false,
      props: {
        value: dbtClassificationName,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleUpdateDBTClassification(e.target.value),
        'data-testid': 'dbt-classification-name',
      },
      id: 'root/dbtClassificationName',
      helperText: t('message.custom-classification-name-dbt-tags'),
      hasSeparator: true,
    },
  ];

  return <Fragment>{generateFormFields(commonFields)}</Fragment>;
}

export default DBTCommonFields;
