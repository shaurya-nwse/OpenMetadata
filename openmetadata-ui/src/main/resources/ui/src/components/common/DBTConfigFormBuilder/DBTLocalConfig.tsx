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

import { Button, Divider, Space } from 'antd';
import { ModifiedDbtConfig } from 'components/AddIngestion/addIngestion.interface';
import {
  DBTBucketDetails,
  SCredentials,
} from 'generated/metadataIngestion/dbtPipeline';
import { t } from 'i18next';
import React, { Fragment, FunctionComponent } from 'react';
import { FieldProp, FieldTypes, generateFormFields } from 'utils/formUtils';
import DBTCommonFields from './DBTCommonFields.component';
import { DbtConfigLocal, DBTFormCommonProps } from './DBTConfigForm.interface';

interface Props extends DBTFormCommonProps, DbtConfigLocal {
  enableDebugLog: boolean;
  handleEnableDebugLogCheck: (value: boolean) => void;
  onConfigUpdate: (
    key: keyof ModifiedDbtConfig,
    val?: string | boolean | SCredentials | DBTBucketDetails
  ) => void;
}

export const DBTLocalConfig: FunctionComponent<Props> = ({
  dbtCatalogFilePath = '',
  dbtManifestFilePath = '',
  dbtRunResultsFilePath = '',
  dbtUpdateDescriptions = false,
  includeTags = true,
  okText,
  cancelText,
  onCancel,
  onSubmit,
  dbtClassificationName,
  enableDebugLog,
  handleEnableDebugLogCheck,

  onConfigUpdate,
}: Props) => {
  const handleSubmit = () => {
    const submitData = {
      dbtCatalogFilePath,
      dbtManifestFilePath,
      dbtRunResultsFilePath,
      dbtUpdateDescriptions,
      dbtClassificationName,
      includeTags,
    };

    onSubmit(submitData);
  };

  const localConfigFields: FieldProp[] = [
    {
      name: 'dbtCatalogFilePath',
      label: t('label.dbt-catalog-file-path'),
      type: FieldTypes.TEXT,
      required: false,
      props: {
        value: dbtCatalogFilePath,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          onConfigUpdate('dbtCatalogFilePath', e.target.value),
        'data-testid': 'catalog-file',
      },
      id: 'root/dbtCatalogFilePath',
      helperText: t('message.dbt-catalog-file-extract-path'),
    },
    {
      name: 'dbtManifestFilePath',
      label: t('label.dbt-manifest-file-path'),
      type: FieldTypes.TEXT,
      required: true,
      props: {
        value: dbtManifestFilePath,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          onConfigUpdate('dbtManifestFilePath', e.target.value),
        'data-testid': 'manifest-file',
      },
      id: 'root/dbtManifestFilePath',
      helperText: t('message.dbt-manifest-file-path'),
    },
    {
      name: 'dbtRunResultsFilePath',
      label: t('label.dbt-run-result-file-path'),
      type: FieldTypes.TEXT,
      required: false,
      props: {
        value: dbtRunResultsFilePath,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          onConfigUpdate('dbtRunResultsFilePath', e.target.value),
        'data-testid': 'run-result-file',
      },
      id: 'root/dbtRunResultsFilePath',
      helperText: t('message.dbt-result-file-path'),
      hasSeparator: true,
    },
  ];

  return (
    <Fragment>
      {generateFormFields(localConfigFields)}
      <DBTCommonFields
        dbtClassificationName={dbtClassificationName}
        dbtUpdateDescriptions={dbtUpdateDescriptions}
        descriptionId="local-update-description"
        enableDebugLog={enableDebugLog}
        handleEnableDebugLogCheck={handleEnableDebugLogCheck}
        includeTags={includeTags}
        onConfigUpdate={onConfigUpdate}
      />

      <Divider />

      <Space className="w-full justify-end">
        <Button
          className="m-r-xs"
          data-testid="back-button"
          type="link"
          onClick={onCancel}>
          {cancelText}
        </Button>

        <Button
          className="font-medium p-x-md p-y-xxs h-auto rounded-6"
          data-testid="submit-btn"
          htmlType="submit"
          type="primary"
          onClick={handleSubmit}>
          {okText}
        </Button>
      </Space>
    </Fragment>
  );
};
