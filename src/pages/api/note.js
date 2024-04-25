import { createNote, deleteAllNotes } from "../../data/note";
import { encrypt, originalPassword } from "../../utils/stringUtils";

export const POST = async ({ request }) => {
    const body = await request.json();
    if (body.title != null && body.content != null) {
        const note = { title: body.title, content: body.content }
        await createNote(note)
        return new Response(JSON.stringify({}), {
            status: 200
        })
    } else return new Response(null, { status: 400 });
}

export const DELETE = async ({ request }) => {
    const body = await request.json()
    const passwordEncrypted = await encrypt(body.password)
    if (passwordEncrypted === originalPassword) {
        await deleteAllNotes()
        return new Response(JSON.stringify({ success: true }), {
            status: 200
        })
    } else {
        return new Response(JSON.stringify({ success: false }), {
            status: 400
        })
    }
}
