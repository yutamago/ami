import {KitsuIdTypeSchema} from "../../schemas/kitsu-id-type.schema";
import {ResourceTypesEnum} from "../../schemas/resource-types.enum";

export type KitsuFetchOneResponse<DataType extends KitsuIdTypeSchema<ResourceType>, ResourceType extends ResourceTypesEnum> = {
  data?: DataType
}
