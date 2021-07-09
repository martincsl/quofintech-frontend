import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

const useUnsavedWarning = (message = "Desea realmente salir del formulario antes de finalizar la solicitud ?")  => {

    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        //Detecting browser closing
        // console.log(isDirty);
        window.onbeforeunload = isDirty && (() => message);

        return () => {
           window.onbeforeunload = null;
        };
    }, [isDirty]);

    const routerPrompt = <Prompt when={isDirty} message={message} />;

    // return [routerPrompt, setIsDirty];
    return [ routerPrompt, () => setIsDirty(true), () => setIsDirty(false)];
};

export default useUnsavedWarning;