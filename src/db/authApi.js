import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
    // DB Call
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    // if error, then show the error message; else return the data
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

// yeh wala function export karwayege jo help karega for fetching the user data jab woh logged in ho jaayega
export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getSession();
    //  if user doesn't exists, return null
    if (!session.session) {
        return null;
    }
    // if there is an error, the throw the error
    if (error) {
        throw new Error(error.message);
    }
    // else return the user data
    return session.session.user;
}
// function for signup new user
export async function signUp({ name, email, password, profile_pic }) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
    console.log(fileName);
    // supabase storage (profile_pic supabase ke bucket mei store kardo)
    const { error: storageError } = await supabase.storage
        .from("profile_pic")
        .upload(fileName, profile_pic);
    // if storage error, then throw the error message
    if (storageError) {
        throw new Error(storageError.message);
    }
    // Get the public URL of the uploaded profile picture
    //   const profilePicUrl = `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`;

    //   sign up the user using supabase and get the data
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
            },
        },
    });
    //   throw the error
    if (error) {
        throw new Error(error.message);
    }
    // return the data
    return data;
}

// logout/signout function logic from supabase
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}