import supabase from "./supabase";

async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("error loading cabins");
    }

    return cabins;
}

async function createCabin(newCabin) {
    const { data, error } = await supabase.from("cabins").insert([newCabin]);

    if (error) {
        console.log(error);
        throw new Error("Cabin count not be created");
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
