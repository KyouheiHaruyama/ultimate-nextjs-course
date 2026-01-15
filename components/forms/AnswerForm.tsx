"use client";

import React, {useRef, useState, useTransition} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {AnswerSchema} from "@/lib/validations";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {MDXEditorMethods} from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import {createAnswer} from "@/lib/actions/answer.actions";
import {toast} from "sonner";

import Image from "next/image";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useSession} from "next-auth/react";
import {api} from "@/lib/api";
import editor from "@/components/editor";

const Editor = dynamic(() => import('@/components/editor'), {
    // Make sure we turn SSR off
    ssr: false
});

interface AnswerFormProps {
    questionId: string;
    questionTitle: string;
    questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: AnswerFormProps) => {
    const [isAnswering, startAnsweringTransition] = useTransition();
    const [isAISubmitting, setIsAISubmitting] = useState(false);
    const session = useSession();

    const editorRef = useRef<MDXEditorMethods>(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: { content: "" },
    });

    // 2. Define a submit handler.
    const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
        startAnsweringTransition(async () => {
            const result = await createAnswer({
                questionId,
                content: values.content,
            });

            if (result.success) {
                form.reset();
                toast.success("Success", {
                    description: "Your answer has been posted successfully."
                });

                if (editorRef.current) {
                    editorRef.current.setMarkdown("");
                }
            } else {
                toast.error("Error", {
                    description: result.error?.message
                });
            }
        });
    };

    const generateAIAnswer = async () => {
        if (session.status !== "authenticated") {
            return toast("Please log in", {
                description: "You need to be logged in to use this feature.",
            });
        }

        setIsAISubmitting(true);

        const userAnswer = editorRef.current?.getMarkdown();

        try {
            const { success, data, error } = await api.ai.getAnswer(questionTitle, questionContent, userAnswer);
            if (!success) {
                return toast.error("Error", {
                    description: error?.message
                });
            }

            const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();

            if (editorRef.current) {
                editorRef.current.setMarkdown(formattedAnswer);

                form.setValue("content", formattedAnswer);
                await form.trigger("content");
            }

            console.log("SUCCESS");

            toast.success("Success", {
                description: "AI generated answer has been generated."
            });
        } catch (error) {
            toast.error("Error", {
                description: error instanceof Error ? error.message : "There was a problem with your request."
            });
        } finally {
            setIsAISubmitting(false);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <h4 className="paragraph-semibold text-dark400_light800">
                    Write your answer here
                </h4>
                <Button
                    className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
                    disabled={isAISubmitting}
                    onClick={generateAIAnswer}
                >
                    {isAISubmitting ? (
                        <>
                            <ReloadIcon className="mr-2 size-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Image
                                src="/icons/stars.svg"
                                alt="Generate AI Answer"
                                width={12}
                                height={12}
                                className="object-contain"
                            />
                            Generate AI Answer
                        </>
                    )}
                </Button>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCreateAnswer)}
                    className="mt-6 flex flex-col w-full gap-10"
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-3">
                                <FormControl>
                                    <Editor value={field.value} ref={editorRef} fieldChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" className="primary-gradient w-fit">
                            {isAnswering ? (
                                <>
                                    <ReloadIcon className="mr-2 size-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                "Post Answer"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
export default AnswerForm;
