/**
 * Form helper utilities for handling nullable fields in React Hook Form
 */

import type { ControllerRenderProps } from "react-hook-form";

/**
 * Normalizes a nullable string field value to always return a string for input components
 * Converts null/undefined to empty string
 */
export function normalizeStringValue(value: string | null | undefined): string {
  return value ?? "";
}

/**
 * Wraps a React Hook Form field to ensure string values for input components
 * Use this when spreading field props to Input/Textarea components with nullable fields
 */
export function normalizeNullableField<T extends Record<string, any>>(
  field: ControllerRenderProps<T, any>
) {
  return {
    ...field,
    value: normalizeStringValue(field.value),
  };
}

/**
 * Transforms form data before submission by converting empty strings to null
 * for fields that should be nullable in the database
 */
export function prepareFormData<T extends Record<string, any>>(
  data: T,
  nullableFields: (keyof T)[]
): T {
  const prepared = { ...data };
  
  for (const field of nullableFields) {
    if (prepared[field] === "") {
      prepared[field] = null as any;
    }
  }
  
  return prepared;
}
