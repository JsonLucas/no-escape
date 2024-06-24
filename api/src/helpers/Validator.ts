import Joi from "joi";
import { IGenericObject } from "../interfaces/GenericObject";

interface IValidations<S, O>{
	validate(schema: S, payload: IGenericObject, options: O): Promise<void>
}

export class validations implements IValidations<Joi.ObjectSchema, Joi.AsyncValidationOptions> {
	async validate(schema: Joi.ObjectSchema, payload: IGenericObject, options?: Joi.AsyncValidationOptions): Promise<void>{
		try{
			await schema.validateAsync(payload, options);
		}catch(e: any) {
			console.log(e);
			throw { code: 422, error: e };
		}
	}
}