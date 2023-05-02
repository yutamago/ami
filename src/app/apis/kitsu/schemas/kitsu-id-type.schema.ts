import {ResourceTypesEnum} from "./resource-types.enum";

export type KitsuIdTypeSchema<T extends ResourceTypesEnum> = {
  /**
   * ID of the resource.
   * Example: '1'
   */
  id: string | number;

  /**
   * Type of the resource
   */
  type: T;
}
