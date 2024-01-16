import supabase from "./supabase";

async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("error loading cabins");
    }

    return cabins;
}

export { getCabins };
