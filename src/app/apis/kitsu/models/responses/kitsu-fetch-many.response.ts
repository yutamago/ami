import {KitsuIdTypeSchema} from "../../schemas/kitsu-id-type.schema";
import {ResourceTypesEnum} from "../../schemas/resource-types.enum";

export type KitsuFetchManyResponse<DataType extends KitsuIdTypeSchema<ResourceType>, ResourceType extends ResourceTypesEnum> = {
  data: DataType[],
  included?: KitsuIdTypeSchema<ResourceTypesEnum>[],
  meta: {
    count: number
  },
  links?: {
    first?: string,
    prev?: string,
    next?: string,
    last?: string,
  },
}
