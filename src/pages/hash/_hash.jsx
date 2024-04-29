import { useEffect, useState } from "react"
import { encrypt } from "../../utils/stringUtils"

export default function Hash() {
    const [hash, setHash] = useState("")
    const [isHide, setIsHide] = useState(true)
    const emptyMessage = "HACK YOUR PASSWORD"

    async function handleChange(event) {
        const text = event.target.value
        const hash = await encrypt(text)
        setHash(hash)
    }

    useEffect(() => {
        const input = document.getElementById("hash-input")
        input.focus()
        input.addEventListener("keydown", async (event) => {
            if (event.key === "Enter") {
                const encrypted = await encrypt(input.value)
                if (input.value === "") return
                await navigator.clipboard.writeText(encrypted)
                input.value = ""
                setHash(emptyMessage)

                Toastify({
                    text: "Hash copied to clipboard!",
                    duration: 3000,
                    gravity: "bottom",
                    position: "left",
                    style: { background: "#1F2937", borderRadius: "1rem" },
                }).showToast();
            }
            if (event.ctrlKey && event.key === "u") {
                event.preventDefault()
                input.value = ""
                setHash(emptyMessage)
            }
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault()
                setIsHide((prev) => !prev)
            }
        })
    }, [])

    return (
        <div class="w-[700px]">
            <div className="w-full flex justify-center">
                <input className="rounded px-4 py-2 bg-slate-100
                    dark:bg-gray-800/50 dark:text-white border-none outline-none
                    text-center" type={isHide ? "password" : "text"}id="hash-input" onChange={handleChange} />
            </div>
            <p class="mt-8 text-green-700 dark:text-green-500 font-bold text-center fira-font font-bold">{hash.length === 0 ? emptyMessage : hash}</p>
        </div>
    )
}
