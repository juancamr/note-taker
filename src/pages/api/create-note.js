import { createNote } from "../../data/note";

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
