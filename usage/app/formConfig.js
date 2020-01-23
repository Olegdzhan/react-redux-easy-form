// @flow

import type {
    TEasyFormConfig,
    TEasyFormHocValuesField,
    TEasyFormHocFormErrors,
} from 'lib';
import { FormsMap } from './constants';
import type { TUsageProps } from './TUsageProps';

const formConfig: TEasyFormConfig = {
    formName: FormsMap.TEST_FORM_1,
    fields: {
        firstName: {
            initialValue: ({ response }: TUsageProps): string => response.firstName,
            validateOnChange: true,
            validator: (val: string = ''): string | null => {
                const trimmed = val.trim();
                if (trimmed) {
                    return /^[-\sA-Za-zА-Яа-я]+$/.test(trimmed)
                        ? null
                        : 'First name couldn\'t contain numbers or symbols';
                }
                return 'First name must be set.';
            },
        },
        lastName: {
            initialValue: '',
            validator: (val: string = ''): string | null => {
                if (val.trim()) {
                    return null;
                }
                return 'Second name is required';
            },
        },
    },
    formValidator: ({ firstName, secondName }: TEasyFormHocValuesField): TEasyFormHocFormErrors => {
        const result: string[] = [];
        if (firstName && secondName && firstName === secondName) {
            result.push('First name must not be equal to Second name');
        }
        return result;
    }
};

export default formConfig;