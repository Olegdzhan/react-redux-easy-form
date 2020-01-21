// @flow

import type { TEasyFormHocProps } from '../decorator/TEasyFormHocProps';
import { ISetMethodsOverFieldsResult } from '../decorator/helpers/setMethodsOverFields';

export type TDecoratedFormProps = TEasyFormHocProps & ISetMethodsOverFieldsResult;
