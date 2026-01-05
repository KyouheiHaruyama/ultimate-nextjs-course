"use client";

import {useEffect, useRef} from "react";
import {incrementViews} from "@/lib/actions/question.actions";
import {toast} from "sonner";

const View = ({ questionId }: { questionId: string }) => {
    const hasIncremented = useRef(false);

    const handleIncrement = async () => {
        if (hasIncremented.current) return;
        hasIncremented.current = true;

        const result = await incrementViews({ questionId });
        if (result.success) {
            toast.success("Success", {
                description: "Views incremented"
            });
        } else {
            toast.error("Error", {
                description: result.error?.message
            });
        }
    };

    useEffect(() => {
        handleIncrement();
    }, [questionId]);

    return null;
}
export default View
