/**
 * Requra.Domain.Enums - Auth Related Enums
 * Using 'as const' objects to comply with 'erasableSyntaxOnly' constraint.
 */

export const UserRole = {
  Stackholder: 0,
  BussinessAnalyst: 1,
  ProjectManager: 2,
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
