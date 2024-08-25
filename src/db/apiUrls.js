import supabase from "./supabase";

// yeh function woh saare urls ko fetch karega joh us particular user se related hai.
export async function getUrls(user_id) {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);

    // if there is an error, the throw the error
    if (error) {
        console.error(error.message);
        throw new Error("Unable to load URLs");
    }
    return data;
}