// @flow

import type { TEasyFormHocProps } from '../decorator/TEasyFormHocProps';
import { ISetMethodsOverFieldsResult } from './private/ISetMethodsOverFieldsResult';

export type TDecoratedFormProps = TEasyFormHocProps & ISetMethodsOverFieldsResult;
