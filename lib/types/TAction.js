// @flow

export type TAction<T> = {
    type: string;
    payload?: T;
};
