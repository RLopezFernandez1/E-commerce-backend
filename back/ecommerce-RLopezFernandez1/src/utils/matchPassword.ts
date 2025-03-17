import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint(
    { name: 'matchPassword', async: false }
)
export class MatchPassword implements ValidatorConstraintInterface{
    validate(
        password: string,
        args: ValidationArguments,
    ): Promise<boolean> | boolean {
        if (password !== args.object[args.constraints[0]]) return false;
        return true;
    }
    defaultMessage(){
        return 'Passwords do not match';
    }
}

// ESTA CLASE SE HACE CARGO DE LA VALIDACION DE QUE LAS CONTRASEÑAS COINCIDAN, SE UTILIZA EN EL DTO DE CREACION DE USUARIO