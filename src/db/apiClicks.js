import supabase from "./supabase";

// dashboard par dikhane ke liye user ke saare clicks short url par, woh saara data is function le zariye load karege, yeh url ki ids array mei lenga as an input.
export async function getClicksForUrls(urlIds) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", urlIds);

    // if there is an error, the throw the error
    if (error) {
        console.error(error.message);
        throw new Error("Unable to load Clicks");
    }
    return data;
}