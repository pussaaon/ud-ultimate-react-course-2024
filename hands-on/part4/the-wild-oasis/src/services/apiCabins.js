import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("error loading cabins");
    }

    return cabins;
}

async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }]);

    if (error) {
        console.log(error);
        throw new Error("Cabin count not be created");
    }

    // upload cabin image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(storageError);
        throw new Error(
            "Cabin iamge could not be uploaded and the cabin was not created."
        );
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

export { getCabins, deleteCabin, createCabin };
