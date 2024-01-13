import { useEffect } from "react";

export function useKeydownEvent(keycode, callback) {
    useEffect(() => {
        function onKeydown(e) {
            if (e.code === keycode) {
                callback();
            }
        }
        document.addEventListener("keydown", onKeydown);

        return () => {
            document.removeEventListener("keydown", onKeydown);
        }
    }, [keycode, callback]);
}