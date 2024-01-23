import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignup from "./hooks/useSignup";

function SignupForm() {
    const { register, formState, handleSubmit, getValues, reset } = useForm();
    const { errors } = formState;
    const { signup, isSigningup } = useSignup();

    function formSubmit({ fullName, email, password }) {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(formSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isSigningup}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isSigningup}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isSigningup}
                    {...register("password", {
                        required: "This field is required",
                        min: {
                            value: 8,
                            message:
                                "Password is required at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isSigningup}
                    {...register("password", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Mismatch password",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isSigningup}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
