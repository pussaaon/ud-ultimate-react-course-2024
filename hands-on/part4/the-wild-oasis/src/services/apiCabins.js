import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("error loading cabins");
    }

    return cabins;
}

function buildImageNamePath(name) {
    const imageName = `${Math.random()}-${name}`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const useOldImage = name.startsWith?.(supabaseUrl);
    return { imageName, imagePath, useOldImage };
}

async function createCabin(newCabin) {
    const { imageName, imagePath, useOldImage } = buildImageNamePath(
        newCabin.image.name ?? newCabin.image
    );

    const { data, error } = await supabase
        .from("cabins")
        .insert([
            { ...newCabin, image: useOldImage ? newCabin.image : imagePath },
        ]);

    if (error) {
        console.log(error);
        throw new Error("Cabin count not be created");
    }

    // upload cabin image
    if (!useOldImage) {
        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, newCabin.image);

        if (storageError) {
            await supabase.from("cabins").delete().eq("id", data.id);
            console.log(storageError);
            throw new Error(
                "Cabin image could not be uploaded and the cabin was not created."
            );
        }
    }

    return data;
}

async function updateCabin(cabin, id) {
    const { imageName, imagePath, useOldImage } = buildImageNamePath(
        cabin.image.name ?? cabin.image
    );

    const { data, error } = await supabase
        .from("cabins")
        .update({ ...cabin, image: useOldImage ? cabin.image : imagePath })
        .eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabin count not be updated");
    }

    // upload cabin image
    if (!useOldImage) {
        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, cabin.image);

        if (storageError) {
            console.log(storageError);
            throw new Error("Cabin image could not be updated.");
        }
    }

    return data;
}

async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}

export { getCabins, deleteCabin, createCabin, updateCabin };
