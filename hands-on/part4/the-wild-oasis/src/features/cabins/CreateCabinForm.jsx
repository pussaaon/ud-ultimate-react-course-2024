import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./hooks/useCreateCabin";
import useUpdateCabin from "./hooks/useUpdateCabin";

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit }) {
    const { id: editId, ...editValues } = cabinToEdit ?? {};
    const isEditMode = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditMode ? editValues : {},
    });
    const { errors } = formState;

    const { createCabin, isCreating } = useCreateCabin();
    const { updateCabin, isUpdating } = useUpdateCabin();

    const isProcessing = isCreating || isUpdating;

    function onSubmit(data) {
        // image's value string type means using the old image for updating.
        const image =
            typeof data.image === "string" ? data.image : data.image[0];
        if (isEditMode) {
            updateCabin({ cabin: { ...data, image: image }, id: editId });
        } else {
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: (data) => {
                        console.log(data);
                        reset();
                    },
                }
            );
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("maxCapacity", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1.",
                        },
                    })}
                />
                {errors?.maxCapacity?.message && (
                    <Error>{errors.maxCapacity.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isCreating}
                    {...register("regularPrice", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Price should be at least 1.",
                        },
                    })}
                />
                {errors?.regularPrice?.message && (
                    <Error>{errors.regularPrice.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isCreating}
                    {...register("discount", {
                        required: "This field is required.",
                        validate: (value) => {
                            return (
                                Number(value) <= getValues().regularPrice ||
                                "Discount should be less than regular price."
                            );
                        },
                    })}
                />
                {errors?.discount?.message && (
                    <Error>{errors.discount.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isCreating}
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
                {errors?.description?.message && (
                    <Error>{errors.description.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditMode
                            ? false
                            : "This field is required.",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isProcessing}>
                    {isEditMode ? "Update cabin" : "Add new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
