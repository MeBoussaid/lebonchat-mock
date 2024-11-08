/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ConversationCreateFormInputValues = {
    title?: string;
    initiator?: string;
    receiver?: string;
};
export declare type ConversationCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    initiator?: ValidationFunction<string>;
    receiver?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConversationCreateFormOverridesProps = {
    ConversationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    initiator?: PrimitiveOverrideProps<TextFieldProps>;
    receiver?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConversationCreateFormProps = React.PropsWithChildren<{
    overrides?: ConversationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ConversationCreateFormInputValues) => ConversationCreateFormInputValues;
    onSuccess?: (fields: ConversationCreateFormInputValues) => void;
    onError?: (fields: ConversationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConversationCreateFormInputValues) => ConversationCreateFormInputValues;
    onValidate?: ConversationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ConversationCreateForm(props: ConversationCreateFormProps): React.ReactElement;
