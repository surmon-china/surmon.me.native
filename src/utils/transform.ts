/**
 * Type transformer
 * @file Type 类型转换器
 * @module app/utils/transform
 * @author Surmon <https://github.com/surmon-china>
 */

export type ValueOf<T extends object> = T[keyof T]
