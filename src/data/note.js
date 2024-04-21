import { supabase } from '../data/connection.js'

export async function getNotes() {
    const { data } = await supabase.from("note").select("*").order("id", { ascending: false });
    return data
}

export async function createNote(note) {
    const { data, error } = await supabase
        .from('note')
        .insert([ note ])
        .select()

    if (error) {
        throw error
    }

    return data
}

export async function deleteAllNotes() {
    const { data, error } = await supabase
        .from('note')
        .delete()
        .neq("title", "test")

    console.log(data, error)

    if (error) {
        throw error
    }

    return data
}
